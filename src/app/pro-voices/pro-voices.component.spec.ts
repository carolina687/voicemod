import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { Subject } from 'rxjs';

import { ProVoicesComponent } from './pro-voices.component';
import { VoiceManagerService } from '../services/voice-manager.service';
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

  it('should fill categories array', () => {
    spectator.component.voices = voices;

    spectator.component.ngOnInit();

    expect(spectator.component.categories).toEqual(["misc", "horror"]);
  });

  it('should toggle fav', () => {
    jest.spyOn(voiceManagerService, "toggleFav");

    spectator.component.favToggle('horror');

    expect(voiceManagerService.toggleFav).toHaveBeenCalledWith('horror');
  });

  it('should select voice', () => {
    spectator.component.onVoiceSelected(voices[1]);

    expect(spectator.component.voiceSelected).toEqual(voices[1]);
  });

  it('should select random voice', () => {
    spectator.component.onRandom();

    expect(spectator.component.voiceSelected).toEqual(spectator.component.voices[spectator.component.randomNumber]);
  });

  it('should change the order to ascending', () => {
    spectator.component.filteredVoices = voices;

    spectator.component.orderChange(true);

    expect(spectator.component.filteredVoices).toEqual(voices);
  });

  it('should change the order to descending', () => {
    spectator.component.filteredVoices = voices;
    let descVoices =  [
      {
        id: "possessed",
        name: "Possessed",
        icon: "VoicesVoiceIcon03.png",
        "tags": [
          "horror"
      ],
        isFav: false
      },
      {
        id: "police-bot",
        name: "Police bot",
        icon: "VoicesVoiceIcon02.png",
        "tags": [
          "misc"
      ],
        isFav: false
      }
    ];

    spectator.component.orderChange(false);

    expect(spectator.component.filteredVoices).toEqual(descVoices);
  });

  it('should show all categories', () => {
    spectator.component.catChange('all');

    expect(spectator.component.filteredVoices).toEqual(spectator.component.voices);
  });

  it('should show one category', () => {
    spectator.component.voices = voices;

    spectator.component.catChange('horror');

    expect(spectator.component.filteredVoices).toEqual([voices[0]]);
  });

  it('should show searched voices', () => {
    spectator.component.voices = voices;

    spectator.component.onSearch('horror');

    expect(spectator.component.filteredVoices).toEqual([voices[0]]);
  });

  it('should show all voices y searched value is an empty string', () => {
    spectator.component.onSearch('');

    expect(spectator.component.filteredVoices).toEqual(spectator.component.voices);
  });
})
