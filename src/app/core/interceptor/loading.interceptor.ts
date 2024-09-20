import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  let spinner = inject(NgxSpinnerService)


  if(req.url.includes('home')){
    spinner.show('spin1')
  }
  else{
    spinner.show('spin2')
  }

  return next(req).pipe(finalize(()=>{
    spinner.hide('spin1')
    spinner.hide('spin2')
  }))
};
