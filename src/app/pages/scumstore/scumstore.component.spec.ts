import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScumstoreComponent } from './scumstore.component';

describe('ScumstoreComponent', () => {
  let component: ScumstoreComponent;
  let fixture: ComponentFixture<ScumstoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScumstoreComponent]
    });
    fixture = TestBed.createComponent(ScumstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
