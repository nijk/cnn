/**
 * Created by nijk on 12/03/2016.
 */

import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

// Services
import { TermService } from './term.service';

// Interfaces
import { ITermLanguage } from './content.interfaces.ts';

// Components
import { Term } from "./term.component";

@Component({
  selector: 'terms',
  providers: [ TermService ],
  directives: [ CORE_DIRECTIVES, ...ROUTER_DIRECTIVES, FORM_DIRECTIVES, Term ],
  templateUrl: './terms.component.html',
})
export class Terms implements OnInit {
  constructor(private _router: Router,
      private _termService: TermService) {

  }

  //@Input() data;

  terms: ITermLanguage[] = [];

  fetchTerms() {
    // Terms
    this._termService.query({ promotedOnly: true }).subscribe(
      data => {
        //const messageType = (!!data.resultCount) ? 'success' : 'warning';
        //this._messagesService.addMessage(`${data.resultCount} results found`, messageType, false);
        this.terms = data;
        console.info('Terms', this.terms);
      },
      e => ({}))/*this._messagesService.addMessage(<string> e, 'danger', false)*/;
  }

  ngOnInit() {
    console.info('Terms _router', this._router);
    this.fetchTerms();
  }
}
