import { Component, OnInit } from '@angular/core';
import { InformationService } from 'src/app/shared/services/information/information.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPlayerNameComponent } from 'src/app/shared/components/modal-player-name/modal-player-name.component';
import { Entry, ICardsData } from 'src/app/core/interfaces/cards-data';
import { ModalEndGameComponent } from 'src/app/shared/components/modal-end-game/modal-end-game.component';
import { StateService } from 'src/app/shared/services/state/state.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  cardsData: Entry[];
  cardSelected: any;
  playerName: string;
  points: number;
  errors: number;
  numberOfCards: number;
  isEndGame: boolean;
  startNewGame$: any;
  startNewGame: boolean;

  constructor(
    private informationService: InformationService,
    private stateService: StateService,
    public modalService: NgbModal,
  ) {
    this.numberOfCards = 0;
    this.playerName = '';
    this.points = 0;
    this.errors = 0;
    this.cardsData = [];
    this.isEndGame = false;
    this.startNewGame = false;
  }

  ngOnInit(): void {
    this.initValidations();

    this.startNewGame$ = this.stateService.getStartNewGame$();
    this.startNewGame$.subscribe(() => this.startNewCardsGame());
  }

  initValidations(): void {
    this.hideGameCards();
    this.getCardsImages();
    this.validatePlayerName();
  }

  validatePlayerName(): void {
    const playerName = this.getPlayerName();
    if (!playerName) {
      this.modalService.open(ModalPlayerNameComponent, {
        centered: true,
        backdrop: 'static',
        beforeDismiss: (): boolean => {
          this.setPlayerName(this.getPlayerName());
          return true;
        }
      }).result.catch(() => {
        console.log('Ngb: modal closed');
      });
      return;
    }
    this.playerName = playerName;
  }

  editPlayerName(): void {
    this.modalService.open(ModalPlayerNameComponent, { centered: true }).result.then(() => {
      this.validatePlayerName();
    }).catch(() => {
      console.log('Ngb: modal closed');
    });
  }

  getPlayerName(): string {
    return localStorage.getItem('playerName') || '';
  }

  setPlayerName(playerName: string): void {
    this.playerName = playerName;
  }

  getCardsImages(): void {
    this.informationService.getAnimalsData().subscribe((resp: ICardsData) => {
        this.cardsData = resp.entries;
        this.numberOfCards = this.cardsData.length;
        this.showGameCards();
        this.duplicateAnimals();
      }
    );
  }

  showGameCards(): void {
    const gameCards = document.getElementById('gameCards');
    (gameCards as HTMLElement).style.display = 'block';
  }

  hideGameCards(): void {
    const gameCards = document.getElementById('gameCards');
    (gameCards as HTMLElement).style.display = 'none';
  }

  duplicateAnimals(): void {
    const duplicatedArray = this.cardsData.slice();
    this.cardsData = this.cardsData.concat(duplicatedArray);
    this.sortAnimals();
  }

  sortAnimals(): void {
    this.cardsData = this.cardsData.sort(() => Math.random() - 0.5);
  }

  clickOnCard(event: Event): void {
    this.revealCard((event.target as HTMLElement));
    if (!!this.cardSelected) {
      return this.validateCards(event);
    }
    this.cardSelected = {
      id: (event.target as HTMLElement).id,
      uuid: (event.target as HTMLElement).dataset['uuid'],
    }
  }

  revealCard(cardElement: any): void {
    cardElement.classList.add('no-after');
  }

  hideCard(cardElement: HTMLElement | any): void {
    cardElement.classList.remove('no-after');
  }

  validateCards(event: any): void {
    if ((event.target as HTMLElement).id === this.cardSelected.id) {
      return alert('Selecciona una carta diferente');
    }

    if ((event.target as HTMLElement).dataset['uuid'] === this.cardSelected.uuid) {
      this.cardSelected = null;
      this.revealCard((event.target as HTMLElement))
      this.points++;
      this.validateScore();
      return;
    }

    const firstCardSelected = document.getElementById(this.cardSelected.id)
    this.errors++;
    setTimeout(() => {
      this.hideCard(firstCardSelected);
      this.hideCard((event.target as HTMLElement));
    }, 750)
    this.cardSelected = '';
  }

  validateScore(): void {
    if (this.points === this.numberOfCards) {
      this.isEndGame = true;
      this.modalService.open(ModalEndGameComponent, { centered: true }).result.catch(() => {
        console.log('Ngb: modal closed');
      })
    }
  }

  startNewCardsGame(): void {
    this.points = 0;
    this.errors = 0;
    this.isEndGame = false;
    this.initValidations();
  }
}
