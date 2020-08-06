export interface Cliente {
  _id?: string;
  nombre?: string;
  email?: string;
  direccion?: string;
  telefono?: string;
  fechaCreacion?: string;
  usuario?: string;
  __v?: number;
}

export interface RespCliente {
  ok: boolean;
  ClientesDB: Cliente[];
  total: number;
}
