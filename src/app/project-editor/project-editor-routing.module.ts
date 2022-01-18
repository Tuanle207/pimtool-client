import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectEditorComponent } from './project-editor.component';

const routes: Routes = [
  {
    path: "new", component: ProjectEditorComponent,
  },
  {
    path: ":id", component: ProjectEditorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectEditorRoutingModule { }
