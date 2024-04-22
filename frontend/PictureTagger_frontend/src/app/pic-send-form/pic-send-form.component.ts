import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { ImageUploadService } from '../image-upload.service'

@Component({
  selector: 'app-pic-send-form',
  standalone: true,
  imports: [
     CommonModule,
     //MatToolbarModule,
     //MatFormFieldModule,
     //MatInputModule,
     FormsModule,
  ],
  templateUrl: './pic-send-form.component.html',
  styleUrl: './pic-send-form.component.css'
})
export class PicSendFormComponent {
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  constructor(private imageUploadService: ImageUploadService) { }

  
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files?.[0] || null;

    // Wyświetl podgląd wybranego zdjęcia
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
        .then(downloadUrl => {
          console.log('Plik został wysłany:', downloadUrl);
          // Wyczyść formularz po wysłaniu
          this.selectedFile = null;
          this.imageUrl = null;
        })
        .catch(error => {
          console.error('Błąd podczas wysyłania pliku:', error);
        });
    }
  }
}
