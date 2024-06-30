import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


export const userGuardGuard: CanActivateFn = (route
  , state) => {

const cookieService = inject(CookieService);
const router = inject(Router);
const cookie = cookieService.check('token')
if(!cookie){
  router.navigateByUrl('/login');  
}

  return true;
};
