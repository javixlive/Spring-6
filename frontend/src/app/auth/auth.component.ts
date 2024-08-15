import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { AuthResponseData } from '../interface/auth.interface';
import { AuthService } from './auth.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})

export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string  = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
      this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
      if(!form.valid) return;
      console.log(form)
      const email = form.value.email;
      const password = form.value.password;

      let authObs: Observable<AuthResponseData>;

      this.isLoading = true;

      if (this.isLoginMode) {
          authObs = this.authService.login(email, password);
        } else {
          authObs = this.authService.signup(email, password);
        }

      authObs.subscribe(
          resData => {
            this.isLoading = false;
            this.router.navigate(['/home']);
          },
          errorMessage => {
            this.error = errorMessage;
            this.isLoading = false;
          }
        );

      form.reset();

    }
}
