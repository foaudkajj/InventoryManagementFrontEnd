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
}
