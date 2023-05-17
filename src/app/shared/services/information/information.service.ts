import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  urlData = ' https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=15';

  constructor(
    private http: HttpClient
  ) { }

  getAnimalsData(): Observable<any> {
    return this.http.get(this.urlData);
  }
}
