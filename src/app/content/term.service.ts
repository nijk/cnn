/**
 * Created by nijk on 10/03/2016.
 */

import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

// Interfaces
//import { IResponse } from '../api/api.interfaces';
import { IQueryOptions, ITermLanguage } from './content.interfaces.ts';

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

  private setData(data:ITermLanguage[]): void {
    this._data = data.map((item:any) => {
      item.slug = item.title.replace(' ', '-').toLowerCase();
      item.promoted = !!parseInt(item.promoted);
      return item;
    });
  }

  public getData(promotedOnly: boolean): ITermLanguage[] {
    return !!promotedOnly ? this._data.filter(item => !!item.promoted) : this._data;
  }

  public query(options: IQueryOptions): Observable<ITermLanguage[]> {
    const { promotedOnly = false, term } = options;
    const resource = term ? `${APIResource.termLanguage}/${term.id}` : `${APIResource.termLanguage}/all`;

    return Observable.create(observer => {
      this.send(<any> resource).subscribe(
          json => {
            this.setData(json);
            observer.next(this.getData(promotedOnly));
          },
          e => observer.error(e)
      )
    });
  }
}
