import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Egreso } from '../interfaces/IEgresos';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class EgresosService {

  constructor(private http: HttpClient) { }

  getEgresos() {
    return this.http.get<Egreso[]>(`${base_url}egresos`);
  }
  
  crearEgreso(egreso: Egreso) {
    return this.http.post<Egreso[]>(`${base_url}egresos`, egreso);
  }

  modificarEgreso(idEgreso:string, egreso: any) {
    console.log(egreso);
    return this.http.put(`${base_url}egresos/${idEgreso}`, egreso);
  }

  deleteEgreso(idEgreso: string) {
    return this.http.delete(`${base_url}egresos/${idEgreso}`);
  }
}
