import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Endpoint público solicitado para el examen
  private baseUrl = 'https://digi-api.com/api/v1/digimon'; 

  constructor(private http: HttpClient) { }

  // Recuperar 50 elementos por página desde la API nueva
  getDigimons(page: number = 0): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?pageSize=50&page=${page}`);
  }

  // Buscar un elemento por nombre para la vista de detalle
  getDigimonByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`https://digimon-api.vercel.app/api/digimon/name/${name}`);
  }
}