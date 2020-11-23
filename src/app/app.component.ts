import { Component, OnInit } from '@angular/core';
import { VoiceManagerService } from './services/voice-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'voicemod';

  constructor(
    private voiceManagerService: VoiceManagerService
  ) { }

  ngOnInit() {
    this.voiceManagerService.fetchVoices()
  }
}
