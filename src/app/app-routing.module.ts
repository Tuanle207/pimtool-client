import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: '/projects', pathMatch: 'full',
  },
  {
    path: 'projects',
    loadChildren: () => import('./pages/project-management/project-management.module')
      .then(m => m.ProjectManagementModule),
  },
  {
    path: 'project-editor',
    loadChildren: () => import('./pages/project-editor/project-editor.module')
      .then(m => m.ProjectEditorModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
