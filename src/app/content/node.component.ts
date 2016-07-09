/**
 * Created by nijk on 12/03/2016.
 */

import { Component, Input } from 'angular2/core';

@Component({
    selector: 'node',
    template: require('./node.component.html'),
})
export class Node {
    constructor(){

    }

    @Input() data;
}
