import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  get<T>(url: string, params={}) {
    return this.http.get<T>(this.constructURL(url), { params: params });
  }

  post<T>(url: string, body: {[key: string]: any}, params={}) {
    return this.http.post<T>(this.constructURL(url), body, params);
  }

  patch<T>(url: string, body: {[key: string]: any}, params={}) {
    return this.http.patch<T>(this.constructURL(url), body, params);
  }

  delete<T>(url: string, params={}) {
    return this.http.delete<T>(this.constructURL(url), params);
  }

  /**
   * Constructs a URL safely by concatinating base HREF and endpoint.
   * @param url - Endpoint URL. Example: `'/users'`, `'users/'`.
   * @returns - Full URL with base.
   */
  constructURL(url: string): string {
    return new URL(url, environment.apiURL).href;
  }
  
}
