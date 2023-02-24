import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trainer } from '../models/trainer';

@Injectable()
export class TrainerService {
  private readonly apiUrl: string =
    'https://pickle-abounding-oriole.glitch.me/trainers';
  private readonly apiKey: string =
    'XJj0Tk5lqqjcbhYCZfSAocbwVD4n3nM6J19BRjAZzBCmM7G245K2AzfJTjd2FmOR';
  private readonly protectedHeaders = {
    'X-API-Key': this.apiKey,
    'Content-Type': 'application/json',
  };

  constructor(private readonly http: HttpClient) {}

  getTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(this.apiUrl);
  }

  getTrainer(username: string): Observable<Trainer[]> {
    const requestUri = new URL(
      '?' + new URLSearchParams({ username: username }),
      this.apiUrl
    ).toString();
    return this.http.get<Trainer[]>(requestUri);
  }

  createTrainer(username: string): Observable<Trainer> {
    const requestUri = new URL(this.apiUrl).toString();
    const requestBody = JSON.stringify({ username: username, pokemon: [] });
    const requestOptions = {
      method: 'POST',
      headers: this.protectedHeaders,
    };

    return this.http.post<Trainer>(requestUri, requestBody, requestOptions);
  }

  updateTrainer(userId: number, pokemon: string[]): Observable<Trainer> {
    const requestUri = new URL(`${this.apiUrl}/${userId}`).toString();
    const requestBody = JSON.stringify({ pokemon: pokemon });
    const requestOptions = {
      method: 'PATCH',
      headers: this.protectedHeaders,
    };
    return this.http.patch<Trainer>(requestUri, requestBody, requestOptions);
  }
}
