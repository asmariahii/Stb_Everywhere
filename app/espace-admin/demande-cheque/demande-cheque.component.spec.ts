import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeChequeComponent } from './demande-cheque.component';

describe('DemandeChequeComponent', () => {
  let component: DemandeChequeComponent;
  let fixture: ComponentFixture<DemandeChequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeChequeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
