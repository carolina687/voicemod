import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Voice } from '../shared/voices.interface';
import { voicesjson } from 'src/assets/json/voices-json';


@Injectable({ providedIn: 'root' })
export class VoiceDataService {

  // constructor(private httpClient: HttpClient) {}

  getVoices(): Observable<Voice[]> {

    /*  The following http request couldn't be done because I was provided with the json file,
    but I leave it here commented as it is how should be done if we'd like to fetch
    it from an api

    return this.httpClient.get<Voices[]>(
      'http://voicesapiendpoint.json').pipe(
        map(responseData => {
          return responseData.map(item => ({
            ...item,
            isFav: false
          }))
        })
      ); */

    return voicesjson.pipe(
      map(response => {
        return response.map(item => ({
          ...item,
          isFav: false
        }));
      })
    );
  }
}
