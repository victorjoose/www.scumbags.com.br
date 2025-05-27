import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScumstoreComponent } from './scumstore.component';
import { TestTranslateModule } from 'tests/test-translate.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ScumstoreComponent', () => {
  let component: ScumstoreComponent;
  let fixture: ComponentFixture<ScumstoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [ScumstoreComponent],
    imports: [TestTranslateModule],
    providers: [
      {
        provide: ActivatedRoute,
        useValue: { queryParams: of({}) }
      }
    ]
    });

    fixture = TestBed.createComponent(ScumstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
