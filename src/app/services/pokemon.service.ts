import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Pokemon, PokemonList } from '../models/pokemon';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly apiUrl: string =
    'https://pokeapi.co/api/v2/pokemon/?limit=20';

  constructor(private readonly http: HttpClient) {}

  getPokemon(): Observable<PokemonList> {
    return this.http.get<PokemonList>(this.apiUrl).pipe(
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
}
