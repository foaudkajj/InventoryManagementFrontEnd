import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';
import { LoginRequest } from '../Models/LoginRequest';
import { SwalService } from '../services/Swal.Service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private router: Router,
        public translate: TranslateService,
        private userSerivce: UserService,
        private swal: SwalService,
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

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', Validators.required]
        });
    }

    async LoginButton() {
        let loginRequest: LoginRequest = { userName: this.loginForm.controls.email.value, password: this.loginForm.controls.password.value }
        let loginResponse = await this.userSerivce.Login(loginRequest).toPromise() as any;
        if (loginResponse.entity.isAuthenticated) {
            this._fuseNavigationService.register('menu', loginResponse.entity.navigationItems);
            this._fuseNavigationService.setCurrentNavigation('menu')
            this.router.navigate(['dashboard'])
        } else {
            this.swal.showErrorMessage(loginResponse.message)
        }
    }
}
