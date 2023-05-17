import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Constants {
  public constants = {
    URL_DATA: 'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries',
    GAME_PAGE: {
      NAME: 'Nombre:',
      POINTS: 'Aciertos',
      ERRORS: 'Errores',
      NEW_GAME: 'Nuevo juego',
    },
    PAGE_NOT_FOUND: {
      PAGE_NOT_EXITS: 'La página que estas buscando no existe :(',
      BACK_BUTTON: 'Regresar al inicio'
    },
    LOADER: {
      WAIT_A_MOMENT: 'Espera un momento, estamos desordenando las cartas',
      DESCRIPTION_MESSAGGE: 'Estoy podria tardar un momento...',
    },
    PLAYERNAME_MODAL: {
      ENTER_YOUR_NAME: 'Ingresa tu nombre',
      ERROR_INPUT: 'Por favor, ingresa un nombre valido',
      SAVE_PLAYER_NAME: 'Guardar nombre de jugador'
    },
    END_GAME_MODAL: {
      CONGRATS: 'Felicidades',
      YOU_WIN: '¡GANASTE!',
      PLAY_AGAIN: '¿Quieres volver a jugar?'
    },
  };
}
