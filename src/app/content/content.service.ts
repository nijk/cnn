/**
 * Created by nijk on 10/03/2016.
 */

import { Injectable, Optional } from 'angular2/core';
import { Http, URLSearchParams } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

// Interfaces
//import { IResponse } from '../api/api.interfaces';
import { IContent } from './content.interfaces.ts';

// Enums
import { Content } from './content.enums.ts';

// Services
import { APIService } from '../api/api.base.service';

@Injectable()
export class ContentService extends APIService {
  constructor(public http: Http) {
    super(http);
  }

  private _content: IContent[] = [];

  public getContent() {
    return this._content;
  }

  public query() {
    // Specific URL params
    const params = new URLSearchParams();
    //params.set('_path', 'content');

    return Observable.create(observer => {
      this.send('content', params).subscribe(
          json => {
            this._content = json;
            observer.next(this.getContent());
          },
          e => observer.error(e)
      )
    });
  }
}
