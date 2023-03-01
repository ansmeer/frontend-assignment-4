import { Component, OnInit } from '@angular/core';
import { PokemonList } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
})
export class CatalogueComponent implements OnInit {
  public pokemonList?: PokemonList;
  public page = 1;
  private _perPage = 12;

  constructor(private readonly pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.updatePokemonList();
  }

  updatePokemonList() {
    const offset = (this.page - 1) * this._perPage;

    this.pokemonService.getPokemon(this._perPage, offset).subscribe({
      next: (pokemons: PokemonList) => {
        this.pokemonList = pokemons;
      },
      error: (error) => {
        console.log('Yooo!', error.message); // TODO improve error handling.
      },
    });
  }

  handleNextPageClick() {
    this.page++;
    this.updatePokemonList();
  }

  handlePreviousPageClick() {
    this.page--;
    this.updatePokemonList();
  }
}
