/**
 * Created by nijk on 12/03/2016.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Services
import { TermService } from './term.service';

// Interfaces
import { ITermLanguage, IQueryOptions } from './content.interfaces.ts';

@Component({
  selector: 'terms',
  providers: [ TermService ],
  host: {
    '(document:keydown)': 'handleKeyEvent($event)',
  },
  template: `
    <div *ngFor="let term of terms" class="col-xs-12 col-sm-6 col-md-4">
      <term [term]="term"
            [isActive]="term.isActive"
            (click)="onClick(term)"
            [ngClass]="{ term: true, 'term--active': term.isActive }"></term>
      <nodes-by-term *ngIf="shouldBePresent(term)" 
            [ngClass]="{ nodes: true, 'nodes--active': term.isActive }"
            [term]="term"></nodes-by-term>
    </div>`
})
export class Terms implements OnInit {
  constructor(private _router: Router,
      private _termService: TermService) {

  }

  terms: ITermLanguage[] = [];

  handleKeyEvent(e): void {
    if (e.key === 'Escape' && !!this.getActiveTerm()) {
      this.setActiveTerm(null);
    }
  }

  shouldBePresent(term): boolean {
    return term.isActive || term.isPrevActive;
  }

  getPrevActiveTerms(): ITermLanguage[] {
    return _.filter(this.terms, 'isPrevActive');
  };

  getActiveTerm(): ITermLanguage | null {
    return _.findLast(this.terms, 'isActive');
  };

  setActiveTerm(nextActiveTerm: ITermLanguage | null): ITermLanguage {
    const terms = _.map(this.terms, term => {
      if (term.isActive) {
        return this.setActiveAttr(term, false, true);
      }

      if (!!term && !!nextActiveTerm && term.uuid === nextActiveTerm.uuid) {
        return this.setActiveAttr(term, true, false);
      }
      return term;
    });

    this.terms = terms;

    return this.getActiveTerm();
  }

  setActiveAttr(term: ITermLanguage, isActive: boolean = false, isPrevActive: boolean = false): ITermLanguage {
    return Object.assign({}, term, { isActive, isPrevActive });
  }

  fetchTerms(): void {
    const next = (data) => {
      //const messageType = (!!data.resultCount) ? 'success' : 'warning';
      //this._messagesService.addMessage(`${data.resultCount} results found`, messageType, false);
      this.terms = data.map((item) => this.setActiveAttr(item, false));
      console.info('Terms next()', this.terms);
    };

    // Terms
    this._termService.query(<IQueryOptions> { promotedOnly: true }, next)
  }

  onClick(term: ITermLanguage): void {
    const termToSet = term.isActive ? null : term;
    this.setActiveTerm(termToSet);
  }

  ngOnInit(): void {
    this.fetchTerms();
  }
}
