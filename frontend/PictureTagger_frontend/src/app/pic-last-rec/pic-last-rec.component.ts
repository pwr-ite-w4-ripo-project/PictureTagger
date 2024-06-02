import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { UserInterface } from '../user.interface';
import { AuthService } from '../auth.service';
import { SharedService } from '../picture.service';

@Component({
  selector: 'app-pic-last-rec',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pic-last-rec.component.html',
  styleUrl: './pic-last-rec.component.css'
})
export class PicLastRecComponent {
  user: UserInterface | null = null;
  classifications: string[] = [];
  isLoading = true;
  visible = false;
  emptyRecognize = false;


  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private picService: SharedService
  ) {}

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

    this.picService.triggerFilename$.subscribe(filename => {
      this.visible = true;
      this.getProcessedPic(filename);
    });


  }

  getProcessedPic(filename: string): void {
    if (this.user && this.user.email) {

      this.getResponse(filename).then((found: boolean) => {
        if (found) {
          this.isLoading = false;
        } else {
          this.emptyRecognize = true;
        }
    }).catch((error: any) => {
      console.error('Błąd podczas odbierania odpowiedzi od serwera:', error);
    });
    
      // this.apiService.getLastPicClassifications(this.user.email).subscribe({
      //   next: (data: any) => {
      //     console.log(data);
      //     this.extractClassifications(data, filename);
      //     this.isLoading = false;
      //   },
      //   error: (error: any) => {
      //     console.error('Error fetching files:', error);
      //     this.isLoading = false;
      //   }
      // });
    }
  }
   

  async getResponse(filename: string, retries = 30): Promise<boolean> {
    this.classifications = [];
    this.isLoading = true;
    return new Promise<boolean>((resolve, reject) => {
        let remainingRetries = retries;

        const checkFile = () => {
            this.apiService.getLastPicClassifications(this.user!.email).subscribe((data: any) => {
                console.log(data);
                const file = data.files.find((file: any) => file.storageData.uri.includes(filename));
                
                if (file) {
                    const classifications = file.classifications.map((classification: any) => classification.name);
                    this.classifications = classifications;
                    resolve(true);
                } else if (remainingRetries > 0) {
                    remainingRetries--;
                    setTimeout(checkFile, 2000);
                } else {
                    resolve(false);
                }
            }, (error: any) => {
                reject(error);
            });
        };

        checkFile();
    });
}


}