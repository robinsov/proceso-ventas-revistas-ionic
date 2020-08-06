import { PedidosDB } from './IPedidos';

export interface RespDedua {
  ok: boolean;
  deudaDelCliente: DeudaDelCliente;
  pedidosDelCliente: PedidosDB[];
}

export interface DeudaDelCliente {
  fechaCreacion: string;
  _id: string;
  monto: number;
  cliente: string;
}