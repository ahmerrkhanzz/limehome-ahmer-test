import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private _http: HttpClient
  ) { }

  getPlaces() {
    let url: string = `https://places.sit.ls.hereapi.com/places/v1/autosuggest?at=40.74917,-73.98529&q=chrysler&apiKey=agosy6KoOQ3tnhIsfBpGXHIR-IoNChWvUXDXebl4iY4`;
    return this._http.get(url);
  }

  public selectedPlace = new BehaviorSubject<object>(null)


}
