import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPrimaryComponent } from './select-primary.component';

describe('SelectPrimaryComponent', () => {
  let component: SelectPrimaryComponent;
  let fixture: ComponentFixture<SelectPrimaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPrimaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
