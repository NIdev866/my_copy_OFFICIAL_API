import { Smart1Page } from './app.po';

describe('smart1 App', function() {
  let page: Smart1Page;

  beforeEach(() => {
    page = new Smart1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
