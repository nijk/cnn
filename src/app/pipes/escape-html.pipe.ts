import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash'; // @todo: this should be provided elsewhere and litedashed

@Pipe({name: 'escapeHtml'})
export default class EscapeHtmlPipe implements PipeTransform {
  transform(value: any, args: any[] = []) {
    return _.unescape(value);
  }
}
