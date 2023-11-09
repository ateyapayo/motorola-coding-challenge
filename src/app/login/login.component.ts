import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword = false;
  type = "password";
  usernameError: string = "";
  passwordError: string = "";
  credentialsError: string = "";

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.type = this.showPassword ? "text" : "password";
  }

  onSubmit(): void {
    const username = this.loginForm.get("username")?.value || "";
    const password = this.loginForm.get("password")?.value || "";

    this.usernameError = "";
    this.passwordError = "";
    this.credentialsError = "";

    if (!username && !password) {
      // If we try to Sign In without populating the two fields first, this message will be rendered.
      this.credentialsError = "Please enter some credentials.";
    } else {
      // Regex for checking if we're inserting a valid username.
      // It should have at least 3 characters, can't be an email address and can't be only digits.
      const usernameRegex = /^(?![0-9_@.]+$)[a-zA-Z0-9_]{3,}$/;

      if (!username || !username.match(usernameRegex)) {
        // If the username is not in line with common usernames online, this message will be rendered.
        this.usernameError = "Please enter a valid username.";
      }

      if (!password) {
        // If the password was not inserted and we try to Sign In anyway, this message will be rendered.
        this.passwordError = "Please enter a password.";
      } else {
        console.log("Login form submitted:", this.loginForm.value);
      }
    }
  }
}
