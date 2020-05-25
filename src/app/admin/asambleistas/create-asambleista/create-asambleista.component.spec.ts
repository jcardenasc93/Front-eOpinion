import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAsambleistaComponent } from './create-asambleista.component';

describe('CreateAsambleistaComponent', () => {
  let component: CreateAsambleistaComponent;
  let fixture: ComponentFixture<CreateAsambleistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAsambleistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAsambleistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
