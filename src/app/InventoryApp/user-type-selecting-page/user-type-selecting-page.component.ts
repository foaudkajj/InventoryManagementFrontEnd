import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

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

  constructor(
    private router: Router,
    private _fuseConfigService: FuseConfigService,
    private _fuseNavigationService: FuseNavigationService
  ) {
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
    this._fuseNavigationService.setCurrentNavigation('main')
    this.router.navigateByUrl('/');
  }

  StockScreen() {
    this._fuseNavigationService.setCurrentNavigation('stockNavigation')
    this.router.navigateByUrl('/');
  }

}
