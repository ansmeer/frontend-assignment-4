import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { AuthService } from 'src/app/services/auth.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent {
  @Input() data: Pokemon[] | undefined;

  constructor(
    private readonly authService: AuthService,
    private readonly trainerService: TrainerService
  ) {}

  handleReleasePokemon(pokemon: Pokemon) {
    this.authService.releasePokemon(pokemon);
  }
  handleCatchPokemon(pokemon: Pokemon) {
    this.authService.catchPokemon(pokemon);
  }
}
