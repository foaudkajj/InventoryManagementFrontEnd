import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import swal, { SweetAlertIcon } from "sweetalert2";

@Injectable({ providedIn: "root" })
export class SwalService {
    constructor(private translate: TranslateService) { }
    showErrorMessage(message?: string) {
        swal.fire(
            this.translate.instant("EXCEPTIONS.ERROR"),
            message ? this.translate.instant(message) : '',
            "error"
        );
    }
    showSuccessMessage(message?: string) {
        swal.fire({
            icon: 'success',
            title: message ? message : this.translate.instant("MESSAGES.SUCCESFULL"),
            showConfirmButton: false,
            timer: 1500
        })
    }

    static showWarningMessage(message: string) {
        swal.fire({
            icon: 'warning',
            title: message,
            showConfirmButton: false,
            timer: 1500
        })
    }

    static showConfirmMessage(title: string, message: string, confirmButtonText: string, cancelButtonText: string, type: SweetAlertIcon = 'warning') {
        // let theResult =false
        return swal.fire({
            title: title,
            text: message,
            icon: type,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText
        })
    }
}
