import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RequestInterceptor } from './InventoryApp/Helpers/httprequest.interceptor';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DxLoadPanelModule } from 'devextreme-angular';

const appRoutes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    {

        path: 'login',
        loadChildren: () => import('./InventoryApp/login/login.module').then(m => m.LoginModule),
    },
    {

        path: 'ReportViewer',
        loadChildren: () => import('./InventoryApp/ReportViewer/report-viewer.module').then(m => m.ReportViewerModule),
    },
    {
        path: '',
        loadChildren: () => import('./InventoryApp/inventory-app.module').then(m => m.InventoryAppModule),
    },

    // {
    //     path: 'usertypeselect',
    //     loadChildren: () => import('./InventoryApp/user-type-selecting-page/user-type-selecting-page.module').then(m => m.UserTypeSelectingPageModule),
    // }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,

        DxLoadPanelModule,


        SweetAlert2Module.forRoot()
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        // Prevent 404 prblem
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    ]
})
export class AppModule {
}
