/**
 * Created by nijk on 10/03/2016.
 */

import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

// Interfaces
//import { IResponse } from '../api/api.interfaces';
import { ITermLanguage } from './content.interfaces.ts';

// Enums
import { APIResource } from './content.enums.ts';

// Services
import { APIService } from '../api/api.base.service';

@Injectable()
export class TermService extends APIService {
  constructor(public http: Http) {
    super(http);
  }

  private _data: ITermLanguage[] = [];

  private setData(data:ITermLanguage[]):void {
    this._data = data.map((item:any) => {
      item.slug = item.title.replace(' ', '-').toLowerCase();
      item.promoted = !!parseInt(item.promoted);
      return item;
    });
  }

  public getData(promotedOnly):ITermLanguage[] {
    return !!promotedOnly ? this._data.filter(item => !!item.promoted) : this._data;
  }

  public query(options:{ promotedOnly:boolean }):Observable<ITermLanguage[]> {
    const { promotedOnly = false } = options;
    const resource = APIResource[1];

    return Observable.create(observer => {
      this.send(resource).subscribe(
          json => {
            this.setData(json);
            observer.next(this.getData(promotedOnly));
          },
          e => observer.error(e)
      )
    });
  }
}
