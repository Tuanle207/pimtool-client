import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectEditorComponent } from './project-editor.component';
import { ProjectEditorRoutingModule } from './project-editor-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProjectEditorComponent
  ],
  imports: [
    ReactiveFormsModule,
    ProjectEditorRoutingModule,
    CommonModule,
  ]
})
export class ProjectEditorModule { }
