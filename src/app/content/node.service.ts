/**
 * Created by nijk on 10/03/2016.
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Observer } from 'rxjs/Observer';

// Interfaces
import { IResource } from '../api/api.interfaces';
import { IContent, IQueryOptions } from './content.interfaces.ts';

// Enums
import { Entity } from './content.enums.ts';

// Services
import { APIService } from '../api/api.base.service';

@Injectable()
export class NodeService extends APIService {
  constructor(public http: Http) {
    super(http);
  }

  private _data: IContent[] = [];

  public getData() {
    return this._data;
  }

  public query(options: IQueryOptions, next?: any): Subscription {
    const { term } = options;
    const resource: IResource = {
      collection: (term) ? this.paths.contentByTerm : this.paths.content,
      collectionID: (term && term.id) ? term.id : null
    };

    //console.info('NodeService query', term, resource);

    const observer: Observer<any> = {
      next: (json) => {
        this._data = json;
        next && next(json);
      },
      error: e => observer.error(e),
      complete: () => console.info('observer complete')
    };

    return this.send(<any> resource, null, null, observer);
  }
}
