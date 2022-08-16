const airplane = document.createElement('div');
const docEl = document.documentElement;

const showAirplane = (x) => {

};
const x = window.matchMedia('(max-width: 758px)');
showAirplane(x);
x.addEventListener('change', () => {
  if (x.matches) {
    airplane.style = 'visibility: hidden';
  }
});


airplane.style.cssText = `
    position: fixed;
    right: 0;
    top: 0;
    width: 50px;
    height: 50px;
    pointer-events: none;
    background: url('img/airplane.svg') center/contain no-repeat;
  `;


document.body.append(airplane);

const calcPositionFly = () => {
  const topScroll = docEl.clientHeight - airplane.clientWidth;
  const maxScroll = docEl.scrollHeight - docEl.clientHeight;

  const percent = (window.pageYOffset / maxScroll) * 100;

  const top = topScroll - (topScroll * percent) / 100;
  airplane.style.transform = `translateY(${top}px)`;
};


window.addEventListener('scroll', () => {
  requestAnimationFrame(calcPositionFly);
});

calcPositionFly();
