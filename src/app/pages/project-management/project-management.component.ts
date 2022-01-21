import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaginationInstance } from 'ngx-pagination';
import { ProjectStatus, ProjectStatusDictionary, ProjectStatusList } from 'src/app/constants/project-status';
import { Project } from 'src/app/services/project.model';
import { ProjectService } from 'src/app/services/project.service';

interface ProjectFormControlsTemplate {
  query: FormControl;
  status: FormControl;
}

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss'],
})
export class ProjectManagementComponent implements OnInit {

  readonly ProjectStatusDic = ProjectStatusDictionary;
  readonly StatusOptions = ProjectStatusList;
  readonly ProjectStatus = ProjectStatus;

  items: Project[] = [];
  paginationConfig: PaginationInstance = {
    id: 'project-pagination',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0,
  }
  selectedItems: Project[] = [];
  loading = false;
  showConfirmDeleteModal = false;

  formGroup!: FormGroup;
  formControls!: ProjectFormControlsTemplate;

  constructor(private projectService: ProjectService, private modalService: NgbModal,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.subcribeProjectLoadState();
    this.projectService.fetchProjects()  
  }

  initForm() {
    this.formControls = {
      query: new FormControl(),
      status: new FormControl(ProjectStatus.Unknown),
    }
    this.formGroup = new FormGroup(this.formControls as any);
    this.formGroup.valueChanges.subscribe(() => this.updateFilter());
  }

  subcribeProjectLoadState() {
    this.projectService.subcribeLoadingStateChange(
      (state) => {
        this.loading = state.status === 'loading';

        if (state.status === 'success') {
          const { items, pageIndex, pageSize, totalCount } = this.projectService.getProjectsStorage();
          this.items = items;
          this.paginationConfig.currentPage = pageIndex || 1;
          this.paginationConfig.itemsPerPage = pageSize || 10;
          this.paginationConfig.totalItems = totalCount;
        }
      }
    );
  }

  onPageChange(pageIndex: number) {
    this.paginationConfig.currentPage = pageIndex;
    this.updateFilter();
    this.projectService.fetchProjects();
  }

  onSearch() {
    this.projectService.fetchProjects();
  }

  onReset() {
    this.formGroup.reset({
      status: ProjectStatus.Unknown
    });
    this.updateFilter();
    this.projectService.fetchProjects();
  }

  onSelectionChange(item: Project) {
    const index = this.selectedItems.findIndex((x) => x.id === item.id);
    if (index === -1) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(index, 1);
    }
  }

  onDelete(deleteItems: Project[]) {
    const listId = deleteItems.map(x => x.id);
    const items = this.items.filter((x) => !listId.includes(x.id));
    this.items = items;
    const selectedItems = this.selectedItems.filter((x) => !listId.includes(x.id));
    this.selectedItems = selectedItems;
  }

  onConfirmDelete(content: any, deleteItems: Project[]) {
    if (deleteItems.length == 0) {
      return;
    }
    this.modalService.open(content, { centered: true }).result
      .then(() => {
        const listId = deleteItems.map(x => x.id);
        listId.forEach(id => {
          const index = this.selectedItems.findIndex(x => x.id == id);
          if (index !== -1) {
            this.selectedItems.splice(index, 1);
          }
        });
        
        this.projectService.deleteProject(listId);
      })
  }

  onStartEdit(id: number) {
    this.router.navigate(['project-editor', id]);
  }

  getIsChecked(id: number) {
    return this.selectedItems.findIndex(x => x.id === id) !== -1;
  }

  private updateFilter() {
    const query = this.formControls.query.value;
    const status = this.formControls.status.value;
    this.projectService.setProjectFilter({
      number: isNaN(query) ? 0 : query,
      name: query,
      customer: query,
      status: status !== ProjectStatus.Unknown ? status : undefined,
      pageIndex: this.paginationConfig.currentPage,
      pageSize: this.paginationConfig.itemsPerPage,
    });
  }

}
