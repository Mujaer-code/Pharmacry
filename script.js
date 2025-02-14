// window.onload = function () {
//   const currentVersion = '1.2';
//   const savedVersion = localStorage.getItem('appVersion');

//   if (savedVersion !== currentVersion) {
//     if (localStorage.getItem('quizStatus') === 'eliminated') {
//       localStorage.removeItem('quizStatus');
//       console.log('Status eliminated dihapus karena versi terbaru');
//     } else if (localStorage.getItem('quizStatus') === 'winner') {
//       localStorage.removeItem('quizStatus');
//       console.log('Status winner dihapus karena versi terbaru');
//     }
//     localStorage.setItem('appVersion', currentVersion); // Simpan versi baru
//   }

//   const status = localStorage.getItem('quizStatus');
//   if (status === 'eliminated') {
//     showYourDead();
//   } else if (status === 'winner') {
//     youWin();
//   }

//   if (status !== 'eliminated' && status !== 'winner') {
//     startLoading();
//   }
// };

// DAFTAR AUDIO UNTUK DIMUAT DI AWAL
const audioFiles = [
  'sound/game-dadu.mp3',
  'sound/alarm.mp3',
  'sound/cheat.mp3',
  'sound/correct.mp3',
  'sound/dice.mp3',
  'sound/foot-maze.mp3',
  'sound/gun.mp3',
  'sound/maze-game.mp3',
  'sound/opening.mp3',
  'sound/quiz-game.mp3',
  'sound/winner.mp3',
];

const preloadedAudios = [];
let loadedCount = 0;

// FUNGSI UNTUK PRELOAD AUDIO
function preloadAudioFiles(onProgress, onComplete) {
  const preloadTimeout = setTimeout(() => {
    console.warn('Timeout reached. Continuing without full preloading.');
    onComplete();
  }, 10000); // 10 detik fallback

  audioFiles.forEach((src, index) => {
    const audio = new Audio();
    audio.src = src;
    audio.preload = 'auto';
    audio.muted = true;

    // Tambahkan ke daftar preload
    preloadedAudios[index] = audio;

    // Event saat audio selesai dimuat
    audio.addEventListener('canplaythrough', () => {
      loadedCount++;
      onProgress(loadedCount / audioFiles.length); // Update progress bar

      if (loadedCount === audioFiles.length) {
        clearTimeout(preloadTimeout); // Hapus timeout jika semua preload selesai
        onComplete();
      }
    });

    // Event saat terjadi error
    audio.addEventListener('error', () => {
      console.error(`Gagal memuat audio: ${src}`);
    });
  });

  // Aktifkan audio setelah interaksi pengguna
  document.addEventListener('click', () => {
    preloadedAudios.forEach((audio) => {
      audio.muted = false;
    });
  }, { once: true });
}

// FUNGSI UNTUK MENAMPILKAN LOADING
function startLoading() {
  const loadingBar = document.getElementById('loading-bar');
  const loadingText = document.getElementById('loading-text');
  const loadingScreen = document.getElementById('loading-screen');

  loadingScreen.classList.add('active');

  // Preload audio files
  preloadAudioFiles(
    // Update progress bar
    (progress) => {
      const percentage = Math.floor(progress * 100);
      loadingBar.style.width = `${percentage}%`;
      loadingText.textContent = `Lagi ngeracik... ${percentage}%`;
    },
    // Selesai loading
    () => {
      loadingText.textContent = 'Complete!';
      setTimeout(() => {
        loadingScreen.style.display = 'none'; // Hilangkan loading screen
      }, 500);
    }
  );
}


///////////////////////////////////////////////////////

function hapuskanairmata () {
  localStorage.removeItem('quizStatus');
   window.location.reload();
};


//Feedback Button/////////////////////////
const feedbackButton = document.querySelector('.feedback');
feedbackButton.addEventListener('click', () => {
	window.location.href = 'https://ngl.link/muhfirmnsyah'
});

function feedbackButtonIn (){
		setTimeout (() => {
			feedbackButton.classList.add('active');
		            }, 3000);
	}

//Feedback Button/////////////////////////

let currentAudio = null;
function stopCurrentAudio() {
	if (currentAudio) {
		currentAudio.pause();
		currentAudio.currentTime = 0;
		currentAudio = null;
	}
}
	

const startBtn = document.querySelector ('.start-btn');
const popupInfo = document.querySelector ('.popup-info');
const exitBtn = document.querySelector ('.exit-btn');
const main = document.querySelector ('.main');
const continueBtn = document.querySelector ('.continue-btn');
const quizSection = document.querySelector ('.quiz-section');
const homeSection = document.querySelector ('.home');
const quizBox = document.querySelector ('.quiz-box');
const resultBox = document.querySelector ('.result-box');
const eliminatedBox = document.querySelector ('.eliminated-box');
const kalah = document.querySelector ('.kalah');

const gameContainer = document.querySelector('.game-container');


startBtn.onclick = () => {
	stopCurrentAudio();
	popupInfo.classList.add('active');
	main.classList.add('active');
	currentAudio = new Audio('sound/opening.mp3');
		currentAudio.play();
}

exitBtn.onclick = () => {
	popupInfo.classList.remove ('active');
	main.classList.remove('active');
}

continueBtn.onclick = () => {
	stopCurrentAudio();

	popupInfo.classList.remove ('active');
	main.classList.remove('active');
	homeSection.classList.add('deactive');
	mazeSection.classList.add('active');
	currentAudio = new Audio('sound/maze-game.mp3');
		currentAudio.play();
	   activateSessionJS('question');
}

function showDiceGame () {
	activateSessionCSS('sesiDadu');
    activateSessionJS('sesiDadu');
    deactivateSessionCSS('sesiMaze');
    deactivateSessionJS('sesiMaze');
    
    stopCurrentAudio();
    currentAudio = new Audio('sound/game-dadu.mp3');

		setTimeout (() => {
			currentAudio.play();
		            }, 900);

	gameContainer.classList.add('active');
	mazeSection.classList.remove('active');
}

function nowquizTime() {
	stopCurrentAudio();

	gameContainer.classList.remove('active');	
	quizSection.classList.add ('active');
	quizBox.classList.add ('active');
	camera.start();
	showQuestions(0);

	currentAudio = new Audio('sound/quiz-game.mp3');

	setTimeout (() => {		
			currentAudio.play();
		            }, 1000);
	currentAudio.addEventListener('ended', () => {
  startTimer(); // Timer dijalankan setelah audio selesai
});

}

let questionCount = 0;

const optionList = document.querySelector('.option-list');

//JEBAKAN BATMAN
let TrapEnabled = false;
document.addEventListener("copy", copyTrap);

function copyTrap() {
	if (TrapEnabled) {
		showCheatingBox();
}}
//JEBAKAN BATMAN//

// Fungsi untuk menampilkan soal baru
function showQuestions(index) {
  const questionText = document.querySelector('.question-text');
  questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

  let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
  <div class="option"><span>${questions[index].options[1]}</span></div>
  <div class="option"><span>${questions[index].options[2]}</span></div>
  <div class="option"><span>${questions[index].options[3]}</span></div>`;

  optionList.innerHTML = optionTag;

  const option = document.querySelectorAll('.option');
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute('onclick', 'optionSelected(this)');
  }

  // Fungsi untuk mulai deteksi jumlah tangan setelah nomor 2
  if (index > 1) {
    handsDetectionActive = true;
    console.log("Deteksi tangan Aktif!")
  } else {
    handsDetectionActive = false;
  }

  // Reset cooldown agar gesture bisa dipakai lagi di soal baru
  resetGestureDetection();
  directionText.innerText = "Jawaban dipilih: ";
}

// Fungsi untuk reset gesture setelah soal baru muncul
function resetGestureDetection() {
  lastGesture = "";
  gestureStartTime = null;
  isCooldown = false;
  canDetectGesture = false; // Matikan gesture sementara

  setTimeout(() => {
    canDetectGesture = true; // Aktifkan kembali gesture setelah jeda
  }, 2000); // Jeda sebelum gesture bisa digunakan lagi
}


//Deteksi handgesture/////////////////////
const videoElement = document.getElementsByClassName('input_video')[0];
videoElement.style.transform = "scaleX(-1)";

const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
const directionText = document.getElementById("direction");

let lastAnswer = "";
let isCooldown = false;
let lastDetectionTime = Date.now();
const detectionTimeout = 3000; // 2 detik sebelum dianggap keluar
let handsDetectionActive = false; // Untuk menunggu beberapa detik sebelum aktivasi


function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  // Mirror tampilan
  canvasCtx.translate(canvasElement.width, 0);
  canvasCtx.scale(-1, 1);

  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 2 });
      drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', radius: 1 });

      detectGesture(landmarks); // Panggil detectGesture setiap frame
    }
  }

  // Deteksi jumlah tangan hanya setelah soal ke-3
  if (handsDetectionActive) {
    const handsPresent = results.multiHandLandmarks.length;

    if (handsPresent === 2) {
      lastDetectionTime = Date.now(); // Reset waktu deteksi
    } else {
      const currentTime = Date.now();
      if (currentTime - lastDetectionTime > detectionTimeout) {
        console.log("⚠️ Salah satu tangan hilang! Eliminasi!");
        showEliminatedBox();
      }
    }
  }

  canvasCtx.restore();
}


let lastGesture = "";
let gestureStartTime = Date.now()
let canDetectGesture = false;
const requiredStableTime = 500; // Butuh 2 detik agar gesture stabil


function detectGesture(landmarks) {
  const wrist = landmarks[0];
  const indexFinger = landmarks[8];
  const middleFinger = landmarks[12];
  const ringFinger = landmarks[16];
  const pinkyFinger = landmarks[20];

  let raisedFingers = 0;

  if (indexFinger.y < wrist.y - 0.4) raisedFingers++; 
  if (middleFinger.y < wrist.y - 0.4) raisedFingers++; 
  if (ringFinger.y < wrist.y - 0.4) raisedFingers++; 
  if (pinkyFinger.y < wrist.y - 0.3) raisedFingers++; 

  let selectedOption = "";

  if (raisedFingers === 1) selectedOption = "A";
  else if (raisedFingers === 2) selectedOption = "B";
  else if (raisedFingers === 3) selectedOption = "C";
  else if (raisedFingers === 4) selectedOption = "D";

  // Jika gesture berubah, reset timer
  if (selectedOption !== lastGesture) {
    gestureStartTime = Date.now();
    lastGesture = selectedOption;
  }

  // Jika gesture sama selama requiredStableTime (2 detik), baru diproses
  if (Date.now() - gestureStartTime >= requiredStableTime && !isCooldown && selectedOption !== "") {
    isCooldown = true;

    setTimeout(() => {
      chooseAnswer(selectedOption);
      isCooldown = false;
    }, 500); // Delay 1 detik sebelum bisa deteksi lagi

    directionText.innerText = `Jawaban dipilih: ${selectedOption}`;
  } 
}


// Fungsi untuk memilih jawaban berdasarkan gesture
function chooseAnswer(option) {
  const options = document.querySelectorAll('.option');

  let selectedIndex = -1;
  if (option === "A") selectedIndex = 0;
  else if (option === "B") selectedIndex = 1;
  else if (option === "C") selectedIndex = 2;
  else if (option === "D") selectedIndex = 3;

  if (selectedIndex !== -1 && options[selectedIndex]) {
    optionSelected(options[selectedIndex]);
  }
}

// Inisialisasi Mediapipe Hands
const hands = new Hands({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 0,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

hands.onResults(onResults);

// Inisialisasi kamera
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 320,
  height: 240
});

window.optionSelected = optionSelected;

function optionSelected(answer) {
  console.log("Jawaban yang diklik:", answer.textContent);

  let userAnswer = answer.textContent.trim();
  let correctAnswer = questions[questionCount].answer.trim();

  console.log("User Answer:", userAnswer);
  console.log("Correct Answer:", correctAnswer);

  if (userAnswer === correctAnswer) {
    console.log("Jawaban benar!");

    quizSection.classList.add('correct');
    
    var audio = new Audio('sound/correct.mp3');
    audio.play();

    setTimeout(() => {
      quizSection.classList.remove('correct');
    }, 1000);

    // **✅ Cek jika sudah soal terakhir**
    if (questionCount < questions.length - 1) {
      questionCount++; // Pindah ke soal berikutnya
      showQuestions(questionCount);
    } else {
      showResultBox(); // **Tampilkan hasil jika semua soal terjawab**
    }

  } else {
    console.log("Jawaban salah!");
    showEliminatedBox();
  }
}


//Timer
const timerElement = document.querySelector('.timer');
let timeRemaining = 15 * 60;
let timeInterval;

// Fungsi untuk format menit dan detik
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} : ${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

function startTimer (){
  timeInterval = setInterval (() => {
    timeRemaining--;
    timerElement.textContent = `${formatTime(timeRemaining)}`;

    if (timeRemaining > 0 && timeRemaining <= 15) {
      var audio = new Audio('sound/alarm.mp3');
      audio.play();
      quizSection.classList.toggle("eliminated");
    }

    if (timeRemaining <= 0) {
      clearInterval(timeInterval);
      showEliminatedBox();
    }
  }, 1000);
}


function showResultBox (){
	quizBox.classList.remove('active');
	resultBox.classList.add('active');
	var audio = new Audio('sound/winner.mp3');
	audio.play();
	quizSection.classList.add ('winner');

	document.querySelector('.quiz-header').style.display = 'none';
  document.querySelector('.output_canvas').style.display = 'none';
  document.getElementById('direction').style.display = 'none';
  camera.stop();

	clearInterval(timeInterval);
	timerElement.classList.add('deactive');

	localStorage.setItem('quizStatus', 'winner');
}

const eliminatedKalah = document.querySelector('.eliminated-kalah');

function showEliminatedBox (){
	quizBox.classList.remove('active');
	eliminatedBox.classList.add('active');
	quizSection.classList.add('eliminated');
	eliminatedKalah.classList.add('active');
	stopCurrentAudio();
	var audio = new Audio('sound/gun.mp3');
	audio.play();

  document.querySelector('.quiz-header').style.display = 'none';
	document.querySelector('.output_canvas').style.display = 'none';
  document.getElementById('direction').style.display = 'none';
  camera.stop();


	localStorage.setItem('quizStatus', 'eliminated');

	clearInterval(timeInterval);
	timerElement.classList.add('deactive');

	feedbackButtonIn();
}

const kontener = document.querySelector('.kontener');
const gameoverBox = document.querySelector('.game-over-box');

function gameOver () {
	kontener.classList.add('gameover');
	stopCurrentAudio();
	var audio = new Audio('sound/gun.mp3');
	audio.play();
	gameoverBox.classList.add('active');
	kalah.classList.add('active');
	feedbackButtonIn();

	localStorage.setItem('quizStatus', 'eliminated');
}

const cheatingBox = document.querySelector ('.cheating-box');
const cheat = document.querySelector ('.cheat');

function showCheatingBox () {
	quizBox.classList.remove('active');
	cheatingBox.classList.add('active');
	quizSection.classList.add ('eliminated');
	var audio = new Audio('sound/gun.mp3');
	audio.play();
	cheat.classList.add('active');
	setTimeout (() => {
		var audio = new Audio('sound/cheat.mp3');
	audio.play();
		}, 2000);

	localStorage.setItem('quizStatus', 'eliminated');

	clearInterval(timeInterval);
	timerElement.classList.add('deactive');

	feedbackButtonIn();
}

function showYourDead () {
	homeSection.classList.add('deactive');
	kontener.classList.add('gameover');
	gameoverBox.classList.add('active');
	kalah.classList.add('active');

	feedbackButtonIn();
}

const menangBox = document.querySelector('.winning-box');

function youWin () {
	homeSection.classList.add('deactive');
	kontener.classList.add('winner');
	menangBox.classList.add('active');

	feedbackButtonIn();
}



document.querySelector('.claim-box').addEventListener('click', function () {
    const winnerImage = document.querySelector('.winner-image');

    // Tambahkan kelas spin untuk memulai animasi
    winnerImage.classList.add('spin');

    // Ganti gambar setelah animasi selesai
    setTimeout(() => {
        winnerImage.style.backgroundImage = "url('image/Pharmacry-winner.jpg')";
        winnerImage.classList.remove('spin');
    }, 100); // Waktu yang sama dengan durasi animasi (1s)
});


// // Mencegah akses DevTools (Inspect Element)
// document.addEventListener('keydown', function (e) {
//   // Cegah F12 (DevTools)
//   if (e.key === 'F12') {
//     e.preventDefault();
//   }
//   // Cegah Ctrl+Shift+I (Inspect Element)
//   if (e.ctrlKey && e.shiftKey && e.key === 'I') {
//     e.preventDefault();
//   }
//   // Cegah Ctrl+U (View Source)
//   if (e.ctrlKey && e.key === 'U') {
//     e.preventDefault();
//   }
// });

// // Mencegah klik kanan
// document.addEventListener('contextmenu', function (e) {
//   e.preventDefault();
// });

