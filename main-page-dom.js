async function getFilmList() {
  return await fetch('https://swapi.dev/api/films')
    .then((response) => response.json())
    .then((result) => result.results);
}

function createNavigation() {
  const title = document.createElement('h1');
  title.classList.add('nav__title');
  title.textContent = 'Star Wars Catalogue';

  const navigation = document.createElement('nav');
  navigation.prepend(title);

  return navigation;
};

function createEpisodesList() {
  const list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
};

function createEpisodeItem(url, episode, epTitle) {
  const item = document.createElement('li');
  const link = document.createElement('a');
  const poster = document.createElement('img');
  const title = document.createElement('h2');

  item.classList.add('episode');

  link.href = url;
  link.addEventListener('click', (e) => {
    btnOnClick(e, url);
  });
  link.classList.add('episode__link', 'list-group-item', 'list-group-item-action', 'd-flex', 'gap-3');

  poster.src = `./img/${episode}.jpg`;
  poster.alt = 'Episode poster';
  poster.classList.add('episode__poster', 'flex-shrink-0');

  title.textContent = `Episode ${episode}: ${epTitle}`;
  title.classList.add('mb-0');

  link.append(poster);
  link.append(title);
  item.append(link);

  return item;
};

async function renderNextPage() {
  let render = await import('./main-page-api.js');
  return render.renderApp();
}

function btnOnClick(e, url) {
  e.preventDefault();
  history.pushState(null, '', url);
  location.href = url;
  renderNextPage();
};


export async function render() {
  const elList = await getFilmList();

  const navigationEl = createNavigation();
  const listEl = createEpisodesList();

  navigationEl.append(listEl);

  for (let i = 0; i < elList.length; i++) {
    let episodeItem = createEpisodeItem(`?movieId=${i+1}`, elList[i].episode_id, elList[i].title);
    listEl.append(episodeItem);
  }

  return navigationEl;
};
