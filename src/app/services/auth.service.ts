import { Injectable, OnInit } from '@angular/core';
import { Trainer } from '../models/trainer';
import { TrainerService } from './trainer.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: Trainer | null = null;

  constructor(private readonly trainerService: TrainerService) {}

  login(username: string) {
    this.trainerService.getTrainer(username).subscribe({
      next: (trainers) => {
        this._user = trainers[0];
      },
    });
  }

  logout() {
    this._user = null;
  }

  register(username: string) {
    this.trainerService.createTrainer(username).subscribe({
      next: (trainer) => {
        this._user = trainer;
      },
    });
  }

  get user() {
    return this._user;
  }
}
