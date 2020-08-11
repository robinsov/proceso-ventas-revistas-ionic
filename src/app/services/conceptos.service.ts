import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Concepto } from '../interfaces/egresosPorConcepto';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ConceptosService {

  constructor(private http: HttpClient) { }

  getConceptos() {
    return this.http.get(`${base_url}conceptos`)
  }

  crearConcepto(concepto: any) {
    return this.http.post(`${base_url}conceptos`, concepto)
  }
}
