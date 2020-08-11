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

  public nuevoPedido = new EventEmitter<boolean>()
  public paginaPedido = 0;

  constructor(private http: HttpClient) { }
  
  getPedidos() {
    this.paginaPedido++;
    return this.http.get<RespPedidos>(`${base_url}pedidos`).pipe(
      map(pedidos => pedidos.pedidosDB)
    ); 
  }

  getPedidoPorId(idPedido: string) {
    return this.http.get<RespPedidos>(`${base_url}pedidos/pedido/${idPedido}`).pipe(
      map(pedidos => pedidos.pedidosDB)
    ); 
  }

  getPedidosPorCliente(idCliente: string) {
    return this.http.get<RespPedidos>(`${base_url}pedidos/${idCliente}`).pipe(
      map(pedidos => pedidos.pedidosDB)
    ); 
  }

  cargarPedido(pedido: PedidosDB) {
    return this.http.post(`${base_url}pedidos`, pedido).pipe(
      tap(resp => this.nuevoPedido.emit(true))
    )
  }

  actualizarPedido(idPedido:string, pedido: PedidosDB) {
    return this.http.put<RespPedidos>(`${base_url}pedidos/${idPedido}`, pedido).pipe(
      map(pedidos => pedidos.pedidosDB)
    );
  }

}
