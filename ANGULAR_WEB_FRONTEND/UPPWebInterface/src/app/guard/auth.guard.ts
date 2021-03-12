import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const str = localStorage.getItem('token');
    if (!str) {
      this.router.navigate(['/access-denied']);
      return false;
    }
    const json = JSON.parse(str);
    if (new Date().getTime() > json.expiry) {
      localStorage.clear();
      this.router.navigate(['/access-denied']);
      return false;
    }
    const body = {
      token: json.token,
    };
    this.authService.verify(body).subscribe(data => {

    }, error => {
      this.router.navigate(['/access-denied']);
    });
    return true;
  }
}
