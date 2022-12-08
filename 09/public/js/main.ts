const backdrop = document.querySelector('.backdrop');
const sideDrawer = document.querySelector('.mobile-nav');
const menuToggle = document.querySelector('#side-menu-toggle');

function backdropClickHandler() {
  // @ts-expect-error TS(2531): Object is possibly 'null'.
  backdrop.style.display = 'none';
  // @ts-expect-error TS(2531): Object is possibly 'null'.
  sideDrawer.classList.remove('open');
}

function menuToggleClickHandler() {
  // @ts-expect-error TS(2531): Object is possibly 'null'.
  backdrop.style.display = 'block';
  // @ts-expect-error TS(2531): Object is possibly 'null'.
  sideDrawer.classList.add('open');
}

// @ts-expect-error TS(2531): Object is possibly 'null'.
backdrop.addEventListener('click', backdropClickHandler);
// @ts-expect-error TS(2531): Object is possibly 'null'.
menuToggle.addEventListener('click', menuToggleClickHandler);
