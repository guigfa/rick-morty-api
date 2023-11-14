// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;

  authenticate(username: string, image: string): boolean {
    if(username === 'logout' && image === 'logout') {
      return false;
    }
    if (username !== 'logout' && image !== 'logout') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
