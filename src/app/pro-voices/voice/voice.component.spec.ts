import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { VoiceComponent } from './voice.component';

describe('VoiceComponent', () => {

  let spectator: Spectator<VoiceComponent>;
  const createComponent = createComponentFactory({
    component: VoiceComponent
  });

  beforeEach(() => spectator = createComponent({
    props: {
      voice: {
        id: "police-bot",
        name: "Police bot",
        icon: "VoicesVoiceIcon02.png",
        "tags": [
          "misc"
      ],
        isFav: false
      },
      currentVoice: {
        id: "possessed",
        name: "Possessed",
        icon: "VoicesVoiceIcon03.png",
        "tags": [
          "horror"
      ],
        isFav: false
      },
    }
  }));

  it('should create component', () => {
    expect(spectator).toBeTruthy();
  });

  it('should emit favToggle', () => {
    jest.spyOn(spectator.component.onFavToggle, 'emit');

    spectator.component.favToggle();

    expect(spectator.component.onFavToggle.emit).toHaveBeenCalledWith(spectator.component.voice.id);
  })

  it('should emit onSelect', () => {
    jest.spyOn(spectator.component.voiceSelected, 'emit');

    spectator.component.onSelect();

    expect(spectator.component.voiceSelected.emit).toHaveBeenCalledWith(spectator.component.voice);
  })
});
