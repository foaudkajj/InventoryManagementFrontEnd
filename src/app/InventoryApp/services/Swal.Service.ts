import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import swal from "sweetalert2";

@Injectable({ providedIn: "root" })
export class SwalService {
    constructor(private translate: TranslateService) { }
    showErrorMessage(message?: string) {
        swal.fire(
            this.translate.instant("EXCEPTIONS.ERROR"),
            this.translate.instant(message),
            "error"
        );
    }
    showSuccessMessage(message?: string) {
        swal.fire({
            icon: 'success',
<<<<<<< HEAD
            title: message ? message : 'İşleminiz Başarıyla Yapılmıştır',
=======
            title: message ? message : this.translate.instant("MESSAGES.SUCCESFULL"),
>>>>>>> 34a5d551ad21d7cb10677f07e3d103bf5537eaa2
            showConfirmButton: false,
            timer: 1500
        })
    }
<<<<<<< HEAD

=======
>>>>>>> 34a5d551ad21d7cb10677f07e3d103bf5537eaa2

    showDeletingMessage() {
        // let theResult =false
        return swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
    }


    showDeletConforme() {
        swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
        )
    }
}
