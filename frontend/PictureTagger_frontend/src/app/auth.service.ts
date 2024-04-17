import { Injectable, inject, signal } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user, GoogleAuthProvider, signInWithRedirect  } from "@angular/fire/auth";
import { Observable, from } from "rxjs";
import { UserInterface } from "./user.interface";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    firebaseAuth = inject(Auth)
    user$ = user(this.firebaseAuth)
    currentUserSig = signal<UserInterface | null | undefined>(undefined)

    
    loginWithGoogle(): Observable<void> {
        const promise = signInWithRedirect(
            this.firebaseAuth,
            new GoogleAuthProvider()
        ).then(() => {})

        return from(promise)
    }

    register(email: string, username: string, password: string): Observable<void> {
        const promise = createUserWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password
        ).then(response => updateProfile(response.user, {displayName: username}))

        return from(promise)
    }

    login(email: string, password: string): Observable<void> {
        const promise = signInWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password
        ).then(() => {})

        return from(promise)
    }

    logout(): Observable<void> {
        const promise = signOut(this.firebaseAuth)

        return from(promise)
    }
}