import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaPoderesComponent } from './carga-poderes.component';

describe('CargaPoderesComponent', () => {
  let component: CargaPoderesComponent;
  let fixture: ComponentFixture<CargaPoderesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaPoderesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaPoderesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
