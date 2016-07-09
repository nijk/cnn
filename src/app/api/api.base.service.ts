/**
 * Created by nijk on 10/03/2016.
 */

import { Http, Response, Headers, URLSearchParams } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

// Interfaces
//import { UserCredentials } from "./user.interfaces";

export abstract class APIService {
    constructor(public http: Http) {
    }

    private _endpoint: string = 'http://cnn.dev/';

    /**
     * Send API call to endpoint with Headers & Parameters.
     * @param path
     * @param credentials
     * @param search
     * @returns {Observable<R>}
     */
    protected send(path: string, search?: URLSearchParams) {
        const params: Object = {
            search: new URLSearchParams()
        };

        params['search'].set('_format', 'json');

        if (!!search) {
            // Merge optional search query params
            //params['search'] = search;
        }

        return this.http.get(`${this._endpoint}${path}`, params)
            .map(res => res.json())
            .catch(this._handleError);
    }

    /**
     * Error handler
     * @param error
     * @returns {ErrorObservable}
     * @private
     */
    private _handleError (error: Response) {
        const errorMessage = (error.json() ||  { message: 'Server error' }).message;

        console.error(errorMessage, error.json());
        return Observable.throw(new Error(errorMessage));
    }
}
