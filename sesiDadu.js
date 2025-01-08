
//AWAL GAME DADU -----------------------------------------------------------//

const cells = document.querySelectorAll(".sell");
const startingLogo = "1"; // Logo pada sisi bawah kubus (starting point)
const matrix = document.querySelector('.matrix');
const arrowButtons = document.querySelectorAll(".arrow");

let activeCellIndex = 5; // Pilih index awal dari matriks (1, 1)
let remainingSteps = 3; // Batas jumlah langkah

// Elemen untuk menampilkan sisa langkah
const stepCounter = document.querySelector('.step-counter');
stepCounter.textContent = `Remaining Steps : ${remainingSteps}`;

let visitedPositions = [activeCellIndex]; // Menyimpan posisi yang sudah dilewati
let yourgameisOver = false;

// Set starting point di matriks
function initializeMatrix() {
    cells.forEach((cell, index) => {
        if (index === activeCellIndex) {
            cell.classList.add("active");
        }
    });
}

//Fungsi untuk menambahkan efek visual ke keyboard
function addPressedEffect (button) {
    button.classList.add("pressed");
    setTimeout(() => {
        button.classList.remove("pressed");
    }, 200);
}

//Event listener untuk tombol panah di layar


// Fungsi untuk menangani gerakan (berlaku untuk keyboard dan tombol)
function handleMove(direction) {
    if (yourgameisOver) return;

    let newIndex = activeCellIndex;

     // Cek jika arah yang diberikan valid
    const validDirections = ["ArrowUp", "up", "ArrowDown", "down", "ArrowLeft", "left", "ArrowRight", "right"];
    if (!validDirections.includes(direction)) {
        return; // Abaikan input yang tidak valid
    }

    // Mainkan audio jika arah valid
    var audio = new Audio('sound/dice.mp3');
    audio.play();

    switch (direction) {
        case "ArrowUp":
        case "up":
            if (activeCellIndex - 4 >= 0) newIndex = activeCellIndex - 4;
            break;
        case "ArrowDown":
        case "down":
            if (activeCellIndex + 4 < 16) newIndex = activeCellIndex + 4;
            break;
        case "ArrowLeft":
        case "left":
            if (activeCellIndex % 4 !== 0) newIndex = activeCellIndex - 1;
            break;
        case "ArrowRight":
        case "right":
            if (activeCellIndex % 4 !== 3) newIndex = activeCellIndex + 1;
            break;
        default:
            return; // Abaikan jika arah tidak valid
    }

    // Cek jika posisi baru sudah pernah dilewati
    if (visitedPositions.includes(newIndex)) {
        alert("You can't go back to a previously visited position!");
        return;
    }

    // Perbarui posisi aktif
    activeCellIndex = newIndex;
    visitedPositions.push(activeCellIndex);
    remainingSteps -= 1;

    // Perbarui tampilan langkah
    stepCounter.textContent = `Remaining Steps: ${remainingSteps}`;

    // Perbarui tampilan matriks
    cells.forEach((cell, index) => {
        cell.classList.remove("active", "visited");
        if (index === activeCellIndex) {
            cell.classList.add("active");
        } else if (visitedPositions.includes(index)) {
            cell.classList.add("visited");
        }
    });

    // Cek kemenangan
    const requiredPositions = [9, 13];
    const allRequiredVisited = requiredPositions.every(pos => visitedPositions.includes(pos));
    if (activeCellIndex === 14 && allRequiredVisited) {
        var audio = new Audio('sound/correct.mp3');
                audio.play();

        yourgameisOver = true;
        setTimeout (() => {
            nowquizTime();
            }, 300);
        ;

    } else if (remainingSteps === 0) {
        yourgameisOver = true;
        gameContainer.classList.remove('active');
        gameOver();
    }
}

document.addEventListener("keydown", (event) => {
    const directionMap = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
    };

    const direction = directionMap[event.key];
    if (direction) {
        const button = document.querySelector(`.arrow.${direction}`);
        if (button) addPressedEffect(button);
    }

    handleMove(direction);
});

// Tambahkan event listener untuk tombol
arrowButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const direction = button.dataset.direction;
        handleMove(direction);
    });
});

initializeMatrix();

//AKHIR GAME DADU ---------------------------------------////



