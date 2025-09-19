import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPrimaryComponent } from './dropdown-primary.component';

describe('DropdownPrimaryComponent', () => {
  let component: DropdownPrimaryComponent;
  let fixture: ComponentFixture<DropdownPrimaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownPrimaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownPrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
