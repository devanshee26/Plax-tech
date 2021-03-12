import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {RecaptchaService} from '../services/recaptcha.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public userForm: FormGroup;
  public message: string;
  public isHuman: boolean;

  constructor(private router: Router,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private recaptcha: RecaptchaService) {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required]
    });
    this.message = '';
    this.isHuman = false;
  }

  ngOnInit(): void {
  }

  async resolved(captchaResponse: string): Promise<void> {
    await this.sendTokenToBackend(captchaResponse);
  }

  sendTokenToBackend(token: string): void {
    this.recaptcha.sendToken(token).subscribe(
      data => {
        this.isHuman = data.success;
      }
    );
  }

  checkPasswords(group: FormGroup): any {
    return group.get('password') === group.get('confirmPassword') ? null : {valid: false};
  }

  addUser(): void {
    if (this.userForm.invalid) {
      return;
    } else {
      this.message = 'Registering...';
      const User = {
        email: this.userForm.controls.email.value,
        password: this.userForm.controls.password.value,
        name: this.userForm.controls.name.value,
        role: 'admin'
      };
      this.authService.signup(User).subscribe(data => {
        window.alert('Registration Successful!');
        this.router.navigate(['/upp-login']);
        this.isHuman = false;
      }, error => {
        window.alert('Try changing user name and/ or email');
        this.message = 'Try changing user name and/ or email';
      });
    }
  }

}
