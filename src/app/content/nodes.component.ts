/**
 * Created by nijk on 12/03/2016.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { NodeService } from './node.service';

// Interfaces
import { IContent, ITermLanguage, IQueryOptions } from './content.interfaces.ts';

// Enums
import { Entity } from './content.enums.ts';

// Components
//import { Messages } from '../messages/messages.component';
import { Terms } from "./terms.component";
import { Node } from "./node.component";

@Component({
  selector: 'nodes',
  providers: [ NodeService ],
  //directives: [ Terms, Node/*, Messages*/ ],
  //templateUrl: './nodes.component.html',
  template: `
    <div *ngFor="let node of nodes" class="col-xs-12 col-sm-6 col-md-4">
      <node [data]="node"></node>
    </div>`
})
export class Nodes implements OnInit {
  constructor(protected _router: Router,
              protected _nodeService: NodeService) {
  }

  private nodes: IContent[] = [];

  getNodes(): IContent[] {
    return this.nodes;
  }

  fetchNodes(options?: IQueryOptions, next?) {
    options.term = options.term || null;

    const nextHandler = (data) => {
      //const messageType = (!!data.resultCount) ? 'success' : 'warning';
      //this._messagesService.addMessage(`${data.resultCount} results found`, messageType, false);
      this.nodes = data;
      console.info('Nodes next()', this.nodes);
      next && next(this.getNodes());
    };

    return this._nodeService.query(options, nextHandler);
  }

  ngOnInit() {
    this.fetchNodes();
  }
}
