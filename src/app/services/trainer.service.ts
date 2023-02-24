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

  constructor(private readonly http: HttpClient) {}

  getTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(this.apiUrl);
  }
}
