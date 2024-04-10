import { Injectable } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  user: User;
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }


  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    this.authService.user$.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });

    if (this.user.username === '') {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
