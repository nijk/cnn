/**
 * Created by nijk on 12/03/2016.
 */

import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { NodeService } from './node.service';

// Components
import { Nodes } from "./nodes.component";
import { IContent } from "./content.interfaces";

@Component({
  selector: 'nodes-by-term',
  providers: [ NodeService ],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngFor="let node of nodes" class="col-xs-12 col-sm-6 col-md-4">
      <node [data]="node"></node>
    </div>`
})
export class NodesByTerm extends Nodes implements OnInit {
  constructor(protected _router: Router,
              protected _nodeService: NodeService
  ) {
    super(_router, _nodeService);
  }

  @Input() term;

  ngOnDestroy(): void {
    console.info('ngOnDestroy', this);
  }

  ngOnInit(): void {
    const options = { promotedOnly: false, term: this.term };
    const nodes = this.getNodes();

    console.info('ngOnInit', this);

    if (nodes.length === 0) {
      this.fetchNodes(options, (nodes) => {
        console.info('NodeByTerm next()', nodes);
      });
    }
  }
}
