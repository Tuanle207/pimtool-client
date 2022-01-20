import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { ProjectManagementComponent } from './project-management.component';
import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProjectManagementComponent,
  ],
  imports: [
    ProjectManagementRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
  ]
})
export class ProjectManagementModule { }
