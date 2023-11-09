import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly validUsername = "admin";
  private readonly validPassword = "2023_Motorola";

  constructor() {}

  login(username: string, password: string): boolean {
    if (username === this.validUsername && password === this.validPassword) {
      return true;
    }
    return false;
  }
}
