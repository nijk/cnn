/**
 * Created by nijk on 12/03/2016.
 */

import { Component, Input } from '@angular/core';

@Component({
    selector: 'term',
    templateUrl: './term.component.html',
})
export class Term {
    constructor(){

    }

    @Input() data;
}
