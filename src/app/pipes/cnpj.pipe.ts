import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'CNPJ'
})
export class CnpjPipe implements PipeTransform {

  transform(value: string, ...args: any[]) {
    if (value.length === 14) {
      return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5")
    }
    return 'error';
  }
}
