import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../models/pokemon';
import { Trainer } from '../models/trainer';
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

  login(username: string) {
    this.trainerService.getTrainer(username).subscribe({
      next: (trainers) => {
        if (trainers.length === 0) {
          this.register(username);
        } else {
          this._user = trainers[0];
          this.router.navigate(['catalogue']); // TODO can this be placed differently for separation of concerns?
        }
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
        this.router.navigate(['catalogue']); // TODO can this be placed differently for separation of concerns?
      },
    });
  }

  releasePokemon(pokemon: Pokemon) {
    // TODO Make the page refresh on button click.
    if (this._user != null) {
      this._user.pokemon = this._user.pokemon.filter(
        (pkmn) => pkmn.name !== pokemon.name
      );
      this.trainerService
        .updateTrainer(this._user.id, this._user.pokemon)
        .subscribe();
    }
  }

  catchPokemon(pokemon: Pokemon) {
    // TODO Make the page refresh on button click.
    if (this._user != null) {
      this._user.pokemon.push(pokemon);
      this.trainerService
        .updateTrainer(this._user.id, this._user.pokemon)
        .subscribe();
    }
  }

  get user() {
    return this._user;
  }
}
