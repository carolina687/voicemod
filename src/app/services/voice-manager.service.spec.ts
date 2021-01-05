import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Subject } from 'rxjs';

import { Voice } from '../shared/voices.interface';
import { VoiceDataService } from './voice-data.service';
import { VoiceManagerService } from './voice-manager.service';

describe('VoiceManagerService', () => {
  let spectator: SpectatorService<VoiceManagerService>;
  let voiceDataService: VoiceDataService;
  let voicesSubject = new Subject<Voice[]>();
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

  const createService = createServiceFactory(VoiceManagerService);

  beforeEach(() => {
    spectator = createService();
    voiceDataService = spectator.inject(VoiceDataService);
  });

  it('should exist', () => {
    expect(spectator).toBeTruthy();
  });

  it ('should get voices', () => {
    expect(spectator.service.getVoices()).toEqual(voicesSubject);
  });

  it('should fetch voices', () => {
    jest.spyOn(spectator.service.voicesSubject, "next");
    jest.spyOn(spectator.service, "getVoices").mockReturnValue(voicesSubject);

    spectator.service.getVoices().subscribe(data => {
      expect(spectator.service.voices).toEqual(data);
      expect(spectator.service.voicesSubject.next).toHaveBeenCalled();
    });
  });

  it ('should toggle favorite voice', () => {
    spectator.service.voices = voices;
    jest.spyOn(spectator.service.voicesSubject, "next");

    spectator.service.toggleFav(voices[1].id);

    let favVoice = spectator.service.voices.find(currentVoice => currentVoice.id === voices[1].id);

    expect(favVoice.isFav).toEqual(true);
    expect(spectator.service.voicesSubject.next).toHaveBeenCalled();
  });
});
