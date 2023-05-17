import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEndGameComponent } from './modal-end-game.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('ModalEndGameComponent', () => {
  let component: ModalEndGameComponent;
  let fixture: ComponentFixture<ModalEndGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEndGameComponent ],
      providers: [
        NgbActiveModal
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEndGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
