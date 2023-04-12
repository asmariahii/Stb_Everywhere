import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartesComponent } from './cartes.component';

describe('CartesComponent', () => {
  let component: CartesComponent;
  let fixture: ComponentFixture<CartesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
