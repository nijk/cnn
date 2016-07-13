/**
 * Created by nijk on 10/03/2016.
 */

import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Router } from 'angular2/router';

// Services
import { AuthService } from '../auth/auth.service';
import { NodeService } from './node.service';
import { TermService } from './term.service';

// Interfaces
import { UserItem } from '../user/user.interfaces';
import { IContent, ITermLanguage } from './content.interfaces.ts';

// Enums
import { Entity } from './content.enums.ts';

// Components
//import { Auth } from '../auth/auth.component';
//import { Messages } from '../messages/messages.component';
import { Node } from "./node.component";
import { Term } from "./term.component";

@Component({
    selector: 'auth',
    providers: [ NodeService, TermService ],
    directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, Node, Term/*, Messages*/ ],
    template: require('./content.component.html')
})
export class Content implements OnInit {
    constructor(
        private _router: Router,
        private _nodeService: NodeService,
        private _termService: TermService) {
    }

    nodes: IContent[] = [];

    terms: ITermLanguage[] = [];

    ngOnInit() {
      // Nodes
      this._nodeService.query().subscribe(
          data => {
              console.info('ngOnInit', data);

              //const messageType = (!!data.resultCount) ? 'success' : 'warning';
              //this._messagesService.addMessage(`${data.resultCount} results found`, messageType, false);
              this.nodes = data;
              console.log('Nodes', this.nodes);
          },
          e => ({}))/*this._messagesService.addMessage(<string> e, 'danger', false)*/;

        // Terms
        this._termService.query().subscribe(
          data => {
              //const messageType = (!!data.resultCount) ? 'success' : 'warning';
              //this._messagesService.addMessage(`${data.resultCount} results found`, messageType, false);
              this.terms = data;
              console.log('Terms', this.terms);
          },
          e => ({}))/*this._messagesService.addMessage(<string> e, 'danger', false)*/;
    }
}
