import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaPersonalizada'
})
export class FechaPersonalizadaPipe implements PipeTransform {

  transform(fecha: string): string {

    let fechaModificada = fecha.split(' ');
  
    fechaModificada.splice(2,2)

    return String(fechaModificada);
  }

}
