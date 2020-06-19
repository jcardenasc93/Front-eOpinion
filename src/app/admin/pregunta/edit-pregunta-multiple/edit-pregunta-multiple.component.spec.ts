import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPreguntaMultipleComponent } from './edit-pregunta-multiple.component';

describe('EditPreguntaMultipleComponent', () => {
  let component: EditPreguntaMultipleComponent;
  let fixture: ComponentFixture<EditPreguntaMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPreguntaMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPreguntaMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
