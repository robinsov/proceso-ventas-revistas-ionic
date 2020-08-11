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

  public clienteCreado = new EventEmitter<boolean>()
  public clientes: Cliente[] = [];
  public paginaCliente = 0;

  constructor(private http: HttpClient) {  }

  obtenerClientes() {
    this.paginaCliente++;
    return this.http.get<RespCliente>(`${base_url}clientes?pagina=${this.paginaCliente}`).pipe(
      map(clientes => {
        alert('peticion get a clientes')
        return clientes.ClientesDB
      } )
    ); 
  }

  obtenerClientesParaSeleccionar() {
    return this.http.get<RespCliente>(`${base_url}clientes`).pipe(
      map(clientes => clientes.ClientesDB)
    );
  }

  obtenerClientePorId(idCliente: string) {
    return this.http.get<RespCliente>(`${base_url}clientes/${idCliente}`).pipe(
      map( clientes => clientes.ClientesDB)
    );
  }

  crearCliente(cliente: Cliente){
    return this.http.post<Cliente>(`${base_url}clientes`, cliente).pipe(
      tap(resp => this.clienteCreado.emit(true))
    )
  }

  actualizarCliente(idCiente:string, cliente: Cliente) {
    return this.http.put(`${base_url}clientes/${idCiente}`, cliente)
  }
}
