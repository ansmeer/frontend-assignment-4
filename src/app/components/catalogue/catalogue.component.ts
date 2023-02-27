import { Component } from '@angular/core';
import { PokemonList } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent {
  public pokemonList?: PokemonList;

  constructor(private readonly pokemonService:PokemonService){}

  ngOnInit(): void{
    this.pokemonService.getPokemon().subscribe({
      next: (pokemons: PokemonList) => {
        this.pokemonList = pokemons;
      },
      error: () => {
        console.log("Yooo!"); // TODO improve error handling. 
      }
    })
    
  }
}
