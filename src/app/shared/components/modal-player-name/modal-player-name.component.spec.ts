import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPlayerNameComponent } from './modal-player-name.component';

describe('ModalPlayerNameComponent', () => {
  let component: ModalPlayerNameComponent;
  let fixture: ComponentFixture<ModalPlayerNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPlayerNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPlayerNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
