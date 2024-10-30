// script.js

const DIFFICULTY_LEVELS = {
    "Facil": { filas: 5, columnas: 5, minas: 5 },
    "Medio": { filas: 8, columnas: 8, minas: 10 },
    "Dificil": { filas: 10, columnas: 10, minas: 20 },
    "MuyDificil": { filas: 12, columnas: 12, minas: 30 },
    "Hardcore": { filas: 15, columnas: 15, minas: 50 },
    "Leyenda": { filas: 20, columnas: 20, minas: 100 },
};

let filas, columnas, minas, tablero, visible, minaPositions, esPrimerMovimiento, juegoTerminado;

function iniciarJuego() {

    const nivel = document.getElementById("difficulty").value;

    ({ filas, columnas, minas } = DIFFICULTY_LEVELS[nivel]);

    tablero = Array.from({ length: filas }, () => Array(columnas).fill(0));
    visible = Array.from({ length: filas }, () => Array(columnas).fill(false));
    minaPositions = new Set();
    esPrimerMovimiento = true;
    juegoTerminado = false;

    generarTablero();
    renderTablero();
    document.getElementById("estado").textContent = "Juego en curso...";
}

function generarTablero() {
    minaPositions.clear();

    while (minaPositions.size < minas) {
        const fila = Math.floor(Math.random() * filas);
        const columna = Math.floor(Math.random() * columnas);
        const pos = `${fila},${columna}`;
        if (!minaPositions.has(pos)) {
            minaPositions.add(pos);
            tablero[fila][columna] = 'M';
            incrementarNumeros(fila, columna);
        }
    }
}

function incrementarNumeros(fila, columna) {
    for (let i = Math.max(0, fila - 1); i <= Math.min(filas - 1, fila + 1); i++) {
        for (let j = Math.max(0, columna - 1); j <= Math.min(columnas - 1, columna + 1); j++) {
            if (tablero[i][j] !== 'M') {
                tablero[i][j]++;
            }
        }
    }
}

function renderTablero() {
    const tableroDiv = document.getElementById("tablero");
    tableroDiv.innerHTML = "";
    tableroDiv.style.gridTemplateColumns = `repeat(${columnas}, 30px)`;

    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            const celda = document.createElement("div");
            celda.className = "celda";
            celda.dataset.fila = i;
            celda.dataset.columna = j;

            // logica para el click derecho
            celda.addEventListener("click", (e) => seleccionarCelda(e, false));
            celda.addEventListener("contextmenu", (e) => seleccionarCelda(e, true));


            // Muestra las minas solo si el juego ha terminado (si el jugador ha perdido)
            if (visible[i][j]) {
                celda.classList.add("desvelada");
                if (tablero[i][j] === 'M' && juegoTerminado) {
                    celda.textContent = "💣";
                } else if (tablero[i][j] !== 'M') {
                    celda.textContent = tablero[i][j] || "";
                }
            }
            tableroDiv.appendChild(celda);
        }
    }
}

function seleccionarCelda(event, isRightClick) {
    event.preventDefault();
    if (juegoTerminado) return;

    const fila = Number(event.target.dataset.fila);
    const columna = Number(event.target.dataset.columna);
    const celda = event.target; // Guarda una referencia a la celda

    if (isRightClick) {
        // Solo marcar o desmarcar la celda con bandera si no está desvelada
        if (!visible[fila][columna]) {
            // Alternar la clase "bandera"
            celda.classList.toggle("bandera");
        }
    } else {
        if (esPrimerMovimiento) {
            esPrimerMovimiento = false;
            if (tablero[fila][columna] === 'M') {
                reubicarMina(fila, columna);
            }
        }
        desvelar(fila, columna);

        if (tablero[fila][columna] === 'M') {
            juegoTerminado = true;
            mostrarTodasLasMinas();
            document.getElementById("estado").textContent = "¡Perdiste! Has seleccionado una mina.";
        } else if (verificarVictoria()) {
            document.getElementById("estado").textContent = "¡Felicidades! Ganaste.";
        }
    }
    renderTablero();
}




function reubicarMina(fila, columna) {
    tablero[fila][columna] = 0; // Eliminar la mina de la casilla original
    minaPositions.delete(`${fila},${columna}`);
    decrementarNumeros(fila, columna);

    // Encuentra una nueva posición para la mina
    let nuevaFila, nuevaColumna;
    do {
        nuevaFila = Math.floor(Math.random() * filas);
        nuevaColumna = Math.floor(Math.random() * columnas);
    } while (tablero[nuevaFila][nuevaColumna] === 'M' || (nuevaFila === fila && nuevaColumna === columna));

    // Coloca la mina en la nueva posición y actualiza el tablero
    tablero[nuevaFila][nuevaColumna] = 'M';
    minaPositions.add(`${nuevaFila},${nuevaColumna}`);
    incrementarNumeros(nuevaFila, nuevaColumna);
}

function decrementarNumeros(fila, columna) {
    for (let i = Math.max(0, fila - 1); i <= Math.min(filas - 1, fila + 1); i++) {
        for (let j = Math.max(0, columna - 1); j <= Math.min(columnas - 1, columna + 1); j++) {
            if (tablero[i][j] !== 'M' && tablero[i][j] > 0) {
                tablero[i][j]--;
            }
        }
    }
}

function desvelar(fila, columna) {
    if (fila < 0 || columna < 0 || fila >= filas || columna >= columnas || visible[fila][columna] || tablero[fila][columna] === 'M') return;
    visible[fila][columna] = true;

    if (tablero[fila][columna] === 0) {
        desvelar(fila - 1, columna);
        desvelar(fila + 1, columna);
        desvelar(fila, columna - 1);
        desvelar(fila, columna + 1);
    }
}

function mostrarTodasLasMinas() {
    minaPositions.forEach(pos => {
        const [fila, columna] = pos.split(',').map(Number);
        visible[fila][columna] = true;
    });
}

function verificarVictoria() {
    return visible.flat().filter((celda, i) => {
        const [fila, columna] = [Math.floor(i / columnas), i % columnas];
        return !visible[fila][columna] && tablero[fila][columna] !== 'M';
    }).length === 0;
}

// animacion
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
const particles = [];
const numParticles = 100;

// Ajustar el tamaño del lienzo
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1; // Tamaño aleatorio
        this.speedX = Math.random() * 3 - 1.5; // Velocidad en X
        this.speedY = Math.random() * 3 - 1.5; // Velocidad en Y
        this.color = 'rgba(' + (Math.random() * 255) + ',' + (Math.random() * 255) + ',' + (Math.random() * 255) + ', 0.5)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Rebote en los bordes
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

init();
animate();