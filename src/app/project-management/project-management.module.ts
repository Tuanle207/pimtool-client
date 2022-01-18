import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectManagementComponent } from './project-management.component';
import { ProjectManagementRoutingModule } from './project-management-routing.module';



@NgModule({
  declarations: [
    ProjectManagementComponent
  ],
  imports: [
    ProjectManagementRoutingModule,
    CommonModule,
  ]
})
export class ProjectManagementModule { }
