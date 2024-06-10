let walker, hueValue = 0;
let points = [];

class Walker {
	constructor() {
		this.x = width / 2;
		this.y = height / 2;
	}

	show() {
		// Add the current point with full opacity and current hueValue to the points array
		points.push({ x: this.x, y: this.y, opacity: 255, hue: hueValue });
	}

	step() {
		let choice = floor(random(4));

		switch (choice) {
			case 0:
				this.x += 12;
				break;
			case 1:
				this.x -= 12;
				break;
			case 2:
				this.y += 12;
				break;
			case 3:
				this.y -= 12;
				break;
			default:
				break;
		}
	}
}

function setup() {
	createCanvas(600, 750);
	background(240);

	colorMode(HSB, 360, 100, 100);

	walker = new Walker();
}

function draw() {
	// Restrict hueValue to the rainbow range (0 to 360 degrees)
	hueValue = (hueValue + 1) % 361;

	if (walker.x < 0 || walker.x > width || walker.y < 0 || walker.y > height) {
		walker.x = width / 2;
		walker.y = height / 2;
	}

	// Reduce opacity of all points and remove points that become completely transparent
	for (let i = points.length - 1; i >= 0; i--) {
		points[i].opacity -= 3;
		if (points[i].opacity <= 0) {
			points.splice(i, 1);
		}
	}

	// Redraw background
	colorMode(RGB, 255);
	background(240);
	colorMode(HSB, 360, 100, 100);

	// Draw all points with their current opacity and hue
	for (let pt of points) {
		stroke(pt.hue, 100, 60, pt.opacity);
		strokeWeight(4);
		point(pt.x, pt.y);
	}

	walker.step();
	walker.show();
}
