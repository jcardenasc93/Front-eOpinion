import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAsambleistaComponent } from './home-asambleista.component';

describe('HomeAsambleistaComponent', () => {
  let component: HomeAsambleistaComponent;
  let fixture: ComponentFixture<HomeAsambleistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAsambleistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAsambleistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
