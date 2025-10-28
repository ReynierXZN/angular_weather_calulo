import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'b08c9ddd6769b38039acf22708efbde4'; // your OpenWeatherMap key
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private proxyUrl = 'https://api.allorigins.win/raw?url='; // proxy to bypass CORS

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    // create the full target URL
    const targetUrl = `${this.baseUrl}?q=${city}&units=metric&appid=${this.apiKey}`;
    // wrap with proxy to make it work online
    const fullUrl = `${this.proxyUrl}${encodeURIComponent(targetUrl)}`;
    return this.http.get(fullUrl);
  }
}
