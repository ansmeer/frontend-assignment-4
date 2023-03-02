import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent {
  @Input() public data?: Pokemon[];

  constructor(private readonly pokemonService: PokemonService) {}

  handleReleasePokemon(pokemon: Pokemon): void {
    this.pokemonService.release(pokemon);
  }

  handleCatchPokemon(pokemon: Pokemon): void {
    this.pokemonService.catch(pokemon);
  }
}
