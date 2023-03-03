import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Pokemon, PokemonList } from '../models/pokemon';
import { AuthService } from './auth.service';
import { TrainerService } from './trainer.service';
import { PokemonDetails } from '../models/pokemon-details';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly apiUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
    private readonly trainerService: TrainerService
  ) {}

  getPokemon(limit = 50, offset = 0): Observable<PokemonList> {
    const requestUrl = `${this.apiUrl}?limit=${limit}&offset=${offset}`;
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
    });
  }

  getDetailedPokemon(pokemonId: string): Observable<PokemonDetails> {
    const requestUrl: string = 'https://pokeapi.co/api/v2/pokemon/' + pokemonId;
    return this.http.get<PokemonDetails>(requestUrl);
  }
}
