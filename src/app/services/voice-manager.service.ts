import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { Voice } from '../shared/voices.interface';
import { VoiceDataService } from './voice-data.service';

@Injectable({providedIn: 'root'})
export class VoiceManagerService {

  constructor(private voiceDataService: VoiceDataService) { }

  voicesSubject: Subject<Voice[]> = new Subject<Voice[]>();
  voices: Voice[] = [];

  getVoices(): Subject<Voice[]> {
    return this.voicesSubject;
  }

  fetchVoices(): void {
    this.voiceDataService.getVoices().subscribe(data => {
      this.voices = data;
      this.voicesSubject.next(data);
    });
  }

  toggleFav(voiceId: string) {
    this.voices = this.voices.map(voice => {
      if (voice.id === voiceId) {
        voice.isFav = !voice.isFav;
      }
      return voice;
    });
    this.voicesSubject.next(this.voices);
  }
}
