const al = [];
function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background("#11151c");

    stroke("#bdbdbd");
    strokeWeight(3);
    for (let i = 0; i < width; i = i + 80) {
        for (let j = 0; j < height; j = j + 80) {
            point(i, j);
        }
    }

    strokeWeight(1);

    al.push(new Rays());

    for (let i = 0; i < al.length; i++) {
        let r = al[i];
        r.applyForce(new p5.Vector(random(-0.5, 0.5), random(0.01, 0.05)));
        r.update();
        r.render();
        if (r.isDead()) al.shift();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function Rays() {
    this.counter = 0;
    this.position = new p5.Vector(mouseX, mouseY);
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
    this.lifeSpan = 1;
}

Rays.prototype.applyForce = function (force) {
    acceleration = force;
};

Rays.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifeSpan -= 0.04;
};

Rays.prototype.render = function () {
    let c = color("rgb(57, 102, 128, " + this.lifeSpan + ")");
    stroke(c);
    line(this.position.x, this.position.y, pmouseX, pmouseY);
};

Rays.prototype.isDead = function () {
    if (this.lifeSpan < 0.1) return true;
    else return false;
};


