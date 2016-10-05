import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Content } from './content';
import { Nodes } from './nodes.component';
import { Node } from './node.component';
import { Terms } from './terms.component';
import { Term } from './term.component';

export * from './content';

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    Content,
    Nodes,
    Terms,
    Node,
    Term
  ],
  imports: [
    FormsModule,
  ],
})
export default class ContentModule {
}

