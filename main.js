async function render() {
  let render = await import('./main-page-api.js');
  return render.renderApp();
}

window.addEventListener('popstate', render);
render();
