import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ShowToastrService {
  constructor(private toastr: ToastrService) {}

  showError(error:any, secundary?:any, timeout?:any) {
    timeout = timeout ? timeout : 5000;
    secundary = secundary ? secundary : '';

    return this.toastr.error(error, secundary, {
      timeOut: timeout,
      progressBar: true,
      positionClass: 'toast-bottom-right',
    });
  }

  showSucces(msj:any, secundary?:any, timeout?:any) {
    timeout = timeout ? timeout : 5000;
    secundary = secundary ? secundary : '';

    return this.toastr.success(msj, secundary, {
      timeOut: timeout,
      progressBar: true,
      positionClass: 'toast-bottom-right',
    });
  }

  showInfo(msj:any, secundary?:any, timeout?:any) {
    timeout = timeout ? timeout : 5000;
    secundary = secundary ? secundary : '';

    return this.toastr.info(msj, secundary, {
      timeOut: timeout,
      progressBar: true,
      positionClass: 'toast-bottom-right',
    });
  }
}
