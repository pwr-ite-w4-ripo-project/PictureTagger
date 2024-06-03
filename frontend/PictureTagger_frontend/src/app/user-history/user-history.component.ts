import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { UserInterface } from '../user.interface';
import { CommonModule } from '@angular/common';
import { getStorage, ref, getDownloadURL, FirebaseStorage } from "firebase/storage";

@Component({
  selector: 'app-user-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-history.component.html',
  styleUrl: './user-history.component.css'
})

export class UserHistoryComponent {
  files: any[] = [];
  user: UserInterface | null = null;
  storage: FirebaseStorage;

  constructor(private fileService: ApiService, private authService: AuthService) {
    this.storage = getStorage()
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = {
          email: user.email!,
          username: user.displayName!
        };
        this.showPictures();
      } else {
        this.user = null;
      }
    });
    
  }

  async showPictures(): Promise<void> {
    if (this.user) {
      try {
        const response = await this.fileService.getLastPicClassifications(this.user.email).toPromise();
        this.files = response.files;
        for (let i = 0; i < this.files.length; i++) {
          const url = await this.mygetDownloadURL(this.files[i].serveData.url);
          this.files[i].serveData.url = url;
        }
      } catch (error) {
        console.error('Error fetching picture classifications:', error);
      }
    }
  }

  async mygetDownloadURL(uri: string): Promise<string> {
    try {
      const url = await getDownloadURL(ref(this.storage, uri));
      return url;
    } catch (error) {
      console.error('Error fetching download URL:', error);
      return '';
    }
  }

}