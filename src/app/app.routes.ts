import { Routes, RouterModule } from '@angular/router';
import contentModule, { Content } from './content/content';
import { Nodes } from './content/nodes.component';
import { NoContent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  /*{ path: '', component: Home, pathMatch: 'full' },
   { path: 'about', loadChildren: () => System.import('./+detail') },*/
  {
    path: '',
    pathMatch: 'full',
    component: Content
  },
  {
    path: 'content/:term',
    component: Nodes,
  },
  {
    path: '**',
    component: NoContent
  },
];
