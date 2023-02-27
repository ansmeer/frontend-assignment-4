import { Injectable, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon';
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
