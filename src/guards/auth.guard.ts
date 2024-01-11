import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.getIsLoggedIn().pipe(map((res) => {
      console.log(res);
      if (res.isLoggedIn) {
        console.log(`User is logged in`);
        return true;
      } else {
        console.log(`User is not logged in`);
        this.router.navigate(['/login']);
        return false;
      }
    }));
  }
}
