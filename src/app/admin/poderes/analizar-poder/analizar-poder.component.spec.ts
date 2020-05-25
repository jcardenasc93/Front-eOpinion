import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalizarPoderComponent } from './analizar-poder.component';

describe('AnalizarPoderComponent', () => {
  let component: AnalizarPoderComponent;
  let fixture: ComponentFixture<AnalizarPoderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalizarPoderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalizarPoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
