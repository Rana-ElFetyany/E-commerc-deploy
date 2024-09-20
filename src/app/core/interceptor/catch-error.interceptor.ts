import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const catchErrorInterceptor: HttpInterceptorFn = (req, next) => {

  let toaster = inject(ToastrService)

  return next(req).pipe(catchError((err)=>{ // or subscribe instead of pipe

    console.log(err);
    toaster.error(err.error.message)

    return throwError(()=>err)
  }))
};
