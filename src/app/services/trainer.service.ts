import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trainer } from '../models/trainer';

@Injectable({ providedIn: 'root' })
export class TrainerService {
  private readonly _apiUrl: string =
    'https://pickle-abounding-oriole.glitch.me/trainers';
  private readonly _apiKey: string =
    'XJj0Tk5lqqjcbhYCZfSAocbwVD4n3nM6J19BRjAZzBCmM7G245K2AzfJTjd2FmOR';
  private readonly _protectedHeaders = {
    'X-API-Key': this._apiKey,
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
    return this.http.get<Trainer[]>(requestUri);
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

  updateTrainer(userId: number, pokemon: string[]): Observable<Trainer> {
    const requestUri = new URL(`${this._apiUrl}/${userId}`).toString();
    const requestBody = JSON.stringify({ pokemon: pokemon });
    const requestOptions = {
      method: 'PATCH',
      headers: this._protectedHeaders,
    };
    return this.http.patch<Trainer>(requestUri, requestBody, requestOptions);
  }
}
