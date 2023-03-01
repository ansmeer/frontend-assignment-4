import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { parseRedirectTo, Redirect } from 'src/app/utils/parseRedirect';
import { LoginFormData } from '../login-form/login-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() private _redirectToParam?: string;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const redirect = this.getRedirectTo();

    if (this.authService.user) {
      this.router.navigate([redirect.route], redirect.queryParams);
    }

    const localUsername = localStorage.getItem('username');
    if (localUsername) {
      this.authService.login(localUsername, redirect);
    }
  }

  handleLoginFormSubmit(formData: LoginFormData) {
    const redirect = this.getRedirectTo();
    this.authService.login(formData.username, redirect);
  }

  getRedirectTo(): Redirect {
    this.route.queryParams.subscribe({
      next: (params) => {
        this._redirectToParam = params['redirectTo'];
      },
    });

    return parseRedirectTo(this._redirectToParam);
  }
}
