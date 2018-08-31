import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../state/auth.state';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}
​
  canActivate(_, state: RouterStateSnapshot) {
    const token = this.store.selectSnapshot(AuthState.token);
    console.log('token iz stejta: ', token);
    if (token !== undefined) {
        return true;
    }

    this.router.navigate(['/login'], { queryParams: {returnUrl: state.url}});
    return false;
  }
}
