import { Injectable, inject } from '@angular/core';
import {
    Storage,
    getDownloadURL,
    ref,
    uploadBytes,
  } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {


  storage = inject(Storage)

  async uploadImage(file: File): Promise<string> {
    const filePath = `images/${new Date().getTime()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);

    const uploadTask = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(uploadTask.ref);

    return filePath;
  }
}
