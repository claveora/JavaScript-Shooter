let game ='JAVASRIPT INI'
alert('HAI, SELAMAT DATANG ')
alert('DIGAME '+game)
alert('SILAHKAN TEKAN OK UNTUK MEMULAI GAME')

const canvas = document.getElementById("Viska_Canvas");
const ctx = canvas.getContext("2d");

const user = {
    width: 100,
    height: 80,
    x: canvas.width / 2,
    y: canvas.height - 20 - 40,
    color: "blue",
    speed: 7
};

const musuh = {
    x: canvas.width / 2,
    y: 100,
    radius: 50,
    sides: 5,
    color: "purple",
    isAlive: true
};

const peluru = [];
const keysPressed = {};
const bulletSpeed = 7;
const bulletRadius = 5;

function gambarUser() {
    const y_base = user.y + user.height / 2;
    const y_top = user.y - user.height / 2;
    ctx.beginPath();
    ctx.moveTo(user.x - user.width / 2, y_base);
    ctx.lineTo(user.x + user.width / 2, y_base);
    ctx.lineTo(user.x, y_top);
    ctx.closePath();
    ctx.fillStyle = user.color;
    ctx.fill();
}

function gambarMusuh() {
    if (!musuh.isAlive) return;
    ctx.beginPath();
    for (let i = 0; i <= musuh.sides; i++) {
        const angle = (2 * Math.PI / musuh.sides) * i - Math.PI / 2;
        const x = musuh.x + musuh.radius * Math.cos(angle);
        const y = musuh.y + musuh.radius * Math.sin(angle);
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.fillStyle = musuh.color;
    ctx.fill();
}

function gambarPeluru() {
    peluru.forEach(bullet => {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
    });
}

function update() {
    if (keysPressed['ArrowLeft'] || keysPressed['KeyA']) {
        user.x -= user.speed;
    }
    if (keysPressed['ArrowRight'] || keysPressed['KeyD']) {
        user.x += user.speed;
    }
    if(keysPressed['ArrowUp'] || keysPressed['KeyW']) {
        user.y -= user.speed;
    }
    if(keysPressed['ArrowDown'] || keysPressed['KeyS']) {
        user.y += user.speed;
    }

    if (user.y - user.height / 2 < 0) {
        user.y = user.height / 2;
    }
    if (user.y + user.height / 2 > canvas.height) {
        user.y = canvas.height - user.height / 2;
    }

    if (user.x - user.width / 2 < 0) {
        user.x = user.width / 2;
    }
    if (user.x + user.width / 2 > canvas.width) {
        user.x = canvas.width - user.width / 2;
    }

    for (let i = peluru.length - 1; i >= 0; i--) {
        const bullet = peluru[i];
        bullet.y -= bullet.speed;

        if (musuh.isAlive) {
            const dx = bullet.x - musuh.x;
            const dy = bullet.y - musuh.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < musuh.radius + bullet.radius) {
                musuh.isAlive = false;
                peluru.splice(i, 1);

                setTimeout(() => {
                    musuh.isAlive = true;
                    musuh.x = Math.random() * (canvas.width - 100) + 50;
                }, 2000);

                continue;
            }
        }

        if (bullet.y < 0) {
            peluru.splice(i, 1);
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    gambarUser();
    gambarMusuh();
    gambarPeluru();
    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (event) => {
    keysPressed[event.code] = true;

    if (event.code === 'Space') {
        peluru.push({
            x: user.x,
            y: user.y - user.height / 2,
            radius: bulletRadius,
            speed: bulletSpeed
        });
    }
    if (event.code === 'ShiftLeft') {
        peluru.push({
            x: user.x,
            y: user.y - user.height / 2,
            radius: bulletRadius,
            speed: bulletSpeed
        });
    }
});

window.addEventListener('keyup', (event) => {
    keysPressed[event.code] = false;
});


gameLoop();