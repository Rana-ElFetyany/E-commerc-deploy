import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {

  // const modifiedReq = req.clone({
  //   headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`),
  // });

  if(req.url.includes('cart') || req.url.includes('categories')){

    req = req.clone({
     setHeaders:{
       token :localStorage.getItem('token')!
     }
   })

  }


  return next(req);
};
