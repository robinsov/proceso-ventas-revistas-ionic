import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Abono, RespAbono } from '../interfaces/IAbono';
import { map } from 'rxjs/operators';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AbonoService {

  desde: number;
  paginaAbono = 0;

  constructor(private http: HttpClient) { }

  obtenerAbonos(refresh?: boolean) {
    this.paginaAbono++
    
    if (refresh) {
      this.paginaAbono = 0;
    }
    return this.http.get(`${base_url}abonos?pagina=${this.paginaAbono}`)
  }

  obtenerAbonoPorIdCliente(idCliente: string) {
    return this.http.get(`${base_url}abonos/cliente/${idCliente}`).pipe(
      map((resp: any) => resp.abonoDB)
    )
  }

  hacerAbono(abono: Abono ) {
    return this.http.post<Abono>(`${base_url}abonos`, abono)
  }

}
