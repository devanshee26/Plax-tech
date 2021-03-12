import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InterfaceService} from '../services/interface.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public message: string;

  constructor(private router: Router,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private interfaceService: InterfaceService) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.message = '';
  }

  ngOnInit(): void {
    this.authService.logout();
  }

  login(): void {
    this.message = 'Logging in...';
    if (this.loginForm.invalid) {
      return;
    } else {
      const User = {
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value
      };
      this.authService.login(User).subscribe(data => {
        const item = {
          token: data.token,
          expiration: new Date().getTime() + 60 * 60 * 1000,
        };
        localStorage.setItem('token', JSON.stringify(item));
        this.interfaceService.isUserLoggedIn.next(true);
        this.router.navigate(['/index']);
      }, error => {
        this.message = 'Incorrect username or password';
      });
    }
  }

}
