import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    GameComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class PagesModule { }
