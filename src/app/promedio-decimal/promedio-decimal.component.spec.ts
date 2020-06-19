import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromedioDecimalComponent } from './promedio-decimal.component';

describe('PromedioDecimalComponent', () => {
  let component: PromedioDecimalComponent;
  let fixture: ComponentFixture<PromedioDecimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromedioDecimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromedioDecimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
