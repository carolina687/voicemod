import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { CategoriesComponent } from './categories.component';

describe('CategoriesComponent', () => {

  let spectator: Spectator<CategoriesComponent>;

  const createComponent = createComponentFactory({
    component: CategoriesComponent
  });

  beforeEach(() => spectator = createComponent({
    props: {
      categories: ["misc", "misc", "human", "robotic", "robotic", "enviroment", "character", "horror"]
    }
  }));

  it('should create component', () => {
    expect(spectator).toBeTruthy();
  });

  it('should create uniqueCategories', () => {
    spectator.component.ngOnInit();

    expect(spectator.component.uniqueCategories).toEqual(['misc', 'human', 'robotic', 'enviroment', 'character', 'horror']);
  });

  it('should emit onSearch', () => {
    jest.spyOn(spectator.component.selectedCat, 'emit');

    spectator.component.categoryChange('human');

    expect(spectator.component.selectedCat.emit).toHaveBeenCalledWith('human');
  })
});

