import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAsambleistasComponent } from './admin-asambleistas.component';

describe('AdminAsambleistasComponent', () => {
  let component: AdminAsambleistasComponent;
  let fixture: ComponentFixture<AdminAsambleistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAsambleistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAsambleistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
