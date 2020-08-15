import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportViewerComponent } from './report-viewer.component';

const routes: Routes = [
  { path: '', component: ReportViewerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportViewerRoutingModule { }
