import { Component } from '@angular/core';
import { Constants } from 'src/app/core/constants/constants';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  copies: any;

  constructor (
    private constants: Constants
  ) {
    this.copies = this.constants.constants.PAGE_NOT_FOUND;
  }
}
