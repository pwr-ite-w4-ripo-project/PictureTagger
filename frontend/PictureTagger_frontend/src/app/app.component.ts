import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { CustomMaterialModule } from './material.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, CustomMaterialModule, LoginComponent, RegisterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  authService = inject(AuthService)
  http = inject(HttpClient);
  // router = inject(Router);

  constructor(private dialogRef: MatDialog) {}

  openDialog() {
    this.dialogRef.open(PopupComponent)
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!
        });
      }
        else {
          this.authService.currentUserSig.set(null)
        }
      console.log(this.authService.currentUserSig())
      });
    }

  logout(): void {
    this.authService.logout();
  }
}