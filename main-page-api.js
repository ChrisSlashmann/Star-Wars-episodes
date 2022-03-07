const cssPromise = {};

function loadResources(src) {
  if (src.endsWith('.js')) {
    return import(src);
  }

  if (src.endsWith('.css')) {
    if (!cssPromise[src]) {
      const link = document.createElement('link');
      link.href = src;
      link.rel = 'stylesheet';
      cssPromise[src] = new Promise(resolve => {
        link.addEventListener('load', () => resolve())
      })
      document.head.append(link);
    };
    return cssPromise[src];
  }

  return fetch(src).then(res => res.json());
}

async function renderPage(module, majorCss, minorCss) {
  const containerEl = document.getElementById('container');
  containerEl.innerHTML = '';

  await Promise.all([module, majorCss, minorCss].map(src => loadResources(src)))
    .then(([pageModule]) => {
      let res = pageModule.render();
      return res;
    })
    .then((res) => containerEl.append(res))
}

export async function renderApp() {
  const searchParams = new URLSearchParams(location.search);
  const movieId = searchParams.get('movieId');

  if (movieId) {
    await renderPage(
      './movie-page-dom.js',
      'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
      './style/movie-page.css'
    );
  } else {
    await renderPage(
    './main-page-dom.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
    './style/main-page.css',
    );
  };
}
