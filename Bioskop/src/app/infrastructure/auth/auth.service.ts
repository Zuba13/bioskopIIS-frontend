import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorage } from './jwt/token.service';
import { environment } from 'src/env/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from './model/login.model';
import { AuthenticationResponse } from './model/authentication-response.model';
import { User } from './model/user.model';
import { Registration } from './model/registration.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User>({
    username: '',
    id: 0,
    role: '',
    firstName: '',
    lastName: '',
    money: 0.0,
    email: '',
  });

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private router: Router
  ) {}

  login(login: Login): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(environment.apiHost + 'users/login', login)
      .pipe(
        tap((authenticationResponse) => {
          this.tokenStorage.saveAccessToken(authenticationResponse.token);
          this.setUser();
        })
      );
  }

  register(registration: Registration): Observable<User> {
    return this.http
      .post<User>(environment.apiHost + 'users/register', registration)
      .pipe();
  }

  registerCashier(registration: Registration): Observable<User> {
    return this.http
      .post<User>(environment.apiHost + 'users/registerCashier', registration)
      .pipe();
  }

  updateProfile(updateProfile: User, userId: number): Observable<User> {
    console.log(userId, updateProfile);
    return this.http
      .put<User>(environment.apiHost + 'users/' + userId, updateProfile)
      .pipe();
  }

  logout(): void {
    this.router.navigate(['/home']).then((_) => {
      this.tokenStorage.clear();
      this.user$.next({
        username: '',
        id: 0,
        role: '',
        firstName: '',
        lastName: '',
        money: 0.0,
        email: '',
      });
    });
  }

  checkIfUserExists(): void {
    const accessToken = this.tokenStorage.getAccessToken();
    if (accessToken == null) {
      return;
    }
    this.setUser();
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(environment.apiHost + 'users/' + userId);
  }

  private setUser(): void {
    const jwtHelperService = new JwtHelperService();
    const accessToken = this.tokenStorage.getAccessToken() || '';
    const id = jwtHelperService.decodeToken(accessToken).user_id;
    if (id) {
      this.getUserById(id).subscribe(
        (user: User) => {
          this.user$.next(user);
        },
        (error) => {
          console.error('Failed to retrieve user details:', error);
        }
      );
    } else {
      console.error('User ID not found.');
    }
  }
}
