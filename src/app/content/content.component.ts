/**
 * Created by nijk on 10/03/2016.
 */

import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Router } from 'angular2/router';

// Services
import { AuthService } from '../auth/auth.service';
import { ContentService } from './content.service';

// Interfaces
import { UserItem } from '../user/user.interfaces';
import { IContent } from './content.interfaces.ts';

// Enums
import {  } from './content.enums.ts';

// Components
//import { Auth } from '../auth/auth.component';
//import { Messages } from '../messages/messages.component';
import { Node } from "./node.component";

@Component({
    selector: 'auth',
    providers: [ ContentService ],
    directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, Node/*, Messages*/ ],
    template: require('./content.component.html')
})
export class Content implements OnInit {
    constructor(
        private _router: Router,
        private _contentService: ContentService) {
    }

    results: IContent[] = [];

    ngOnInit() {
      this._contentService.query().subscribe(
          data => {
              //const messageType = (!!data.resultCount) ? 'success' : 'warning';
              //this._messagesService.addMessage(`${data.resultCount} results found`, messageType, false);
              this.results = data;
              console.log('Results', this.results);
          },
          e => ({}))/*this._messagesService.addMessage(<string> e, 'danger', false)*/;
    }
}
