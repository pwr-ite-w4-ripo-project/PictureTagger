import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStorage, getStorage } from '@angular/fire/storage'

// insert firebase credentials here 
const firebaseConfig = {
  apiKey: "AIzaSyDzvZTYrxhoDidYC62JQN71bv7XH-L7cEo",
  authDomain: "picturetagger-94c93.firebaseapp.com",
  projectId: "picturetagger-94c93",
  storageBucket: "picturetagger-94c93.appspot.com",
  messagingSenderId: "1093652083369",
  appId: "1:1093652083369:web:8b290d521009338cc1afb8",
  measurementId: "G-FLWE01FZJY"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
      provideStorage(() => getStorage())
    ]), provideAnimationsAsync(),
  ]
};
