import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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

  projectId: number | null = null;
  formGroup!: FormGroup;
  formControls!: ProjectFormControlsTemplate;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subcribeRouteParamsChange();
  }

  initForm() {
    this.formControls = {
      number: new FormControl(null, [ Validators.required ]),
      name: new FormControl(null, [ Validators.required ]),
      customer: new FormControl(null, [ Validators.required ]),
      group: new FormControl(null, [ Validators.required ]),
      members: new FormControl(),
      status: new FormControl(null, [ Validators.required ]),
      startDate: new FormControl(null, [ Validators.required ]),
      endDate: new FormControl(),
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
        }
      }
    );
  }

}
