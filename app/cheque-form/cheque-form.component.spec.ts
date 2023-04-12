import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeFormComponent } from './cheque-form.component';

describe('ChequeFormComponent', () => {
  let component: ChequeFormComponent;
  let fixture: ComponentFixture<ChequeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChequeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChequeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
