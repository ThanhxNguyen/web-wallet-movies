import { WebWalletMoviesPage } from './app.po';

describe('web-wallet-movies App', function() {
  let page: WebWalletMoviesPage;

  beforeEach(() => {
    page = new WebWalletMoviesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
