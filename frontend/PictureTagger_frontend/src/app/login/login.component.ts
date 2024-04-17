import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CustomMaterialModule } from '../material.module';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from '@angular/material/icon';

const googleLogoURL = 
"https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";

@Component({
  selector: 'app-login, ngbd-alert-basic',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CustomMaterialModule, FormsModule, RouterOutlet, RouterLink, NgbAlertModule],
})
export class LoginComponent {
  constructor (
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
          this.matIconRegistry.addSvgIcon(
      "logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
    }

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

  _loginWithGoogle(): void {
    this.authService.loginWithGoogle().subscribe( {
      next: () => {
      this.router.navigateByUrl('/register');
    },
    error: (err) => {
      this.errorMessage = err.code;
    }
  })
  }


  onSubmit(): void {
    const rawForm = this.form.getRawValue()
    this.authService.login(rawForm.email, rawForm.password).subscribe( {
      next: () => {
      this.router.navigateByUrl('/send');
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