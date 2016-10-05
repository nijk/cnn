/**
 * Created by nijk on 10/03/2016.
 */

import { Component } from '@angular/core';

// Services
import { AppState } from '../app.service';

// Components
import { Terms } from "./terms.component";

@Component({
  selector: 'content',
  //directives: [ Terms ],
  templateUrl: './content.component.html',
})
export class Content {
  constructor(public appState: AppState) {
  }

  ngOnInit() {
    console.info('Content component loaded');
  }
}
