import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPoderesComponent } from './admin-poderes.component';

describe('AdminPoderesComponent', () => {
  let component: AdminPoderesComponent;
  let fixture: ComponentFixture<AdminPoderesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPoderesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPoderesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
