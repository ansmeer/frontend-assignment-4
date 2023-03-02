import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trainer } from '../models/trainer';
import { Pokemon } from '../models/pokemon';
import { environment } from 'src/environments/environment.development';

@Injectable({ providedIn: 'root' })
export class TrainerService {
  private readonly _apiUrl: string = environment.TRAINER_API_BASE_URL;
  private readonly _protectedHeaders = {
    'X-API-Key': environment.TRAINER_API_KEY,
    'Content-Type': 'application/json',
  };

  constructor(private readonly http: HttpClient) {}

  getTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(this._apiUrl);
  }

  getTrainer(username: string): Observable<Trainer[]> {
    const requestUri = new URL(
      '?' + new URLSearchParams({ username: username }),
      this._apiUrl
    ).toString();
    return this.http.get<Trainer[]>(requestUri); // pipe to change to single trainer instead of array?
  }

  createTrainer(username: string): Observable<Trainer> {
    const requestUri = new URL(this._apiUrl).toString();
    const requestBody = JSON.stringify({ username: username, pokemon: [] });
    const requestOptions = {
      method: 'POST',
      headers: this._protectedHeaders,
    };

    return this.http.post<Trainer>(requestUri, requestBody, requestOptions);
  }

  updateTrainer(userId: number, pokemon: Pokemon[]): Observable<Trainer> {
    const requestUri = new URL(`${this._apiUrl}/${userId}`).toString();
    const requestBody = JSON.stringify({ pokemon: pokemon });
    const requestOptions = {
      method: 'PATCH',
      headers: this._protectedHeaders,
    };
    return this.http.patch<Trainer>(requestUri, requestBody, requestOptions);
  }
}
