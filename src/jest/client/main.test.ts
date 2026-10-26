import {describe, expect, it, jest} from '@jest/globals';

import {init} from '/assets/js/main';


describe('main', () => {
  it('runs in a DOM environment', () => {
    document.body.innerHTML = '<div id="app"></div>';
    expect(document.getElementById('app')).not.toBeNull();
  });

  it('logs when loaded', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => undefined);
    init();
    expect(log).toHaveBeenCalledWith('Client asset loaded');
  });

  it('logs the last message of the root element', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => undefined);
    const root = document.createElement('main');
    root.dataset.messages = 'first,last';
    init(root);
    expect(log).toHaveBeenCalledWith('last');
  });
});
