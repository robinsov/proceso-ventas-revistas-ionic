import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { RespPedidos, PedidosDB } from '../interfaces/IPedidos';

const base_url = environment.url;


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  nuevoPedido = new EventEmitter<boolean>()

  paginaPedido = 0;

  headers = new HttpHeaders({
    'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjI0NDMzNjQ1NDViNTE5OTQwM2Y3MDkiLCJpYXQiOjE1OTY3MjAyMDcsImV4cCI6MTU5Njc2MzQwN30.i9EeW7jv_zro646zFBWBh_v_QVlgXPZ0UNMZVGNP9jg'
  })

  constructor(private http: HttpClient) { }
  
  getPedidos() {
    this.paginaPedido++;
    return this.http.get<RespPedidos>(`${base_url}api/pedidos`).pipe(
      map(pedidos => pedidos.pedidosDB)
    ); 
  }

  getPedidoPorId(idPedido: string) {
    return this.http.get<RespPedidos>(`${base_url}api/pedidos/pedido/${idPedido}`).pipe(
      map(pedidos => pedidos.pedidosDB)
    ); 
  }

  getPedidosPorCliente(idCliente: string) {
    return this.http.get<RespPedidos>(`${base_url}api/pedidos/${idCliente}`).pipe(
      map(pedidos => pedidos.pedidosDB)
    ); 
  }

  cargarPedido(pedido: PedidosDB) {
    return this.http.post(`${base_url}api/pedidos`, pedido, {
      headers: this.headers
    }).pipe(
      tap(resp => this.nuevoPedido.emit(true))
    )
  }

  actualizarPedido(idPedido:string, pedido: PedidosDB) {
    return this.http.put<RespPedidos>(`${base_url}api/pedidos/${idPedido}`, pedido, {
      headers: this.headers
    }).pipe(
      map(pedidos => pedidos.pedidosDB)
    );
  }

}
