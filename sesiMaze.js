const mazeData = {
  1: {
    labels: {
      rowLabels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],  // Huruf
      colLabels: ['1', '2', '3', '4', '5', '6', '7', '8']   // Angka
    },
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [3, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 1, 0],
      [1, 0, 0, 0, 0, 1, 1, 0],
      [1, 1, 1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 2],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 0],
    ]
  },
  2: {
    labels: {
      rowLabels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      colLabels: ['1', '2', '3', '4', '5', '6', '7', '8']
    },
    grid: [
      [1, 1, 0, 0, 0, 0, 0, 0],
      [3, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 1, 1, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 2],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]
  },
  3: {
    labels: {
      rowLabels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      colLabels: ['1', '2', '3', '4', '5', '6', '7', '8']
    },
    grid: [
      [0, 0, 0, 0, 0, 1, 1, 1],
      [3, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 2],
      [1, 0, 1, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
    ]
  }
};

const finalMaze = {
  4: {
    labels: {
      rowLabels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      colLabels: ['1', '2', '3', '4', '5', '6', '7', '8']
    },
    grid: [
      [1, 1, 0, 0, 0, 1, 1, 1], 
      [3, 0, 0, 1, 0, 1, 1, 1], 
      [1, 1, 1, 1, 0, 1, 1, 1], 
      [1, 1, 1, 1, 0, 1, 1, 1], 
      [1, 1, 1, 0, 0, 1, 1, 1], 
      [1, 0, 0, 0, 1, 1, 0, 2], 
      [1, 0, 1, 1, 0, 0, 0, 1], 
      [1, 0, 0, 0, 0, 1, 1, 1],
    ]
  }
}

let playerPos = { x: 0, y: 1 };


const player = document.getElementById('player');
const mazeSize = 8; // 8x8 grid

const tileSize = getComputedStyle(document.documentElement).getPropertyValue('--tile-size');
console.log('Tile Size:', tileSize);

const cellHeight = getComputedStyle(document.documentElement).getPropertyValue('--box-maze');
console.log('Box Maze:', cellHeight);

const cellWidth = getComputedStyle(document.documentElement).getPropertyValue('--box-maze');
console.log('Box Maze:', cellWidth);

const mazes = document.querySelectorAll('.maze-container');
console.log('Maze Containers:', mazes);

function displayMazePreviews() {
  const mazes = document.querySelectorAll('.maze-container');

  mazes.forEach((container, index) => {
    const maze = mazeData[index + 1];
    const map = maze.grid;

    container.innerHTML = ''; // Bersihkan isi container
    container.style.position = 'relative'; // Pastikan container memiliki posisi relatif

    // Menambahkan label angka (1-8) di atas grid
    maze.labels.colLabels.forEach((label, colIndex) => {
      const columnLabel = document.createElement('p');
      columnLabel.textContent = label;
      columnLabel.style.position = 'absolute';
      columnLabel.style.top = `-${cellWidth}px`;
      columnLabel.style.left = `${colIndex * cellWidth}px`;
      columnLabel.style.width = `${cellWidth}px`;
      columnLabel.style.textAlign = 'center';
      columnLabel.style.alignContent = 'center';
      container.appendChild(columnLabel);
    });

    // Menambahkan label huruf (A-H) di sisi kiri grid
    maze.labels.rowLabels.forEach((label, rowIndex) => {
      const rowLabel = document.createElement('p');
      rowLabel.textContent = label;
      rowLabel.style.position = 'absolute';
      rowLabel.style.top = `${rowIndex * cellHeight}px`;
      rowLabel.style.left = `-${cellWidth}px`;
      rowLabel.style.height = `${cellHeight}px`;
      rowLabel.style.textAlign = 'center';
      rowLabel.style.alignContent = 'center';
      container.appendChild(rowLabel);
    });

    // Menampilkan grid maze
    map.forEach((row, y) => {
      row.forEach((cell, x) => {
        const tile = document.createElement('div');
        tile.style.position = 'absolute';
        tile.style.top = `${y * cellHeight}px`;
        tile.style.left = `${x * cellWidth}px`;
        tile.style.border = '1px solid #484848';
  

        // Tambahkan kelas untuk gaya (ukuran sudah diatur di CSS)
        tile.className = 'tile';
        container.appendChild(tile);

        // Tentukan warna berdasarkan nilai sel
        if (cell === 1) {
          tile.style.background = '#DC2727';
        } else if (cell === 2) {
          tile.style.background = 'yellow';
        } else if (cell === 0) {
          tile.style.background = 'transparent';
        } else if (cell === 3) {
          tile.style.background = 'white';
        }
      });
    });
  });
}

// Run preview on load
displayMazePreviews();


// Fungsi untuk memperbarui posisi CSS pemain
function updatePlayerPosition() {
  player.style.top = `${playerPos.y * tileSize}px`;
  player.style.left = `${playerPos.x * tileSize}px`;
}

const winningMarker = document.getElementById('winning-marker');
const winningPos = { x: 7, y: 5 };
updateWinningMarkerPosition(winningPos.x, winningPos.y);

// Fungsi untuk memperbarui posisi target kemenangan
function updateWinningMarkerPosition(x, y) {
  winningMarker.style.top = `${y * tileSize}px`;
  winningMarker.style.left = `${x * tileSize}px`;
}



updatePlayerPosition();

// Event listener untuk tombol Play
document.getElementById('play-button').addEventListener('click', () => startGame(1)); // Start map 1 by default

function startGame(mapNumber) {
  currentMap = finalMaze[4];
  document.getElementById('menu').classList.add('deactive');
  document.getElementById('maze-start').classList.add('active');
  drawMaze();
  updatePlayerPosition();
}

function drawMaze() {
  const cells = document.querySelectorAll('.cell');
  const mazeGame = document.getElementById('maze');  // Elemen untuk container maze

  const containerHeight = mazeGame.offsetHeight;
  const containerWidth = mazeGame.offsetWidth;
  const cellHeight = containerHeight / 8; // Dinamis berdasarkan jumlah baris
  const cellWidth = containerWidth / 8; // Dinamis berdasarkan jumlah kolom

  mazeGame.style.position = 'relative'; // Make sure the container is relative

  // Menambahkan label angka (1-8) di atas grid
  currentMap.labels.colLabels.forEach((label, colIndex) => {
    const columnLabel = document.createElement('p');
    columnLabel.textContent = label;
    columnLabel.style.position = 'absolute';
    columnLabel.style.top = `-${cellWidth}px`;
    columnLabel.style.left = `${colIndex * cellWidth}px`;
    columnLabel.style.width = `${cellWidth}px`;
    columnLabel.style.textAlign = 'center';
    mazeGame.appendChild(columnLabel);
  });

  // Menambahkan label huruf (A-H) di sisi kiri grid
  currentMap.labels.rowLabels.forEach((label, rowIndex) => {
    const rowLabel = document.createElement('p');
    rowLabel.textContent = label;
    rowLabel.style.position = 'absolute';
    rowLabel.style.top = `${rowIndex * cellHeight}px`;
    rowLabel.style.left = `-${cellHeight}px`; // Agar muncul di kiri
    rowLabel.style.height = `${cellHeight}px`;
    rowLabel.style.alignContent = 'center';
    mazeGame.appendChild(rowLabel);
  });
  }

document.querySelectorAll('.panah').forEach(button => {
  button.addEventListener('click', () => {
    const direction = button.getAttribute('data-direction'); // Ambil arah dari data-direction
    moveMaze(direction);

  });
});

let isGameOver = false;

//Fungsi untuk menambahkan efek visual ke keyboard
function EfekTekan (button) {
    button.classList.add("pressed");
    setTimeout(() => {
        button.classList.remove("pressed");
    }, 200);
}

const mazeSection = document.querySelector('.maze-section');

function moveMaze (direction) {
   let { x, y } = playerPos;
      
       // Cek jika arah yang diberikan valid
    const validDirections = ["ArrowUp", "atas", "ArrowDown", "bawah", "ArrowLeft", "kiri", "ArrowRight", "kanan"];
    if (!validDirections.includes(direction)) {
        return; // Abaikan input yang tidak valid
    }

    // Mainkan audio jika arah valid
    var audio = new Audio('sound/foot-maze.mp3');
    audio.play();

   switch (direction) {
        case "ArrowUp":
        case "atas":
            if ( y > 0) y--;
            break;
        case "ArrowDown":
        case "bawah":
              if ( y < mazeSize - 1) y++;
            break;
        case "ArrowLeft":
        case "kiri":
              if ( x > 0) x--;
            break;
        case "ArrowRight":
        case "kanan":
              if ( x < mazeSize - 1) x++;
            break;
        default:
            return; // Abaikan jika arah tidak valid
    }

  if (currentMap.grid[y][x] === 1) {
    document.getElementById('maze-start').classList.add('hidden');
    mazeSection.classList.remove('active');
    gameOver ();
    isGameOver = true;
    return;

  } else {
    playerPos = { x, y };
    updatePlayerPosition(); // Update the player's position on the grid
  }

  if (x === winningPos.x && y === winningPos.y) {
    if (isGameOver) return;
    isGameOver = true;

    
    var audio = new Audio('sound/correct.mp3');
    audio.play();
    setTimeout (() => {
    document.getElementById('maze-start').classList.add('hidden');
    showDiceGame();
            }, 100);
     // Display the winning screen
  }
}

document.addEventListener("keydown", (event) => {
    const directionMap = {
        ArrowUp: "atas",
        ArrowDown: "bawah",
        ArrowLeft: "kiri",
        ArrowRight: "kanan",
    };

    const direction = directionMap[event.key];
    if (direction) {
        const button = document.querySelector(`.panah.${direction}`);
        if (button) EfekTekan(button);

    }

    if (isGameOver) return;
    moveMaze(direction);
  
});

