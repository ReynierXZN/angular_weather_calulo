import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Weather {
  
  private apiKey = '0235043daf47b92dd716a7b0785a97b6';
  private apiURL = 'http://api.weatherstack.com/current';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const url = `${this.apiURL}?access_key=${this.apiKey}&query=${city}`;
    return this.http.get(url);
  }
}
