import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { VoiceDataService } from './voice-data.service';

describe('VoiceDataService', () => {
  let spectator: SpectatorService<VoiceDataService>;
  const createService = createServiceFactory(VoiceDataService);

  beforeEach(() => spectator = createService());

  it('should exist', () => {
    expect(spectator.service.getVoices()).toBeTruthy();
  });
});
