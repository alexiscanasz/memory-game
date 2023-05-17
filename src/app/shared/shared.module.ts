import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalPlayerNameComponent } from './components/modal-player-name/modal-player-name.component';
import { ModalEndGameComponent } from './components/modal-end-game/modal-end-game.component';
import { LoaderComponent } from './components/loader/loader.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ModalPlayerNameComponent,
    ModalEndGameComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    ModalPlayerNameComponent,
    ModalEndGameComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
