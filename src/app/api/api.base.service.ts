/**
 * Created by nijk on 10/03/2016.
 */

import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

// Interfaces
import { IResource } from "./api.interfaces";

export abstract class APIService {
  constructor(public http: Http) {
  }

  private _endpoint: string = 'http://cnn.dev/api/';

  public paths = {
    content: 'content',
    contentByTerm: 'content/term',
    termLanguage: 'taxonomy/language'
  };

  /**
   * Send API call to endpoint with Headers & Parameters.
   * @param searchParams
   * @param headers
   * @returns {Observable<R>}
   */
  protected send(resource: IResource, searchParams?: URLSearchParams, headers?: Headers, observer?: Observer<any>) {
    const collectionID = resource.collectionID || 'all';
    const path = `${resource.collection}/${collectionID}`; // e.g. content/all

    const params: Object = {
      search: searchParams || new URLSearchParams(),
      headers: headers || new Headers()
    };

    params[ 'search' ].set('_format', 'json');

    if (!observer) {
      // No-op observer
      observer = {
        next: () => {},
        error: () => {},
        complete: () => {}
      };
    }

    return this.http.get(`${this._endpoint}${path}`, params)
      .map(res => res.json())
      .catch(this._handleError)
      .subscribe(observer);
  }

  /**
   * Error handler
   * @param error
   * @returns {ErrorObservable}
   * @private
   */
  private _handleError(error: Response) {
    const errorMessage = (error.json() || { message: 'Server error' }).message;

    console.error(errorMessage, error.json());
    return Observable.throw(new Error(errorMessage));
  }
}
