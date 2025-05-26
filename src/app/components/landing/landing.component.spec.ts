import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingComponent } from './landing.component';
import { TestTranslateModule } from 'tests/test-translate.module';
import { ElementRef } from '@angular/core';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingComponent],
      imports: [TestTranslateModule]
    });
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
  });

  it('deve ser criado', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('deve marcar videoStarted como true após reprodução do vídeo', async () => {
    const videoElementMock = {
      muted: false,
      loop: false,
      play: jasmine.createSpy('play').and.returnValue(Promise.resolve())
    } as any as HTMLVideoElement;

    component.backgroundVideo = new ElementRef(videoElementMock);
    await component.ngAfterViewInit();

    expect(videoElementMock.muted).toBeTrue();
    expect(videoElementMock.loop).toBeTrue();
    expect(videoElementMock.play).toHaveBeenCalled();
    expect(component.videoStarted).toBeTrue();
  });
});
