import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private triggerFilename = new Subject<string>();
  triggerFilename$ = this.triggerFilename.asObservable();

  constructor() { }


  triggerGetProcessedPic(filename: string) {
    this.triggerFilename.next(filename);
  }

}
