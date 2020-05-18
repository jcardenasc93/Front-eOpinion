import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public router: Router) {
  }

  canActivate(): boolean {
    const isStuff = sessionStorage.getItem('is_staff');
    if (isStuff == 'true') {
      return true;
    }
    return false;
  }
}
