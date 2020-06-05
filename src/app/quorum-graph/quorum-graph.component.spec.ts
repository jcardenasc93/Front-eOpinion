import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuorumGraphComponent } from './quorum-graph.component';

describe('QuorumGraphComponent', () => {
  let component: QuorumGraphComponent;
  let fixture: ComponentFixture<QuorumGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuorumGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuorumGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
