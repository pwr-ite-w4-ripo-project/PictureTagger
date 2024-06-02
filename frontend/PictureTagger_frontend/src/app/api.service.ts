import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private postPicUrl = 'http://localhost:6010/files/original';
  private getPicUrl = 'http://localhost:6010/files/processed';

  constructor(private http: HttpClient) {}

  submitImagePath(imagePath: string, userMail: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'email-acc': userMail});
    const body = { 'url': imagePath };
    return this.http.post(this.postPicUrl, body, { headers });
  }

  getLastPicClassifications(userMail: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'email-acc': userMail});
    return this.http.get(this.getPicUrl, { headers });
  }
  
}
