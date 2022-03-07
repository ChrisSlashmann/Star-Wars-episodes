const searchParams = new URLSearchParams(location.search);
const movieId = searchParams.get('movieId');

async function getFilm(film) {
  return await fetch(`https://swapi.dev/api/films/${film}`)
    .then((response) => response.json())
    .then((result) => result);
}

function createEpisodePage(data) {
  const containerEl = document.getElementById('container');
  const page = document.createElement('div');
  const title = document.createElement('h1');
  const poster = document.createElement('img');
  const paragraph = document.createElement('p');

  page.classList.add('movie');

  title.textContent = `Episode ${data.episode_id}: ${data.title}`;
  title.classList.add('movie__title', 'mb-5');

  poster.src = `./img/${data.episode_id}.jpg`;
  poster.alt = 'Episode poster';
  poster.classList.add('movie__poster', 'flex-shrink-0');

  paragraph.textContent = data.opening_crawl;
  paragraph.classList.add('movie__summary', 'mb-5');

  page.append(title);
  page.append(paragraph);

  containerEl.append(page);
  containerEl.append(poster);

  return page;
};

function createList(listTitle) {
  const list = document.createElement('ul');
  const title = document.createElement('h2');

  list.classList.add('movie__list', 'mb-4');
  title.classList.add('movie__list_title');
  title.textContent = `${listTitle}:`;

  list.append(title);

  return list;
};

function createListItem(name) {
  const item = document.createElement('li');
  item.classList.add('movie__list_item');
  item.textContent = name;
  return item;
};

async function getListItemName(url) {
  let dataSource = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  let movieData = await dataSource.json();
  console.log(movieData);
  return movieData;
};

async function renderList(list, container) {
  await Promise.all(list.map(el => getListItemName(el)))
    .then(values => {
    values.map((value) => container.append(createListItem(value.name)));
  });
};

function createBtnBack() {
  const buttonBack = document.createElement('a');
  // buttonBack.href = url;
  buttonBack.addEventListener('click', (e) => {
    btnBackOnClick(e);
  });
  buttonBack.textContent = 'Back to episodes';
  buttonBack.classList.add('movie__back');
  return buttonBack;
}

async function renderNextPage() {
  let render = await import('./main-page-api.js');
  return render.renderApp();
}

function btnBackOnClick(e) {
  e.preventDefault();
  history.pushState(null, '', '../');
  // history.go(-1);
  renderNextPage();
};

export async function render() {
  const film = await getFilm(movieId);
  console.log(film);

  // Planets List
  let planetsListEl = createList('Planets');
  planetsListEl.style.grid = 'planets';
  renderList(film.planets, planetsListEl);

  // Species List
  let speciesListEl = createList('Species');
  speciesListEl.style.grid = 'species';
  renderList(film.species, speciesListEl);

  let btnBackEl = createBtnBack();

  let moviePage = createEpisodePage(film);
  moviePage.append(planetsListEl);
  moviePage.append(speciesListEl);
  moviePage.append(btnBackEl);

  return moviePage;
}
