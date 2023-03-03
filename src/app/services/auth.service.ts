import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Trainer } from '../models/trainer';
import { Redirect } from '../utils/parseRedirect';
import { TrainerService } from './trainer.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: Trainer | null = null;

  constructor(
    private readonly trainerService: TrainerService,
    private readonly router: Router
  ) {}

  login(username: string, redirect: Redirect): void {
    const { route, queryParams } = redirect;
    this.trainerService.getTrainer(username).subscribe({
      next: (trainers) => {
        if (trainers.length === 0) {
          this.register(username, redirect);
        } else {
          this._user = trainers[0];
          localStorage.setItem('username', username);
          this.router.navigate([route], queryParams);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log('Could not login user.', error.message);
      },
    });
  }

  logout(): void {
    this._user = null;
    localStorage.removeItem('username');
    this.router.navigate(['login']);
  }

  register(username: string, redirect: Redirect): void {
    const { route, queryParams } = redirect;
    this.trainerService.createTrainer(username).subscribe({
      next: (trainer) => {
        this._user = trainer;
        localStorage.setItem('username', username);
        this.router.navigate([route], queryParams);
      },
      error: (error: HttpErrorResponse) => {
        console.log('Could not register user.', error.message);
      },
    });
  }

  updateUser(user: Trainer): void {
    this._user = user;
  }

  get user() {
    return this._user;
  }
}
