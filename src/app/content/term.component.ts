/**
 * Created by nijk on 12/03/2016.
 */

import { Component, Input } from '@angular/core';

@Component({
    selector: 'term',
    templateUrl: './term.component.html',
    /*template: `<h3 class="term__title">{{term.title | escapeHtml}}</h3>
        <img *ngIf="term.img" [src]="term.img" class="term__img center-block"/>
        <p *ngIf="isActive && term.body" [innerHTML]="term.body | escapeHtml" class="term__body"></p>`,*/
})
export class Term {
    constructor(){

    }

    @Input() isActive;

    @Input() term;
}
