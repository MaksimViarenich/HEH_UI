import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiscountCardComponent } from './edit-discount-card.component';

describe('FavoriteCardComponent', () => {
  let component: EditDiscountCardComponent;
  let fixture: ComponentFixture<EditDiscountCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditDiscountCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDiscountCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
