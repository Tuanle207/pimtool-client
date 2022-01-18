import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectEditorComponent } from './project-editor.component';
import { ProjectEditorRoutingModule } from './project-editor-routing.module';



@NgModule({
  declarations: [
    ProjectEditorComponent
  ],
  imports: [
    ProjectEditorRoutingModule,
    CommonModule,
  ]
})
export class ProjectEditorModule { }
