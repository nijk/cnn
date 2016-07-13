/**
 * Created by nijk on 12/03/2016.
 */

import { Component, Input } from 'angular2/core';

@Component({
    selector: 'term',
    template: require('./term.component.html'),
})
export class Term {
    constructor(){

    }

    @Input() data;
}
