import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { OrderComponent } from './order.component';

describe('OrderComponent', () => {

  let spectator: Spectator<OrderComponent>;

  const createComponent = createComponentFactory({
    component: OrderComponent,
  });

  beforeEach(() => spectator = createComponent());

  it('should create component', () => {
    expect(spectator).toBeTruthy();
  });

  it('should emit onOrderChange', () => {
    jest.spyOn(spectator.component.onOrderChange, 'emit');

    spectator.component.orderChange();

    expect(spectator.component.onOrderChange.emit).toHaveBeenCalledWith(false);
  })
});

