/**
 * Created by nijk on 10/03/2016.
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Observer } from 'rxjs/Observer';

// Interfaces
//import { IResponse } from '../api/api.interfaces';
import { IQueryOptions, ITermLanguage } from './content.interfaces.ts';

// Services
import { APIService } from '../api/api.base.service';
import { IResource } from "../api/api.interfaces";

@Injectable()
export class TermService extends APIService {
  constructor(public http: Http) {
    super(http);
  }

  private _data: ITermLanguage[] = [];

  private setData(data: ITermLanguage[]): void {
    this._data = data.map((item:any) => {
      item.promoted = !!parseInt(item.promoted);
      return item;
    });
  }

  public getData(promotedOnly: boolean): ITermLanguage[] {
    return (promotedOnly ? this._data.filter(item => !!item.promoted) : this._data);
  }

  public query(options: IQueryOptions, next?: any): Subscription {
    const { promotedOnly = false, term } = options;
    const resource: IResource = {
      collection: this.paths.termLanguage,
      collectionID: (term && term.id) ? term.id : null
    };

    const observer: Observer<any> = {
      next: (json) => {
        this.setData(json);
        next && next(this.getData(promotedOnly));
      },
      error: (e) => observer.error(e),
      complete: () => console.info('observer complete')
    };

    return this.send(resource, null, null, observer);
  }
}
