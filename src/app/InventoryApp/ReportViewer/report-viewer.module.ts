import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportViewerRoutingModule } from './report-viewer-routing.module';
import { ReportViewerComponent } from './report-viewer.component';
import { DxReportViewerModule } from 'devexpress-reporting-angular';

@NgModule({
  declarations: [ReportViewerComponent],
  imports: [
    CommonModule,
    ReportViewerRoutingModule,
    DxReportViewerModule
  ]
})
export class ReportViewerModule { }
