import { Component } from '@angular/core';
import { Constants } from 'src/app/core/constants/constants';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  copies: any;

  constructor (
    private constants: Constants
  ) {
    this.copies = this.constants.constants.LOADER;
  }
}
