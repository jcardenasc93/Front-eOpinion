import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAsambleistaComponent } from './edit-asambleista.component';

describe('EditAsambleistaComponent', () => {
  let component: EditAsambleistaComponent;
  let fixture: ComponentFixture<EditAsambleistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAsambleistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAsambleistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
