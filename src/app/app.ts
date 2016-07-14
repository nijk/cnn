/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from 'angular2/core';
import { RouteConfig, Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { RouterActive } from './directives/router-active';
import { FORM_PROVIDERS } from 'angular2/common';

// Services
import { AuthService } from './auth/auth.service';
//import { MessagesService } from './messages/messages.service.ts';

// Components
import { Content } from './content/content.component';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [ ...FORM_PROVIDERS, AuthService/*, MessagesService*/ ],
  directives: [ ...ROUTER_DIRECTIVES, RouterActive ],
  encapsulation: ViewEncapsulation.None,
  styles: [ require('./app.css') ],
  template: require('./app.html')
})
@RouteConfig([
  {
    path: '/content',
    component: Content,
    name: 'Content',
    useAsDefault: true
  },
  {
    path: '/term/:name',
    component: Content,
    name: 'Term',
  }
])
export class App {
  name = 'Code Name Nick';
  constructor(){
  }
}
