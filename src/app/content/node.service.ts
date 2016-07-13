/**
 * Created by nijk on 10/03/2016.
 */

import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

// Interfaces
//import { IResponse } from '../api/api.interfaces';
import { IContent } from './content.interfaces.ts';

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

  public query() {
    const resource = APIResource[0];

    return Observable.create(observer => {
      this.send(resource).subscribe(
          json => {
            this._data = json;
            observer.next(this.getData());
          },
          e => observer.error(e)
      )
    });
  }
}
