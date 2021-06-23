import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { navigation } from 'app/navigation/navigation';
import { stockNavigation } from 'app/navigation/stockNavigation';
import { adminNavigation } from 'app/navigation/adminNavigation';
import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationTurkish } from 'app/navigation/i18n/tr';
import { locale as navigationArabic } from 'app/navigation/i18n/ar';

import trMessages from "devextreme/localization/messages/tr.json";
import { locale, loadMessages } from "devextreme/localization";
import { Router, NavigationStart } from '@angular/router';
import config from 'devextreme/core/config';
import { FuseNavigation } from '@fuse/types';
import { LoginResponse } from './InventoryApp/Models/LoginResponse';
import { LoadPanelService } from './InventoryApp/services/loadpnale.service';


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    fuseConfig: any;
    isloading: boolean = false;
    navigationItems: FuseNavigation[] = (JSON.parse(localStorage.getItem('user')) as LoginResponse)?.navigationItems;
    // navigation: any;
    // stockNavigation: any;
    // adminNavigation: any;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseSplashScreenService} _fuseSplashScreenService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {Platform} _platform
     * @param {TranslateService} _translateService
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform,
        private router: Router,
        private loadPanelService: LoadPanelService
    ) {

        // Subscribe loadpanel service
        this.loadPanelService.loadingChanged.subscribe(res => {
            setTimeout(() => {
                this.isloading = res;
            }, 0);
        });


        // Load messages for Devextreme
        loadMessages(trMessages);
        locale('tr');
        config({ defaultCurrency: 'TRY' });

        // Get default navigation
        // this.navigation = navigation;
        // this.stockNavigation = stockNavigation;
        // this.adminNavigation = adminNavigation;
        // Register the navigation to the service
        // this._fuseNavigationService.register('sellingNavigation', this.navigation);
        // this._fuseNavigationService.register('stockNavigation', this.stockNavigation);
        // this._fuseNavigationService.register('adminNavigation', this.adminNavigation);

        if (this.navigationItems) {
            this._fuseNavigationService.register('menu', this.navigationItems);
            this._fuseNavigationService.setCurrentNavigation('menu');
            // this._fuseNavigationService.register('sellingNavigation', this.navigationItems.filter(fi => fi.key == 'sellingModuleType').sort((a, b) => a.priority - b.priority)[0]?.children);
            // this._fuseNavigationService.register('stockNavigation', this.navigationItems.filter(fi => fi.key == 'stockModuleType').sort((a, b) => a.priority - b.priority)[0]?.children);
            // this._fuseNavigationService.register('adminNavigation', this.navigationItems.filter(fi => fi.key == 'adminModuleType').sort((a, b) => a.priority - b.priority)[0]?.children);


            // this.router.events.subscribe((event: any) => {
            //     if (event instanceof NavigationStart) {
            //         if (event.url.toLowerCase().includes('/stock'))
            //             this._fuseNavigationService.setCurrentNavigation('stockNavigation');
            //         else if (event.url.toLowerCase().includes('/selling'))
            //             this._fuseNavigationService.setCurrentNavigation('sellingNavigation');
            //         else
            //             this._fuseNavigationService.setCurrentNavigation('adminNavigation');

            //     }
            // });

        } else {
            this.router.navigate(["login"]);
        }


        // Set the main navigation as our current navigation

        // Add languages
        this._translateService.addLangs(['en', 'tr', 'ar']);

        // Set the default language
        this._translateService.setDefaultLang('tr');

        // Set the navigation translations
        this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish, navigationArabic);

        // Use a language
        this._translateService.use('tr');


        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix Start
         * ----------------------------------------------------------------------------------------------------
         */

        /**
         * If you are using a language other than the default one, i.e. Turkish in this case,
         * you may encounter an issue where some of the components are not actually being
         * translated when your app first initialized.
         *
         * This is related to ngxTranslate module and below there is a temporary fix while we
         * are moving the multi language implementation over to the Angular's core language
         * service.
         **/

        // Set the default language to 'en' and then back to 'tr'.
        // '.use' cannot be used here as ngxTranslate won't switch to a language that's already
        // been selected and there is no way to force it, so we overcome the issue by switching
        // the default language back and forth.
        /**
         setTimeout(() => {
            this._translateService.setDefaultLang('en');
            this._translateService.setDefaultLang('tr');
         });
         */

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix End
         * ----------------------------------------------------------------------------------------------------
         */

        // Add is-mobile class to the body if the platform is mobile
        if (this._platform.ANDROID || this._platform.IOS) {
            this.document.body.classList.add('is-mobile');
        }

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {

                this.fuseConfig = config;

                // Boxed
                if (this.fuseConfig.layout.width === 'boxed') {
                    this.document.body.classList.add('boxed');
                }
                else {
                    this.document.body.classList.remove('boxed');
                }

                // Color theme - Use normal for loop for IE11 compatibility
                for (let i = 0; i < this.document.body.classList.length; i++) {
                    const className = this.document.body.classList[i];

                    if (className.startsWith('theme-')) {
                        this.document.body.classList.remove(className);
                    }
                }

                this.document.body.classList.add(this.fuseConfig.colorTheme);
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }
}
