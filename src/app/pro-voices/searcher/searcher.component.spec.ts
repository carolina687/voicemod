import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { SearcherComponent } from './searcher.component';

describe('SearcherComponent', () => {

  let spectator: Spectator<SearcherComponent>;
  const createComponent = createComponentFactory({
    component: SearcherComponent,
  });

  beforeEach(() => spectator = createComponent());

  it('should create component', () => {
    expect(spectator).toBeTruthy();
  });

  it('should emit onSearch', () => {
    jest.spyOn(spectator.component.searchedValue, 'emit');

    spectator.component.onSearch('human');

    expect(spectator.component.searchedValue.emit).toHaveBeenCalledWith('human');
  })
});

