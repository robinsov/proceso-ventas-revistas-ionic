export interface EgresosPorConcepto {
  ok?: boolean;
  conceptos?: Concepto[];
  total?: number;
}

export interface Concepto {
  egreso?: Egreso[];
  _id?: string;
  descripcion?: string;
  categoria?: string;
  usuario?: string;
  totalSegunConcepto?: number;
}

export interface Egreso {
  fechaCreacion?: string;
  _id?: string;
  monto?: number;
  concepto?: string;
  usuario?: string;
  __v?: number;
}