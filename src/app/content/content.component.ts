/**
 * Created by nijk on 10/03/2016.
 */

import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Router, ROUTER_DIRECTIVES } from 'angular2/router';

// Components
//import { Messages } from '../messages/messages.component';
import { Terms } from "./terms.component";

@Component({
  selector: 'content',
  directives: [ CORE_DIRECTIVES, ...ROUTER_DIRECTIVES, Terms/*, Messages*/ ],
  template: require('./content.component.html')
})
export class Content implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
