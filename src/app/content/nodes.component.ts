/**
 * Created by nijk on 12/03/2016.
 */

import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Router, ROUTER_DIRECTIVES } from 'angular2/router';

// Services
import { NodeService } from './node.service';

// Interfaces
import { IContent, ITermLanguage } from './content.interfaces.ts';

// Enums
import { Entity } from './content.enums.ts';

// Components
//import { Messages } from '../messages/messages.component';
import { Terms } from "./terms.component";
import { Node } from "./node.component";

@Component({
  selector: 'nodes',
  providers: [ NodeService ],
  directives: [ CORE_DIRECTIVES, ...ROUTER_DIRECTIVES, Terms, Node/*, Messages*/ ],
  template: require('./nodes.component.html'),
})
export class Nodes implements OnInit {
  constructor(private _router: Router,
              private _nodeService: NodeService) {

  }

  nodes: IContent[] = [];

  fetchNodes(term?: ITermLanguage) {
    const options = term ? { term: term } : {};

    // Nodes
    this._nodeService.query(options).subscribe(
      data => {
        //const messageType = (!!data.resultCount) ? 'success' : 'warning';
        //this._messagesService.addMessage(`${data.resultCount} results found`, messageType, false);
        this.nodes = data;
        console.log('fetchNodes', this.nodes);
      },
      e => ({}))/*this._messagesService.addMessage(<string> e, 'danger', false)*/;
  }

  ngOnInit() {
    console.info('Nodes _router', this._router);
    this.fetchNodes();
  }
}
