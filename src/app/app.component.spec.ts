import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { AppComponent } from './app.component';
import { VoiceManagerService } from './services/voice-manager.service';

describe('AppComponent', () => {

  let spectator: Spectator<AppComponent>;
  let voiceManagerService: VoiceManagerService;

  const createComponent = createComponentFactory({
    component: AppComponent,
    mocks: [VoiceManagerService],
    schemas: [NO_ERRORS_SCHEMA]
  });

  beforeEach(() => {
    spectator = createComponent();
    voiceManagerService = spectator.inject(VoiceManagerService);
  });

  it('should create component', () => {
    expect(spectator).toBeTruthy();
  });

  it(`should have as title 'voicemod'`, () => {
    expect(spectator.component.title).toEqual('voicemod');
  });

  it('should fetch voices', () => {
    jest.spyOn(voiceManagerService, 'fetchVoices');

    spectator.component.ngOnInit();

    expect(voiceManagerService.fetchVoices).toHaveBeenCalled();
  });

});

