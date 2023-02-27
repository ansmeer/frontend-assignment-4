import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css'],
})
export class PokemonListItemComponent implements OnInit {
  @Input() data: Pokemon | undefined;
  captured = false;
  imageUrl?: string;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    if (this.data && this.authService.user) {
      if (
        this.authService.user.pokemon.filter(
          (value) => value.name === this.data!.name
        ).length > 0
      ) {
        this.captured = true;
      }
    }

    if (this.data?.id === undefined) {
      this.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png`;
    } else {
      this.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.data?.id}.png`;
    }
  }

  get user() {
    return this.authService.user;
  }
}
