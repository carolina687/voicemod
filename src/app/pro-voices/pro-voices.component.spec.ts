import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { ProVoicesComponent } from './pro-voices.component';
import { VoiceManagerService } from '../services/voice-manager.service';
import { Subject } from 'rxjs';
import { Voice } from '../shared/voices.interface';

describe('ProVoicesComponent', () => {

  let spectator: Spectator<ProVoicesComponent>;
  let voiceManagerService: VoiceManagerService;
  let voices = [
    {
      id: "police-bot",
      name: "Police bot",
      icon: "VoicesVoiceIcon02.png",
      "tags": [
        "misc"
    ],
      isFav: false
    },
    {
      id: "possessed",
      name: "Possessed",
      icon: "VoicesVoiceIcon03.png",
      "tags": [
        "horror"
    ],
      isFav: false
    },
  ];
  let voicesSubject = new Subject<Voice[]>();

  const createComponent = createComponentFactory({
    component: ProVoicesComponent,
    schemas: [NO_ERRORS_SCHEMA]
  });

  beforeEach(() => {
    spectator = createComponent();
    voiceManagerService = spectator.inject(VoiceManagerService);
  });

  it('should create component', () => {
    expect(spectator).toBeTruthy;
  });

  it('should get voices from manager service', () => {
    voicesSubject.next(voices);
    jest.spyOn(voiceManagerService, "getVoices").mockReturnValue(voicesSubject);

    spectator.component.subscription = voiceManagerService.getVoices().subscribe(data => {
      expect(spectator.component.voices).toEqual(data);
      }
    );
  });
})
