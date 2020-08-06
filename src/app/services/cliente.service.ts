import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RespCliente, Cliente } from '../interfaces/ICliente';
import { map, tap } from 'rxjs/operators';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  clienteCreado = new EventEmitter<boolean>()

  clientes: Cliente[] = [];

  headers = new HttpHeaders({
    'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjI0NDMzNjQ1NDViNTE5OTQwM2Y3MDkiLCJpYXQiOjE1OTY3MjAyMDcsImV4cCI6MTU5Njc2MzQwN30.i9EeW7jv_zro646zFBWBh_v_QVlgXPZ0UNMZVGNP9jg'
  })

  paginaCliente = 0;

  constructor(private http: HttpClient) {  }

  obtenerClientes() {
    this.paginaCliente++;
    return this.http.get<RespCliente>(`${base_url}api/clientes?pagina=${this.paginaCliente}`).pipe(
      map(clientes => {
        alert('peticion get a clientes')
        return clientes.ClientesDB
      } )
    ); 
  }

  obtenerClientesParaSeleccionar() {
    return this.http.get<RespCliente>(`${base_url}api/clientes`).pipe(
      map(clientes => clientes.ClientesDB)
    );
  }

  obtenerClientePorId(idCliente: string) {
    return this.http.get<RespCliente>(`${base_url}api/clientes/${idCliente}`).pipe(
      map( clientes => clientes.ClientesDB)
    );
  }

  crearCliente(cliente: Cliente){
    return this.http.post<Cliente>(`${base_url}api/clientes`, cliente, {
      headers: this.headers
    }).pipe(
      tap(resp => this.clienteCreado.emit(true))
    )
  }
}
