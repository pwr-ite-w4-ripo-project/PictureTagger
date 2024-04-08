import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CustomMaterialModule } from '../material.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CustomMaterialModule, FormsModule, RouterOutlet, RouterLink],
})
export class LoginComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;

  clickRegister(): void {
    this.router.navigateByUrl('/register')
  }

  onSubmit(): void {
    const rawForm = this.form.getRawValue()
    this.authService.login(rawForm.email, rawForm.password).subscribe( {
      next: () => {
      this.router.navigateByUrl('/');
    },
    error: (err) => {
      this.errorMessage = this.convertErrMess(err.code);
    }
  })
  }

  convertErrMess(code: string): string {
    switch (code) {
      case 'auth/invalid-email': {
          return 'Sorry invalid email!';
      }
      case 'auth/invalid-credential': {
          return 'Sorry invalid credential!';
      }
      default: {
          return 'Login error try again later.';
      }
  }
  }

}