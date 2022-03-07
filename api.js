export function getFilmList() {
  return fetch('https://swapi.dev/api/films')
    .then((response) => response.json())
    .then((result) => result.results);
}

export function getFilm(film) {
  return fetch(`https://swapi.dev/api/films/${film}`)
    .then((response) => response.json())
    .then((result) => result);
}




// export async function getFilmData(film) {
//   const film = await getFilm(film);
//   return Promise.all([
//     getListData({ listUrl: film.planets }),
//     getListData({ listUrl: film.species }),
//     getListData({ listUrl: film.starships }),
//     getListData({ listUrl: film.characters }),
//   ]).then(([listPlanets, listSpecies, listStarships, listСharacters]) => {
//     return { listPlanets, listSpecies, listStarships, listСharacters, description: film }
//   })
// }

// function getListData({ listUrl }) {
//   const responses = listUrl.map((url) => fetch(url));
//   return Promise.all(responses)
//     .then((responses) => Promise.all(responses.map((response) => response.json())))
//     .then((result) => result);
// }


