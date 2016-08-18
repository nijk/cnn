/**
 * Created by nijk on 10/03/2016.
 */

import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

// Interfaces
//import { IResponse } from '../api/api.interfaces';
import { IContent, ITermLanguage } from './content.interfaces.ts';

// Enums
import { Entity, APIResource } from './content.enums.ts';

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

  public query(options: { term?: ITermLanguage }): Observable<IContent[]> {
    const { term } = options;
    const resource = term ? `${APIResource.contentByTerm}/${term.id}` : `${APIResource.content}/all`;

    console.info('query', term, resource);

    return Observable.create(observer => {
      this.send(<any> resource).subscribe(
          json => {
            this._data = json;
            observer.next(this.getData());
          },
          e => observer.error(e)
      )
    });
  }
}
