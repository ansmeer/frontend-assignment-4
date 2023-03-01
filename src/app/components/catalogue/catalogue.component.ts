import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  constructor(
    private readonly pokemonService: PokemonService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['page']) {
        this.page = params['page'];
      }
    });
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
    this.setPageAsQueryParam();
    this.updatePokemonList();
  }

  handlePreviousPageClick() {
    this.page--;
    this.setPageAsQueryParam();
    this.updatePokemonList();
  }

  setPageAsQueryParam() {
    const queryParams: Params = { page: this.page };
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
    });
  }
}
