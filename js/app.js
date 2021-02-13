// Preloader
$(window).on('load', function () {
	$preloader = $('.wrapper'),
	$preloader.delay(650).slideUp();
});

class Button {
  constructor(node) {
    this.button = node;
    this.distance = 80;
    this.a = 160;
    this.mouseHasEntered = false;
    this.mouseIsInButtonTerritory = false;
    this.init();
    this.handleEvent();
  }

  init() {
    let {
      width,
      height,
      x: centerPointX,
      y: centerPointY
    } = this.button.getBoundingClientRect(); // gives width, height, left-x,top-y of the button

    centerPointX = centerPointX + width / 2; //  center point of button on x-axis
    centerPointY = centerPointY + height / 2; //  center point of button on y-axis

    this.centerPointX = centerPointX;
    this.centerPointY = centerPointY;
  }

  handleEvent() {
    window.addEventListener("mousemove", (e) => this.handleMove(e));
    window.addEventListener("mouseout", () => this.handleReset());
    window.addEventListener("scroll", () => this.init()); //  updates the button x,y position // for the button below viewport
    buttonObjects.push({
      button: this.button,
      isHovered: this.mouseIsInButtonTerritory
    });
  }

  handleMove(e) {
    const x = e.x; // current x of cursor
    const y = e.y; // current y of cursor

    const leftBorderLine = this.centerPointX - this.distance;
    const rightBorderLine = this.centerPointX + this.distance;
    const topBorderLine = this.centerPointY - this.distance;
    const bottomBorderline = this.centerPointY + this.distance;
    this.xWalk = (x - this.centerPointX) / 2; // the distance to move the button when mouse moves on X axis
    this.yWalk = (y - this.centerPointY) / 2; // the distance to move the button when mouse moves on Y axis

    this.mouseIsInButtonTerritory =
      x > leftBorderLine &&
      x < rightBorderLine &&
      y > topBorderLine &&
      y < bottomBorderline; // becomes true if  mouse is inside all of these border-line

    if (this.mouseIsInButtonTerritory) {
      if (!this.mouseHasEntered) {
        //  this must happen only once to create outside borderline
        //  creating another level borderline by increasing distance;
        //  while cursor is returning the button comes out of nearest border-line and return from this borderline
        this.distance = 240;
        this.mouseHasEntered = true;
      }
      this.handleCatch(); // when mouse enters the button's territory
    } else {
      this.handleReset();
    }

    const index = buttonObjects.findIndex(
      (button) => button.button === this.button
    );
    buttonObjects[index].isHovered = this.mouseIsInButtonTerritory;
  }

  handleCatch() {
    // translates the button in the direction where cursor is.
    this.button.style.transform = `translate(${this.xWalk}px, ${this.yWalk}px)`;
  }

  handleReset() {
    // resets the position of the button as it was initial.
    this.button.style.transform = `translate(${0}px, ${0}px)`;
    if (this.mouseHasEntered) this.distance = 50;
    this.mouseHasEntered = false; // when button is return to it's position (mouseHasEntered = true) lets to increase the initial borderline of button for the next time
		
	}
}

function handleBubble(e) {
  bubble.style.left = `${e.x}px`;
  bubble.style.top = `${e.y}px`;

  const hasAnyButtonHovered = buttonObjects.some(
    (buttonObj) => buttonObj.isHovered
  );
  if (hasAnyButtonHovered || e.target.classList.contains("nav__link")) {
    bubble.classList.add("bubble--big");
    document.body.style.cursor = "pointer";
  } else {
    bubble.classList.remove("bubble--big");
    document.body.style.cursor = "auto";
  }
}

const buttons = document.querySelectorAll(".button");
const bubble = document.querySelector(".bubble");
const buttonObjects = [];


//search cursor
$(document).mouseleave(function () {
	bubble.classList.add('cursorOut');
});
$(document).mouseenter(function () {
	bubble.classList.remove('cursorOut');
});


buttons.forEach((button) => {
  const node = button.querySelector(".button__like-text");
  new Button(node);
});

window.addEventListener("mousemove", (e) => handleBubble(e));


const navSlide = () => {

	const burger = document.querySelector('.menu .button');
	const overlay = document.querySelector('.menu-overlay');
	const line = document.querySelectorAll('.menu .button .burger .line');
	const lay = document.querySelector('.menu-overlay .lay');
	const bubble = document.querySelector('.bubble');

	burger.addEventListener('click', ()=> {

		overlay.classList.toggle('overlay-active');
		bubble.classList.toggle('mbm');
		overlay.style.animation = `navLinkFade 0.5s ease forwards 0.3s`;

		// overlay.style.animation = `navLinkFadeOut 0.5s ease forwards 0.3s`;

		line.forEach((i) => {
			i.classList.toggle('active');
		});

	});

	lay.addEventListener('click', ()=> {

		overlay.classList.toggle('overlay-active');
		bubble.classList.toggle('mbm');

		line.forEach((i) => {
			i.classList.toggle('active');
		});
	});

}

navSlide();
