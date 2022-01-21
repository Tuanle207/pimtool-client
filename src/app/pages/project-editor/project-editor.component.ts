import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectStatus, ProjectStatusDictionary, ProjectStatusList } from 'src/app/constants/project-status';
import { ProjectService } from 'src/app/services/project.service';
import { NewProject } from '../../services/project.model';

interface ProjectFormControlsTemplate {
  number: FormControl;
  name: FormControl;
  customer: FormControl;
  group: FormControl;
  members: FormControl;
  status: FormControl;
  startDate: FormControl;
  endDate: FormControl;
} 

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss']
})
export class ProjectEditorComponent implements OnInit {
  readonly ProjectStatusDic = ProjectStatusDictionary;
  readonly StatusOptions = ProjectStatusList;
  readonly ProjectStatus = ProjectStatus;

  projectId: number | null = null;
  formGroup!: FormGroup;
  formControls!: ProjectFormControlsTemplate;
  groupIdOptions: number[] = [-1];

  constructor(private route: ActivatedRoute, private router: Router,
    private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.fetchGroups();
    this.initForm();
    this.subcribeRouteParamsChange();
    this.subcribeProjectLoadState();
  }

  initForm() {
    this.formControls = {
      number: new FormControl(null, [ Validators.required, this.validateNumber ]),
      name: new FormControl(null, [ Validators.required ]),
      customer: new FormControl(null, [ Validators.required ]),
      group: new FormControl(null, [ Validators.required ]),
      members: new FormControl(null, [ this.validateEmployees ]),
      status: new FormControl(ProjectStatus.New, [ Validators.required ]),
      startDate: new FormControl(null, [ Validators.required, this.validateStartDate ]),
      endDate: new FormControl(null, [ this.validateEndDate ]),
    }
    this.formGroup = new FormGroup(this.formControls as any);
  }

  subcribeRouteParamsChange() {
    this.route.params.subscribe(
      (params) => {
        const projectId: number = params['id'];
        if (projectId > 0) {
          this.projectId = projectId;
        } else {
          this.projectId = null;
          this.initForm();
        }
      }
    );
  }

  subcribeProjectLoadState() {
    this.projectService.subcribeLoadingStateChange(
      (state) => {
        if (state.status === 'loading') {

        } else if (state.status === 'success') {
          if (state.action === 'CreateProject') {
            this.router.navigate(['projects']);
          }
          else if (state.action === 'FetchGroups') {
            this.groupIdOptions = [-1, ...this.projectService.getGroupStorage()];
          }
        }
      }
    );
  }

  onSubmitEdit() {
    if (this.formGroup.invalid) {
      return;
    }
    const newProject: NewProject = {
      projectNumber: this.formControls.number.value,
      name: this.formControls.name.value,
      customer: this.formControls.customer.value,
      status: this.formControls.status.value,
      employees: this.formControls.members.value,
      groupId: this.formControls.group.value,
      startDate: this.formControls.startDate.value,
      endDate: this.formControls.endDate.value,
    }
    this.projectService.createProject(newProject);
  }

  private validateNumber = (control: AbstractControl): ValidationErrors | null => {
    const value = <string>control.value;
    if (isNaN(value as any)) {
      return {
        'invalid': 'Project number must have exactly 4 numeric characters, the first one must not be 0'
      };
    }
    const projNumber = parseInt(value, 10);
    if (projNumber < 1000 || projNumber > 9999) {
      return {
        'invalid': 'Project number must have exactly 4 numeric characters, the first one must not be 0'
      };
    }
    return null;
  };

  private validateEmployees = (control: AbstractControl): ValidationErrors | null => {
    const value = <string>control.value;
    if (!value) {
      return null;
    }
    const trimmedValue = value.replace(/ /g,'');
    if (trimmedValue) {
      const members = trimmedValue.split(',');
      for (const mem of members) {
        if (mem.length != 3) {
          return {
            'invalid': 'Each visa must have exactly 3 characters, must be separated by comma'
          };
        }
      }
      const uniqueMembers = members.filter((value, index, arr) => arr.indexOf(value) === index);
      if (uniqueMembers.length < members.length) {
        return {
          'unique': 'Each visa must be unique'
        };
      }
    }
    
    return null;
  }

  private validateStartDate = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    const parsedValue = new Date(value);
    const yearValue = parsedValue.getFullYear();
    if (yearValue < 2000 || yearValue > 2030) {
      return {
        'range': 'Start year must be later than 1999 and earlier than 2031'
      };
    }
    return null;
  }

  private validateEndDate = (control: AbstractControl): ValidationErrors | null => {
    if (!this.formControls) {
      return null;
    }
    const endDate = control.value;
    if (!endDate) {
      return null;
    }

    const endDateValue = <Date>endDate;
    const endDateYearValue = endDateValue.getFullYear();
    if (endDateYearValue < 2000 || endDateYearValue > 2030) {
      return {
        'range': 'End year must be later than 1999 and earlier than 2031'
      };
    }

    const startDate = this.formControls.startDate.value;
    if (!startDate) {
      return null;
    }
    const startDateValue = <Date>startDate;
   
    if (startDateValue.getTime() >= endDateValue.getTime()) {
      return {
        'invalid': 'End date must be later than start date'
      };
    }
    
    return null;
  }

}
