import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageUploadService } from '../image-upload.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-pic-send-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './pic-send-form.component.html',
  styleUrls: ['./pic-send-form.component.css']
})
export class PicSendFormComponent {
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  imageUrl: string | null = null;
  filePath: string | null = null;

  constructor(
    private imageUploadService: ImageUploadService,
    private apiService: ApiService
  ) { }

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
          //console.log('Plik został wysłany:', filePath);
          this.filePath = 'gs://picturetagger-94c93.appspot.com/' + filePath
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
    this.apiService.submitImagePath(imagePath).subscribe({
      next: response => {
        console.log('Ścieżka obrazu pomyślnie wysłana do API:', response);
      },
      error: error => {
        console.error('Błąd podczas wysyłania ścieżki obrazu do API:', error);
      }
    });
  }

  resetForm(): void {
    this.selectedFile = null;
    this.selectedFileName = null;
    this.imageUrl = null;
    (document.getElementById('image') as HTMLInputElement).value = '';
  }
}
