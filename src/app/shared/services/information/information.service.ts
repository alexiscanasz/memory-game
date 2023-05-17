import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/core/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  urlData: string;

  constructor(
    private http: HttpClient,
    public constants: Constants
  ) {
    this.urlData = this.constants.constants.URL_DATA;
  }

  getAnimalsData(): Observable<any> {
    return this.http.get(this.urlData, { params: {per_page: 15}});
  }
}
