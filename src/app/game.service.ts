import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Level } from './level.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private levelsUrl = 'assets/data.json'; // Path to your data.json

  constructor(private http: HttpClient) {}

  getLevels(): Observable<any> {
    return this.http.get<any>(this.levelsUrl); // Fetching levels data from the JSON file
  }
}
