import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespDedua } from '../interfaces/IDeuda';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class DeudaService {

  constructor(private http: HttpClient) { }

  getDeudas() {
    return this.http.get<any>(`${base_url}api/deudas`).pipe(
      map(deudas => deudas.deudasDB)
    ); 
  }
  
  getDeudasPorCliente(idCliente: string) {
    return this.http.get<RespDedua>(`${base_url}api/deudas/cliente/${idCliente}`).pipe(
      map(deudas => deudas.deudaDelCliente)
    ); 
  }
}
