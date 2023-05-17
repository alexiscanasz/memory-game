import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StateService } from '../../services/state/state.service';

@Component({
  selector: 'app-modal-end-game',
  templateUrl: './modal-end-game.component.html',
  styleUrls: ['./modal-end-game.component.scss']
})
export class ModalEndGameComponent implements OnInit {
  actualPlayerName: string;

  constructor(
    private stateService: StateService,
    public modalService: NgbActiveModal,
  ) {
    this.actualPlayerName = '';
  }

  ngOnInit(): void {
    this.getPlayerName();
  }

  getPlayerName(): void {
    const actualPlayerName = localStorage.getItem('playerName');
    this.actualPlayerName = actualPlayerName ? actualPlayerName : '';
  }

  closeModal(): void {
    this.modalService.dismiss();
  }

  startNewGame(): void {
    this.closeModal();
    this.stateService.startNewGame();
  }
}
