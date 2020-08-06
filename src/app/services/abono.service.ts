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

  headers = new HttpHeaders({
    'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjI0NDMzNjQ1NDViNTE5OTQwM2Y3MDkiLCJpYXQiOjE1OTY3MjAyMDcsImV4cCI6MTU5Njc2MzQwN30.i9EeW7jv_zro646zFBWBh_v_QVlgXPZ0UNMZVGNP9jg'
  })

  desde: number;

  paginaAbono = 0;

  constructor(private http: HttpClient) { }


  obtenerAbonos(refresh?: boolean) {
    this.paginaAbono++
    
    if (refresh) {
      this.paginaAbono = 0;
    }

    return this.http.get(`${base_url}api/abonos?pagina=${this.paginaAbono}`)
  }

  obtenerAbonoPorIdCliente(idCliente: string) {
    return this.http.get(`${base_url}api/abonos/cliente/${idCliente}`).pipe(
      map((resp: any) => resp.abonoDB)
    )
  }

  hacerAbono(abono: Abono ) {
    return this.http.post<Abono>(`${base_url}api/abonos`, abono, {
      headers: this.headers
    })
  }

}
