import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Voice } from 'src/app/shared/voices.interface';
import { VoiceManagerService } from 'src/app/services/voice-manager.service';

@Component({
  selector: 'app-pro-voices',
  templateUrl: './pro-voices.component.html',
  styleUrls: ['./pro-voices.component.css']
})
export class ProVoicesComponent implements OnInit, OnDestroy {
  voices: Voice[];
  subscription: Subscription;
  voiceSelected: Voice;
  randomNumber: number;
  categories = [];
  filteredVoices: Voice[];

  constructor(
    private voiceManagerService: VoiceManagerService
  ) {
    this.subscription = this.voiceManagerService.getVoices().subscribe(
      data => this.voices = data
    )
  }

  ngOnInit() {
    this.voices.sort((a,b) => 0 - (a.name > b.name ? -1 : 1));
    this.voices.map(voice => {
      let tags = [];
      tags = voice.tags;
      this.categories.push(...tags);
    });
    this.filteredVoices = this.voices;
  }

  favVoices(): Voice[] {
    return this.voices.filter(voice => voice.isFav);
  }

  favToggle(voiceId: string) {
    this.voiceManagerService.toggleFav(voiceId);
  }

  onVoiceSelected(voice: Voice) {
    this.voiceSelected = voice;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onRandom() {
    this.randomNumber = Math.floor(Math.random() * (this.voices.length)) + 1;
    this.voiceSelected = this.voices[this.randomNumber];
  }

  orderChange(isAsc: boolean) {
    if (isAsc) {
      this.filteredVoices.sort((a,b) => 0 - (a.name > b.name ? -1 : 1));
    } else {
      this.filteredVoices.sort((a,b) => 0 - (a.name > b.name ? 1 : -1));
    }
  }

  catChange(category: string) {
    if (category === "all") {
      this.filteredVoices = this.voices;
    } else {
      this.filteredVoices = this.voices.filter(voice => voice.tags.includes(category));
    }
    console.log(this.filteredVoices);
  }

  onSearch(value: string) {
    if (value != "") {
      this.filteredVoices = this.voices.filter(voice => {
				if (voice.icon.includes(value)) {
					return true;
				} else if (voice.id.includes(value)) {
					return true;
				} else if (voice.name.includes(value)) {
					return true;
				} else if (voice.tags.includes(value)) {
					return true;
				}
      });
    } else {
			this.filteredVoices = this.voices;
		}
  }
}
