import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map, catchError, of } from 'rxjs';
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
      if (res.message === 'Token is valid') {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }),
      catchError((err) => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
