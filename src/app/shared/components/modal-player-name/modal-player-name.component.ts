import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from 'src/app/core/constants/constants';

@Component({
  selector: 'app-modal-player-name',
  templateUrl: './modal-player-name.component.html',
  styleUrls: ['./modal-player-name.component.scss']
})
export class ModalPlayerNameComponent {
  copies: any;
  actualPlayerName: string;
  showBadgeError: boolean;

  constructor(
    public modalService: NgbActiveModal,
    public constants: Constants
  ) {
    this.copies = this.constants.constants.PLAYERNAME_MODAL;
    this.actualPlayerName = '';
    this.showBadgeError = false;
  }

  savePlayerName(playerName: string): void {
    debugger;
    if (!playerName) {
      this.showBadgeError = true;
      return;
    };
    this.showBadgeError = false;
    localStorage.setItem('playerName', playerName);
    this.modalService.dismiss();
  }

  getPlayerName(): void {
    const actualPlayerName = localStorage.getItem('playerName');
    this.actualPlayerName = actualPlayerName ? actualPlayerName : '';
  }

  closeModal(): void {
    this.getPlayerName();
    if (!!this.actualPlayerName.trim()) {
      this.modalService.dismiss();
      return;
    };
    this.showBadgeError = true;
  }
}
