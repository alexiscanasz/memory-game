import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-player-name',
  templateUrl: './modal-player-name.component.html',
  styleUrls: ['./modal-player-name.component.scss']
})
export class ModalPlayerNameComponent {
  actualPlayerName: string;
  showBadgeError: boolean;

  constructor(
    public modalService: NgbActiveModal
  ) {
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
