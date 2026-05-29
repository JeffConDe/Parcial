import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Endpoint público solicitado para el examen
  private baseUrl = 'https://digimon-api.vercel.app/api/digimon'; 

  constructor(private http: HttpClient) { }

  // Recuperar la colección completa de elementos
  getDigimons(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Buscar un elemento por nombre para la vista de detalle
  getDigimonByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/name/${name}`);
  }
}