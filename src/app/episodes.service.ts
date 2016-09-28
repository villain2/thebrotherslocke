import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Episode }      from './episodes/episode';
import { Observable }   from 'rxjs/Observable';

@Injectable()
export class EpisodesService {

  private _episodesUrl     = 'assets/json/episodes.json';

  constructor(private http: Http) { }

  getEpisodes (): Observable<Episode[]> {
    return this.http.get(this._episodesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response)
  {
    if(res.status < 200 || res.status >= 300)
    {
      throw new Error('Bad response status: ' + res.status);
    }

    let body  = res.json();
    console.log(body.episodes);
    return body.episodes || {};
  }

  private handleError (error: any)
  {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
