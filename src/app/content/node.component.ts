/**
 * Created by nijk on 12/03/2016.
 */

import { Component, Input } from '@angular/core';

@Component({
    selector: 'node',
    templateUrl: './node.component.html',
})
export class Node {
    constructor(){

    }

    @Input() data;
}
