import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Pokemon, PokemonList } from '../models/pokemon';
import { AuthService } from './auth.service';
import { TrainerService } from './trainer.service';
import { environment } from 'src/environments/environment.development';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly _apiUrl: string = environment.POKE_API_BASE_URL;

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
    private readonly trainerService: TrainerService
  ) {}

  getPokemon(limit = 50, offset = 0): Observable<PokemonList> {
    const requestUrl = `${this._apiUrl}?limit=${limit}&offset=${offset}`;
    return this.http.get<PokemonList>(requestUrl).pipe(
      map((data) => {
        const pokemonList: Pokemon[] = [];
        data.results.forEach((pokemon) => {
          const idParts = pokemon.url.split('/');
          const id = parseInt(idParts[idParts.length - 2], 10);
          pokemonList.push({ ...pokemon, id: id });
        });
        return { ...data, results: pokemonList };
      })
    );
  }

  catch(pokemon: Pokemon): void {
    const user = this.authService.user;
    if (user === null) {
      return;
    }

    const newPokemons = [...user.pokemon, pokemon];
    this.trainerService.updateTrainer(user.id, newPokemons).subscribe({
      next: (newUser) => {
        this.authService.updateUser(newUser);
      },
      error: (error: HttpErrorResponse) => {
        console.log('Could not update user.', error.message);
      },
    });
  }

  release(pokemon: Pokemon): void {
    const user = this.authService.user;
    if (user === null) {
      return;
    }

    const newPokemons = [...user.pokemon].filter(
      (pkmn) => pkmn.name !== pokemon.name
    );
    this.trainerService.updateTrainer(user.id, newPokemons).subscribe({
      next: (newUser) => {
        this.authService.updateUser(newUser);
      },
      error: (error: HttpErrorResponse) => {
        console.log('Could not update user.', error.message);
      },
    });
  }
}
