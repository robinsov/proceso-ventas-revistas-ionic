import { Cliente } from './ICliente';

export interface RespPedidos {
  ok: boolean;
  pedidosDB: PedidosDB[];
  total: number;
}

export interface PedidosDB {
  activo?: boolean;
  fechaPedido?: string;
  entregado?: boolean;
  cantidad: number;
  _id?: string;
  nombreProducto: string;
  codigoProducto: string;
  precioUnitario: number;
  cliente: Cliente;
  proveedor: string;
  precioTotal?: number;
}

