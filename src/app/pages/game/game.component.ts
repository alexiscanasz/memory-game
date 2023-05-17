import { Component, OnInit } from '@angular/core';
import { InformationService } from 'src/app/shared/services/information/information.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPlayerNameComponent } from 'src/app/shared/components/modal-player-name/modal-player-name.component';
import { Entry, ICardsData } from 'src/app/core/interfaces/cards-data';
import { ModalEndGameComponent } from 'src/app/shared/components/modal-end-game/modal-end-game.component';
import { StateService } from 'src/app/shared/services/state/state.service';
import { Observable, Subject } from 'rxjs';
import { Constants } from 'src/app/core/constants/constants';

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
  startNewGame$: Observable<boolean> | undefined;
  startNewGame: boolean;
  isLoading: boolean;
  copies: any;

  constructor(
    private informationService: InformationService,
    private stateService: StateService,
    public constants: Constants,
    public modalService: NgbModal,
  ) {
    this.numberOfCards = 0;
    this.playerName = '';
    this.points = 0;
    this.errors = 0;
    this.cardsData = [];
    this.isLoading = true;
    this.isEndGame = false;
    this.startNewGame = false;
    this.copies = this.constants.constants.GAME_PAGE;
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

  startNewCardsGame(): void {
    this.points = 0;
    this.errors = 0;
    this.isEndGame = false;
    this.isLoading = true;
    this.initValidations();
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
    this.modalService.open(ModalPlayerNameComponent, { centered: true }).result
    .then(() => this.validatePlayerName())
    .catch(() => this.validatePlayerName());
  }

  getPlayerName(): string {
    return localStorage.getItem('playerName') || '';
  }

  setPlayerName(playerName: string): void {
    this.playerName = playerName;
  }

  getCardsImages(): void {
    this.informationService.getAnimalsData().subscribe((resp: ICardsData) => {
        setTimeout(() => {
          this.cardsData = resp.entries;
          this.numberOfCards = this.cardsData.length;
          this.isLoading = false;
          this.showGameCards();
          this.duplicateCards();
        }, 1000)
      }
    );
  }

  showGameCards(): void {
    const gameCards = document.getElementById('gameCardsGrid');
    (gameCards as HTMLElement).style.display = 'block';
  }

  hideGameCards(): void {
    const gameCards = document.getElementById('gameCardsGrid');
    (gameCards as HTMLElement).style.display = 'none';
  }

  duplicateCards(): void {
    const duplicatedArray = this.cardsData.slice();
    this.cardsData = this.cardsData.concat(duplicatedArray);
    this.shuffleCards();
  }

  shuffleCards(): void {
    this.cardsData = this.cardsData.sort(() => Math.random() - 0.5);
  }

  selectCard(event: Event): void {
    if ((event.target as HTMLElement).classList.contains('card-found')) return;
    this.revealCard((event.target as HTMLElement));
    if (!!this.cardSelected) {
      return this.validateCards(event);
    }
    this.cardSelected = {
      id: (event.target as HTMLElement).id,
      uuid: (event.target as HTMLElement).dataset['uuid'],
    };
  }

  revealCard(cardElement: HTMLElement): void {
    cardElement.classList.add('no-after');
  }

  hideCard(cardElement: HTMLElement | any): void {
    cardElement.classList.remove('no-after');
  }

  validateCards(event: HTMLElement | any): void {
    if ((event.target as HTMLElement).id === this.cardSelected.id) return;

    if ((event.target as HTMLElement).dataset['uuid'] === this.cardSelected.uuid) {
      const firstCardSelected = document.getElementById(this.cardSelected.id);
      firstCardSelected!.classList.add('card-found');
      (event.target as HTMLElement).classList.add('card-found');
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
}
