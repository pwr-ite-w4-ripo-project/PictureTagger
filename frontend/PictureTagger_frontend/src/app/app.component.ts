import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { CustomMaterialModule } from './material.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PicSendFormComponent } from './pic-send-form/pic-send-form.component'
import { PicLastRecComponent } from './pic-last-rec/pic-last-rec.component';
import { UserHistoryComponent } from './user-history/user-history.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, CustomMaterialModule, LoginComponent, RegisterComponent, PicSendFormComponent, PicLastRecComponent, UserHistoryComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  authService = inject(AuthService)
  http = inject(HttpClient);
  router = inject(Router);


  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!
        });
        this.router.navigateByUrl('/send');
      }
        else {
          this.authService.currentUserSig.set(null)
        }
      console.log(this.authService.currentUserSig())
      });
    }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  showHistory(): void {
    this.router.navigateByUrl('/history');
  }

  sendPic(): void {
    this.router.navigateByUrl('/send');
  }
}