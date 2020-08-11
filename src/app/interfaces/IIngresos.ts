export interface RespIngresos {
  ok?: boolean;
  ingresos?: Ingreso[];
  pagina?: number;
  totalRecaudado?: number;
  totalRegistros?: number;
}

export interface Ingreso {
  fechaCreacion?: string;
  _id?: string;
  monto?: number;
  concepto?: any;
  usuario?: string;
}