import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseNavigation } from '@fuse/types/fuse-navigation';

@Component({
  selector: 'kt-user-type-selecting-page',
  templateUrl: './user-type-selecting-page.component.html',
  styleUrls: ['./user-type-selecting-page.component.scss']
})
export class UserTypeSelectingPageComponent implements OnInit {
  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;
  navigationItems: FuseNavigation[] = JSON.parse(localStorage.getItem('menus'));
  SellingVisible: boolean = false;
  AdminVisible: boolean = false;
  StockVisible: boolean = false;

  constructor(
    private router: Router,
    private _fuseConfigService: FuseConfigService,
    private _fuseNavigationService: FuseNavigationService
  ) {

    this.SellingVisible = this.navigationItems.filter(fi => fi.key == 'sellingModuleType').length > 0;
    this.StockVisible = this.navigationItems.filter(fi => fi.key == 'stockModuleType').length > 0;
    this.AdminVisible = this.navigationItems.filter(fi => fi.key == 'adminModuleType').length > 0;

    // Configure the layout
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

  ngOnInit() {
  }

  SellingScreen() {
    this._fuseNavigationService.register('sellingNavigation', this.navigationItems.filter(fi => fi.key == 'sellingModuleType').sort((a, b) => a.priority - b.priority)[0]?.children);
    this._fuseNavigationService.setCurrentNavigation('sellingNavigation')
    this.router.navigateByUrl('/selling');
  }

  StockScreen() {
    this._fuseNavigationService.register('stockNavigation', this.navigationItems.filter(fi => fi.key == 'stockModuleType').sort((a, b) => a.priority - b.priority)[0]?.children);
    this._fuseNavigationService.setCurrentNavigation('stockNavigation')
    this.router.navigateByUrl('/stock');
  }

  AdminScreen() {
    this._fuseNavigationService.register('adminModule', this.navigationItems.filter(fi => fi.key == 'adminModuleType').sort((a, b) => a.priority - b.priority)[0]?.children);
    this._fuseNavigationService.setCurrentNavigation('adminModule')
    this.router.navigateByUrl('/admin');
  }

}
