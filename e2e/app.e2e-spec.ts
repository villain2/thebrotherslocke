import { TheBrothersLockePage } from './app.po';

describe('the-brothers-locke App', function() {
  let page: TheBrothersLockePage;

  beforeEach(() => {
    page = new TheBrothersLockePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
