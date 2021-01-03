import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { environment } from 'environments/environment';
import { ReportUrls } from '../Enums/ReportUrls';
import { ActivatedRoute } from '@angular/router';
import { DxReportViewerComponent } from 'devexpress-reporting-angular';

@Component({
  selector: 'app-report-viewer',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.scss'
  ]
})
export class ReportViewerComponent {

  @ViewChild("reportViewer") viewer: DxReportViewerComponent;

  // The report's path. The Document Viewer opens it when the application starts.
  reportUrl: string = '';
  // Backend's project URI.
  hostUrl: string = environment.reportingUrl;
  invokeAction: string = '/DXXRDV';

  constructor(private _fuseConfigService: FuseConfigService,
    private route: ActivatedRoute) {
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };
  }

  ngOnInit(): void {
    this.reportUrl = this.route.snapshot.queryParamMap.get('ReportName');
    console.log(this.route.snapshot.queryParamMap.get('ReportName'))
    // const ProductBarcode: string = this.route.snapshot.queryParamMap.get('ProductBarcode');
    // this.reportUrl += '?ProductBarcode=' + ProductBarcode;
  }

}
