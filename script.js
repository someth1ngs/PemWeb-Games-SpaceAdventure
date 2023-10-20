const canvas = document.querySelector("canvas");
const scoreEl = document.querySelector("#scoreEl");
const c = canvas.getContext("2d");

canvas.width = innerWidth; //innerWidth atau 1024
canvas.height = innerHeight; //innerHeight atau 576

//karakteristik player
class Player {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0,
    };

    this.rotation = 0;
    this.opacity = 1;

    const image = new Image();
    image.src = "./img/spaceship.png";
    image.onload = () => {
      const scale = 0.25;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;

      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 20,
      };
    };
  }

  //rotate ke kanan kiri ketika gerak
  draw() {
    c.save();
    c.globalAlpha = this.opacity;
    c.translate(
      player.position.x + player.width / 2,
      player.position.y + player.height / 2
    );
    c.rotate(this.rotation);
    c.translate(
      -player.position.x - player.width / 2,
      -player.position.y - player.height / 2
    );
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    c.restore();
  }

  //update untuk player
  update() {
    if (this.image) {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  }
}

class Player2 {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0,
    };

    this.rotation = 0;
    this.opacity = 1;

    const image = new Image();
    image.src = "./img/spaceship2.png";
    image.onload = () => {
      const scale = 0.25;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;

      this.position = {
        x: canvas.width / 2 - this.width / 2 + 50,
        y: canvas.height - this.height - 20,
      };
    };
  }

  //rotate ke kanan kiri ketika gerak
  draw() {
    c.save();
    c.globalAlpha = this.opacity;
    c.translate(
      player2.position.x + player2.width / 2,
      player2.position.y + player2.height / 2
    );
    c.rotate(this.rotation);
    c.translate(
      -player2.position.x - player2.width / 2,
      -player2.position.y - player2.height / 2
    );
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    c.restore();
  }

  //update untuk player
  update() {
    if (this.image) {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  }
}

class Projectile {
  constructor({ position, velocity, color }) {
    this.position = position;
    this.velocity = velocity;
    this.color = color || "red" || "blue"

    this.radius = 4;
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

//karakteristik particle
class Particle {
  constructor({ position, velocity, radius, color, fades }) {
    this.position = position;
    this.velocity = velocity;

    this.radius = radius;
    this.color = color;
    this.opacity = 1;
    this.fades = fades;
  }

  draw() {
    c.save();
    c.globalAlpha = this.opacity;
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.fades) this.opacity -= 0.01;
  }
}

class InvaderProjectile {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 3;
    this.height = 10;
  }

  draw() {
    c.fillStyle = "white";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

class Invader {
  constructor({ position }) {
    this.velocity = {
      x: 0,
      y: 0,
    };

    const image = new Image();
    image.src = "./img/invader.png";
    image.onload = () => {
      const scale = 0.20;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;

      this.position = {
        x: position.x,
        y: position.y,
      };
    };
  }

  draw() {
    // c.fillStyle = 'red'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update({ velocity }) {
    if (this.image) {
      this.draw();
      this.position.x += velocity.x;
      this.position.y += velocity.y;
    }
  }

  shoot(invaderProjectiles) {
    invaderProjectiles.push(
      new InvaderProjectile({
        position: {
          x: this.position.x + this.width / 2,
          y: this.position.y + this.height,
        },
        velocity: {
          x: 0,
          y: 5,
        },
      })
    );
  }
}

class Grid {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };

    this.velocity = {
      x: 3,
      y: 0,
    };

    this.invaders = [];

    const columns = Math.floor(Math.random() * 10 + 5);
    const rows = Math.floor(Math.random() * 5 + 2);

    this.width = columns * 60;
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        this.invaders.push(
          new Invader({
            position: {
              x: x * 60,
              y: y * 40,
            },
          })
        );
      }
    }
    console.log(this.invaders);
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.velocity.y = 0;

    if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
      this.velocity.x = -this.velocity.x;
      this.velocity.y = 40;
    }
  }
}

let player = new Player();
let player2 = new Player2();
let projectiles = [];
let grids = [];
let invaderProjectiles = [];
let particles = [];

let keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  space: {
    pressed: false,
  },
  arrowLeft: {
    pressed: false,
  },
  arrowRight: {
    pressed: false,
  },
  arrowUp: {
    pressed: false,
  },
  arrowDown: {
    pressed: false,
  },
};

let frames = 0;
let randomInterval = Math.floor(Math.random() * 500 + 500);
let game = {
  over: false,
  active: true,
};
let score = 0;
for (let i = 0; i < 100; i++) {
  particles.push(
    new Particle({
      position: {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
      },
      velocity: {
        x: 0,
        y: 1,
      },
      radius: Math.random() * 2,
      color: "white",
    })
  );
}

function createParticles({ object, color, fades }) {
  for (let i = 0; i < 15; i++) {
    particles.push(
      new Particle({
        position: {
          x: object.position.x + object.width / 2,
          y: object.position.y + object.height / 2,
        },
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        },
        radius: Math.random() * 3,
        color: color || "green",
        fades: true,
      })
    );
  }
}


function animate() {
  if (!game.active) return;
  requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  player2.update();
  particles.forEach((particle, i) => {
    if (particle.position.y - particle.radius >= canvas.height) {
      particle.position.x = Math.random() * canvas.width;
      particle.position.y = -particle.radius;
    }

    if (particle.opacity <= 0) {
      setTimeout(() => {
        particles.splice(i, 1);
      }, 0);
    } else {
      particle.update();
    }
  });
  invaderProjectiles.forEach((invaderProjectile, index) => {
    if (
      invaderProjectile.position.y + invaderProjectile.height >=
      canvas.height
    ) {
      setTimeout(() => {
        invaderProjectiles.splice(index, 1);
      }, 0);
    } else invaderProjectile.update();

    if (
      invaderProjectile.position.y + invaderProjectile.height >=
        player.position.y &&
      invaderProjectile.position.y + invaderProjectile.height <=
        player.position.y + player.height &&
      invaderProjectile.position.x + invaderProjectile.width >=
        player.position.x &&
      invaderProjectile.position.x <= player.position.x + player.width
    ) {
      
      setTimeout(() => {
        invaderProjectiles.splice(index, 1);
        player.opacity = 0;
        game.over = true;
      }, 0);

      setTimeout(() => {
        game.active = false;
        audio.backgroundMusic.stop()
        const isConfirmed = confirm("GAME OVER, Score :" + scoreEl.innerHTML);
        if (isConfirmed) {
          window.location.reload();
        }
      }, 2000);
      createParticles({
        object: player,
        color: "red",
      });
    }

    if (
      invaderProjectile.position.y + invaderProjectile.height >=
        player2.position.y &&
      invaderProjectile.position.y + invaderProjectile.height <=
        player2.position.y + player2.height &&
      invaderProjectile.position.x + invaderProjectile.width >=
        player2.position.x &&
      invaderProjectile.position.x <= player2.position.x + player2.width
    ) {
      setTimeout(() => {
        invaderProjectiles.splice(index, 1);
        player2.opacity = 0;
        game.over = true;
      }, 0);

      setTimeout(() => {
        game.active = false;
        audio.backgroundMusic.stop()
        const isConfirmed = confirm("GAME OVER, Score :" + scoreEl.innerHTML);
        if (isConfirmed) {
          window.location.reload();
        }
      }, 2000);
      createParticles({
        object: player2,
        color: "blue",
      });
    }
  });

  projectiles.forEach((projectile, index) => {
    if (projectile.position.y + projectile.radius <= 0) {
      setTimeout(() => {
        projectiles.splice(index, 1);
      }, 0);
    } else {
      projectile.update();
    }
    projectile.update();
  });

  //grid enemy menembak
  grids.forEach((grid, gridIndex) => {
    grid.update();
    if (frames % 100 === 0 && grid.invaders.length > 0) {
      grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(
        invaderProjectiles
      );
    }
    grid.invaders.forEach((invader, i) => {
      invader.update({ velocity: grid.velocity });
      projectiles.forEach((projectile, j) => {
        if (
          projectile.position.y - projectile.radius <=
            invader.position.y + invader.height &&
          projectile.position.x + projectile.radius >= invader.position.x &&
          projectile.position.x - projectile.radius <=
            invader.position.x + invader.width &&
          projectile.position.y + projectile.radius >= invader.position.y
        ) {
          setTimeout(() => {
            const invaderFound = grid.invaders.find(
              (invader2) => invader2 === invader
            );
            const projectileFound = projectiles.find(
              (projectile2) => projectile2 === projectile
            );
            if (invaderFound && projectileFound) {
              score += 100;
              scoreEl.innerHTML = score;
              createParticles({
                object: invader,
                fades: true,
              });
              grid.invaders.splice(i, 1);
              projectiles.splice(j, 1);
              if (grid.invaders.length > 0) {
                const firstInvader = grid.invaders[0];
                const lastInvader = grid.invaders[grid.invaders.length - 1];
                grid.width =
                  lastInvader.position.x -
                  firstInvader.position.x +
                  lastInvader.width;
                grid.position.x = firstInvader.position.x;
              } else {
                grid.splice(gridIndex, 1);
              }
            }
          }, 0);
        }
      });
    });
  });

  //kecepatan gerak dan arah gerak
  if (keys.a.pressed && player.position.x >= 0) {
    player.velocity.x = -5;
    player.rotation = -0.3;
  } else if (
    keys.d.pressed &&
    player.position.x + player.width <= canvas.width
  ) {
    player.velocity.x = 5;
    player.rotation = 0.3;
  } else if (keys.w.pressed && player.position.y >= 0) {
    player.velocity.y = -5;
  } else if (
    keys.s.pressed &&
    player.position.y + player.height <= canvas.height
  ) {
    player.velocity.y = 5;
  } else {
    player.velocity.x = 0;
    player.velocity.y = 0;
    player.rotation = 0;
  }

  if (keys.arrowLeft.pressed && player2.position.x >= 0) {
    player2.velocity.x = -5;
    player2.rotation = -0.3;
  } else if (
    keys.arrowRight.pressed &&
    player2.position.x + player2.width <= canvas.width
  ) {
    player2.velocity.x = 5;
    player2.rotation = 0.3;
  } else if (keys.arrowUp.pressed && player2.position.y >= 0) {
    player2.velocity.y = -5;
  } else if (
    keys.arrowDown.pressed &&
    player2.position.y + player2.height <= canvas.height
  ) {
    player2.velocity.y = 5;
  } else {
    player2.velocity.x = 0;
    player2.velocity.y = 0;
    player2.rotation = 0;
  }

  if (frames % randomInterval === 0) {
    grids.push(new Grid());
    randomInterval = Math.floor(Math.random() * 500 + 500);
    frames = 0;
  }

  frames++;

}
//mengarahkan ke game ketika klik start
document.querySelector('#startButton').addEventListener('click', () => {
  audio.backgroundMusic.play()
  document.querySelector('#startScreen').style.display = 'none'
  init()
  animate()
})
//Abaikan masih error nanti malem tak garap
document.querySelector('#restartButton').addEventListener('click', () => {
  audio.select.play()
  document.querySelector('#restartScreen').style.display = 'none'
  init()
  animate()
})

animate();

//ketika tombol ditekan, maka akan terjadi, dan ini mekanisme bergeraknya
addEventListener("keydown", ({ key }) => {
  if (game.over) return;
  switch (key) {
    case "a":
      keys.a.pressed = true;
      break;
    case "d":
      keys.d.pressed = true;
      break;
    case "w":
      keys.w.pressed = true;
      break;
    case "s":
      keys.s.pressed = true;
      break;
    case " ":
      audio.shoot.play()
      projectiles.push(
        new Projectile({
          position: {
            x: player.position.x + player.width / 2,
            y: player.position.y,
          },

          velocity: {
            x: 0,
            y: -10,
          },
        })
      );
      break;

    case "ArrowLeft":
      keys.arrowLeft.pressed = true;
      break;
    case "ArrowRight":
      keys.arrowRight.pressed = true;
      break;
    case "ArrowUp":
      keys.arrowUp.pressed = true;
      break;
    case "ArrowDown":
      keys.arrowDown.pressed = true;
      break;
      case "Enter":
        audio.shoot.play()
        projectiles.push(
          new Projectile({
            position: {
              x: player2.position.x + player2.width / 2,
              y: player2.position.y,
            },
  
            velocity: {
              x: 0,
              y: -10,
            },

            color: "blue"
          })
        );
  }
});

addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case " ":
      break;

    case "ArrowLeft":
      keys.arrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.arrowRight.pressed = false;
      break;
    case "ArrowUp":
      keys.arrowUp.pressed = false;
      break;
    case "ArrowDown":
      keys.arrowDown.pressed = false;
      break;
    case "enter":
      break;
  }
});
