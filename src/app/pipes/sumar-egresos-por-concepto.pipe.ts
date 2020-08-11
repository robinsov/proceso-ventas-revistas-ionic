import { Pipe, PipeTransform } from '@angular/core';
import { from, of } from 'rxjs';
import { reduce, tap, map } from 'rxjs/operators';
import { Egreso } from '../interfaces/IEgresos';
import { element } from 'protractor';

@Pipe({
  name: 'sumarEgresosPorConcepto'
})
export class SumarEgresosPorConceptoPipe implements PipeTransform {

  transform(item: Egreso[]): number {
    let resultado: number;

    of(item).pipe(
      map(egreso => {
        console.log(egreso)
        return resultado += Number(egreso['monto'])
      })
    ).subscribe(console.log)

    

    return resultado;
  }

}
