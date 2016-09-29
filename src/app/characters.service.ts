import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Character }    from './characters/character';
import { Observable }   from 'rxjs/Observable';


@Injectable()
export class CharactersService {

  private _charactersUrl    = 'assets/json/characters.json';

  constructor(private http: Http) { }

  getCharacters (): Observable<Character[]>
  {
    return this.http.get(this._charactersUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData (res: Response)
  {
    if(res.status < 200 || res.status >= 300)
    {
      throw new Error('Bad response status: ' + res.status);
    }

    let body  = res.json();
    return body.characters || {};
  }

  private handleError (error: any)
  {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
