import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInicioComponent } from './modal-inicio.component';

describe('ModalInicioComponent', () => {
  let component: ModalInicioComponent;
  let fixture: ComponentFixture<ModalInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
