import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncFilmComponent } from './sync-film.component';

describe('SyncFilmComponent', () => {
  let component: SyncFilmComponent;
  let fixture: ComponentFixture<SyncFilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyncFilmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
