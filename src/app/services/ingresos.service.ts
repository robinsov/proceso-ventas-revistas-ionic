import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RespIngresos, Ingreso } from '../interfaces/IIngresos';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class IngresosService {

  constructor(private http: HttpClient) { }

  getIngresos() {
    return this.http.get<RespIngresos>(`${base_url}ingresos`)
  }

  crearIngreso(ingreso: Ingreso) {
    return this.http.post<Ingreso[]>(`${base_url}ingresos`, ingreso);
  }

  modificarIngreso(idIngreso:string, ingreso: any) {
    return this.http.put(`${base_url}ingresos/${idIngreso}`, ingreso);
  }

  deleteIngreso(idIngreso: string) {
    return this.http.delete(`${base_url}ingresos/${idIngreso}`);
  }

}
