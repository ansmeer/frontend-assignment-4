import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { AuthService } from 'src/app/services/auth.service';
import Required from 'src/app/utils/required';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css'],
})
export class PokemonListItemComponent implements OnInit {
  @Input('data')
  @Required
  pokemon!: Pokemon;

  captured = false;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    if (this.pokemon && this.authService.user) {
      if (
        this.authService.user.pokemon.filter(
          (value) => value.name === this.pokemon!.name
        ).length > 0
      ) {
        this.captured = true;
      }
    }
  }

  get user() {
    return this.authService.user;
  }
}
