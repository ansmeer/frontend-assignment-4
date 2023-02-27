import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { PokemonList } from "../models/pokemon";

@Injectable({ providedIn: 'root'})
export class PokemonService{
private readonly apiUrl: string = 'https://pokeapi.co/api/v2/pokemon/?limit=20'

    constructor(private readonly http:HttpClient) {}

    getPokemon(): Observable<PokemonList>{
        return this.http.get<PokemonList>(this.apiUrl)
    }
}