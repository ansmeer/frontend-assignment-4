import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetails } from 'src/app/models/pokemon-details';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  pokemonId: string = '';
  constructor(
    private readonly route: ActivatedRoute,
    private readonly pokemonService: PokemonService
  ) {}

  pokemon?: PokemonDetails;

  baseUrl: string = 'https://pokeapi.co/api/v2/pokemon/';

  ngOnInit(): void {
    this.pokemonId = String(this.route.snapshot.paramMap.get('pokemonId'));
    this.pokemonService.getDetailedPokemon(this.pokemonId).subscribe({
      next: (pkmn) => {
        this.pokemon = pkmn;
        console.log(
          this.pokemon.sprites.other['official-artwork'].front_default
        );
        //console.log(this.pokemon.sprites.other.official_artwork.front_default);
      },
      error: (error: HttpErrorResponse) => {
        console.log('Could not fetch pokemon.', error.message);
      },
    });
  }
}
