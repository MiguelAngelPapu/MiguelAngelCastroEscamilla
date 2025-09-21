import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TablePrimaryComponent } from './table-primary.component';
import { Component } from '@angular/core';


@Component({
  selector: 'dropdown-primary',
  standalone: true,
  template: ''
})
class MockDropdownPrimaryComponent {}

describe('TablePrimaryComponent', () => {
  let component: TablePrimaryComponent;
  let fixture: ComponentFixture<TablePrimaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePrimaryComponent, MockDropdownPrimaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePrimaryComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
