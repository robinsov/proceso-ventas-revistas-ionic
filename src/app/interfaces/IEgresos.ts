import { Concepto } from './egresosPorConcepto';

export interface Egreso {
  fechaCreacion?: string;
  _id?: string;
  monto?: number;
  concepto?: Concepto;
  usuario?: string;
}