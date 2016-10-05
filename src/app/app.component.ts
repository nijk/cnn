/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

// Services
import { AppState } from './app.service';
//import { MessagesService } from './messages/messages.service.ts';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app.css' ],
  templateUrl: './app.html',
})
export class App {
  name = 'Code Name Nick';

  constructor(
    public appState: AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}
