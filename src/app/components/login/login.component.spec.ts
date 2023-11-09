import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../auth.service";
import { Router } from "@angular/router";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authService = jasmine.createSpyObj("AuthService", ["login"]);
    router = jasmine.createSpyObj("Router", ["navigate"]);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it("should create the LoginComponent", () => {
    expect(component).toBeTruthy();
  });

  it("should submit the form with valid credentials", () => {
    component.loginForm.get("username")?.setValue("validusername");
    component.loginForm.get("password")?.setValue("validpassword");

    authService.login.and.returnValue(true);

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith(
      "validusername",
      "validpassword"
    );
    expect(router.navigate).toHaveBeenCalledWith(["/home"]);
  });

  it("should show error messages for invalid credentials", () => {
    component.loginForm.get("username")?.setValue("invalidusername");
    component.loginForm.get("password")?.setValue("");

    component.onSubmit();

    expect(component.passwordError).toBe("Please enter a password.");
  });

  it("should show a credentials error message for empty fields", () => {
    component.onSubmit();

    expect(component.credentialsError).toBe("Please enter some credentials.");
  });

  it("should show a credentials error message for failed authentication", () => {
    component.loginForm.get("username")?.setValue("validusername");
    component.loginForm.get("password")?.setValue("validpassword");

    authService.login.and.returnValue(false);

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith(
      "validusername",
      "validpassword"
    );
    expect(component.credentialsError).toBe("Invalid username or password.");
  });
});
