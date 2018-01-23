import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WunderlistListComponent } from './wunderlist-list.component';

describe('WunderlistListComponent', () => {
  let component: WunderlistListComponent;
  let fixture: ComponentFixture<WunderlistListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WunderlistListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WunderlistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
