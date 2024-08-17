import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: BehaviorSubject<boolean>;
  private userSubject = new BehaviorSubject<any>(null);

  private registerUrl = 'http://localhost:3001/register';
  private loginUrl = 'http://localhost:3001/login';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.user = new BehaviorSubject<boolean>(this.isUserLogedIn);
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(this.registerUrl, user);
  }

  login(credentials: { Email: string, Password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials);
  }

  saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userToken', token);
      this.user.next(true);
    }
  }

  removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userToken');
      this.user.next(false);
    }
  }

  get isUserLogedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('userToken');
    }
    return false;
  }

  getUserState(): Observable<boolean> {
    return this.user.asObservable();
  }

  getUserRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('userToken');
      if (token) {
        // Decode the token to get the user role
        const decodedToken = this.decodeToken(token);
        console.log(decodedToken);
        console.log(decodedToken.role);
        console.log(decodedToken.id);
        return decodedToken?.role || null;       
      }
    }
    return null;
  }

  
  getUserId(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('userToken');
      if (token) {
        // Decode the token to get the user role
        const decodedToken = this.decodeToken(token);
        console.log(decodedToken);
        const id = decodedToken.id
        console.log(id);
        return decodedToken?.id || null;       
      }
    }
    return null;
  }
  getUserName(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('userToken');
      if (token) {
        const decodedToken: any = this.decodeToken(token);
        return decodedToken?.name || null;
      }
    }
    return null;
  }

  getUserEmail(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('userToken');
      if (token) {
        const decodedToken: any = this.decodeToken(token);
        return decodedToken?.email || null;
      }
    }
    return null;
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      return null;
    }
  }
}


  /*
  Platform Injection:

PLATFORM_ID is injected into the service to determine if the code is running in the browser or on the server.
Browser Check:

isPlatformBrowser(this.platformId) is used to check if the current platform is the browser. This ensures that localStorage is only accessed when the code is running in a browser environment.
BehaviorSubject Initialization:

The BehaviorSubject is initialized with the result of this.isUserLogedIn, which now safely checks for localStorage.
  */




/*
Injectable: This decorator marks the class as one that can be injected as a dependency.
Inject and PLATFORM_ID: These are used to determine whether the code is running in the browser or on the server. PLATFORM_ID is a token that can be used to check the runtime environment.
HttpClient: This is the Angular service used to make HTTP requests.
BehaviorSubject and Observable: These are part of RxJS, a library for reactive programming. BehaviorSubject is a special type of Subject that holds a current value and emits it to any new subscribers. Observable represents a stream of data that can be observed over time.
User: A model that likely represents a user object.
isPlatformBrowser: A utility function that checks if the current platform is a browser. It returns true if the code is running in a browser environment, otherwise false.

@Injectable with providedIn: 'root': This makes the AuthService available globally throughout the app. It's a singleton, meaning the same instance is used wherever it's injected.
user: BehaviorSubject<boolean>: This is a BehaviorSubject that holds a boolean value indicating the user's login status. It starts with the value returned by this.isUserLogedIn.
registerUrl and loginUrl: These are URLs pointing to the API endpoints for user registration and login, respectively.

constructor: The constructor injects the HttpClient service and the PLATFORM_ID token.
this.user = new BehaviorSubject<boolean>(this.isUserLogedIn);: This initializes the BehaviorSubject with the current login state (isUserLogedIn). If the user is logged in (based on the presence of a token in localStorage), the value is true, otherwise false.

This method sends a POST request to the registerUrl with the user data. It returns an Observable that emits the response from the server.

This method sends a POST request to the loginUrl with the user's email and password. It also returns an Observable that emits the response from the server.

This method saves the JWT token in localStorage if the code is running in the browser. It also updates the user BehaviorSubject to emit true, indicating that the user is now logged in.

This method removes the JWT token from localStorage and updates the user BehaviorSubject to emit false, indicating that the user is logged out.

This getter method checks if the user is logged in by checking if a token exists in localStorage. It only checks this if the code is running in the browser. If the token is present, it returns true, otherwise false.

This method returns the BehaviorSubject as an Observable. Components can subscribe to this to reactively monitor changes in the user's login status.

Summary
The AuthService is a service responsible for handling user authentication by interacting with a backend API.
It uses BehaviorSubject to manage and emit the user's login state.
It safely accesses localStorage only in browser environments using isPlatformBrowser.
The service provides methods to register, log in, and manage the user's authentication token.
*/ 