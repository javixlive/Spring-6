import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject, exhaustMap } from "rxjs";

import { AuthResponseData } from "../interface/auth.interface";
import { User } from "./user.model";

import { environment } from "../environment/environment";


const urlDb = environment.URLDB

@Injectable({providedIn: 'root'})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

    signup(userEmail: string, userPassword: string) {
        return this.http.post<AuthResponseData>(
            `${urlDb}api/Users`,
            {
              userEmail: userEmail,
              userPassword: userPassword,
              returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(resData => {
              this.handleAuthentication(
                resData.userEmail,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
              );
            })
          );
    }

    login(userEmail: string, userPassword: string) {
        return this.http.post<AuthResponseData>(
            `${urlDb}api/Users`,
            {
              userEmail: userEmail,
              userPassword: userPassword,
              returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(resData => {
              this.handleAuthentication(
                resData.userEmail,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
              );
            })
        );
    }
    //if login exists it will maintain it
    autoLogin() {
      const userData: {
        userEmail: string;
        userId: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return;
      }

      const loadedUser = new User(
        userData.userEmail,
        userData.userId,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        this.user.next(loadedUser);
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.autoLogout(expirationDuration);
      }
    }

    logout() {
      this.user.next(null);
      this.router.navigate(['/auth']);
      localStorage.removeItem('userData');
      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
      }
      this.tokenExpirationTimer = null;
    }

    //sets and expiration time on logout to make sure it doesn't stay stored
    autoLogout(expirationDuration: number) {
      this.tokenExpirationTimer = setTimeout(() => {
        this.logout();
      }, expirationDuration);
    }

    // fetchFavorites() {
    //   this.authService.user.pipe(take(1), exhaustMap(user => {
    //     return this.http.get<Favorites[]>('link')
    //   }))
    // }

    private handleAuthentication(
        userEmail: string,
        userId: string,
        token: string,
        expiresIn: number
      ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(userEmail, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        //key to retrieve user from local storage
        localStorage.setItem('userData', JSON.stringify(user));
      }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
            break;
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist.';
            break;
        case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct.';
            break;
        }
        return throwError(errorMessage);
      }
}
