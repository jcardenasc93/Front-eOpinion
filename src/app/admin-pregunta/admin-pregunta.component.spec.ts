import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPreguntaComponent } from './admin-pregunta.component';

describe('AdminPreguntaComponent', () => {
  let component: AdminPreguntaComponent;
  let fixture: ComponentFixture<AdminPreguntaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPreguntaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
