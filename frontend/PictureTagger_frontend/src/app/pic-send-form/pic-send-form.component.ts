import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageUploadService } from '../image-upload.service';
import { ApiService } from '../api.service';
import { UserInterface } from '../user.interface';
import { AuthService } from '../auth.service';
import { SharedService } from '../picture.service';
import { PicLastRecComponent } from '../pic-last-rec/pic-last-rec.component';

@Component({
  selector: 'app-pic-send-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PicLastRecComponent
  ],
  templateUrl: './pic-send-form.component.html',
  styleUrls: ['./pic-send-form.component.css']
})
export class PicSendFormComponent {
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  imageUrl: string | null = null;
  filePath: string | null = null;
  user: UserInterface | null = null;
  clearResults = false;

  constructor(
    private imageUploadService: ImageUploadService,
    private apiService: ApiService,
    private authService: AuthService,
    private picService: SharedService
  ) { }


  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = {
          email: user.email!,
          username: user.displayName!
        };
      } else {
        this.user = null;
      }
    });
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files?.[0] || null;
    this.selectedFileName = this.selectedFile ? this.selectedFile.name : null;

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
    } else {
      this.imageUrl = null;
    }
  }

  onSubmit(): void {
    if (this.selectedFile) {
      this.imageUploadService.uploadImage(this.selectedFile)
        .then(filePath=> {
          this.filePath = filePath
          console.log('Plik został wysłany:', this.filePath);
          this.sendImagePathToApi(this.filePath);
          this.resetForm();
        })
        .catch(error => {
          console.error('Błąd podczas wysyłania pliku:', error);
        });
    }
  }

  sendImagePathToApi(imagePath: string): void {
    if (this.user && this.user.email) {
      this.apiService.submitImagePath(imagePath, this.user.email).subscribe({
      next: response => {
        console.log('Ścieżka obrazu pomyślnie wysłana do API:', response);
        this.picService.triggerGetProcessedPic(imagePath);
      },
      error: error => {
        console.error('Błąd podczas wysyłania ścieżki obrazu do API:', error);
      }
    });
    }
  }

  resetForm(): void {
    this.selectedFile = null;
    this.selectedFileName = null;
    this.imageUrl = null;
    console.log("zmienilem");
    (document.getElementById('image') as HTMLInputElement).value = '';
  }
}
