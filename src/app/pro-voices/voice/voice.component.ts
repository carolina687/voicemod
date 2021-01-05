import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Voice } from 'src/app/shared/voices.interface';

@Component({
  selector: 'app-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.css']
})
export class VoiceComponent {
  @Input() voice: Voice;
  @Input() currentVoice: Voice;
  @Output() onFavToggle = new EventEmitter<string>();
  @Output() voiceSelected = new EventEmitter<Voice>();

  favToggle() {
    this.onFavToggle.emit(this.voice.id);
  }

  onSelect() {
    this.voiceSelected.emit(this.voice);
  }
}
