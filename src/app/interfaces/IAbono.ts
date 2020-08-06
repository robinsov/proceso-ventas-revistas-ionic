export interface RespAbono {
  ok: boolean;
  abono?: Abono;
  abonoDB?: Abono;
}

export interface Abono {
  fechaCreacion?: string;
  _id?: string;
  cliente?: string;
  monto?: number;
  deudaAnterior?: number;
  deudaActual?: number;
}