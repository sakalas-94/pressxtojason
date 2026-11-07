// Add your audio files here.
// Example:
// "sounds/jason-1.mp3",
// "sounds/jason-2.mp3",

const sounds = [
   "sounds/Jason 1.mp3",
   "sounds/Jason 1.1.wav",
   "sounds/Jason 1.2.wav",
   "sounds/Jason 2.mp3",
   "sounds/Jason 2.1.wav",
   "sounds/Jason 2.2.wav",
   "sounds/Jason 3.mp3",
   "sounds/Jason 3.1.wav",
   "sounds/Jason 3.2.mp3",
   "sounds/Jason 3.3.wav",
   "sounds/Jason Slow.mp3"
];

const button = document.getElementById("jason");
const volume = document.getElementById("volume");
const volText = document.getElementById("volText");
const playedEl = document.getElementById("played");
const totalEl = document.getElementById("total");
const status = document.getElementById("status");

let played = Number(localStorage.getItem("jasonPlayed") || 0);
let last = -1;
playedEl.textContent = played;
totalEl.textContent = sounds.length;

function randomIndex(){
  if (!sounds.length) return -1;
  if (sounds.length === 1) return 0;
  let i;
  do { i = Math.floor(Math.random() * sounds.length); } while(i === last);
  last = i;
  return i;
}

function playJason(){
  const i = randomIndex();

  if(i === -1){
    status.textContent = "NO SOUNDS LOADED — ADD YOUR MP3/WAV FILES IN /SOUNDS";
    button.classList.add("flash");
    setTimeout(()=>button.classList.remove("flash"),120);
    return;
  }

  const audio = new Audio(sounds[i]);
  audio.volume = Number(volume.value);
  audio.play().catch(()=>{});

  played++;
  localStorage.setItem("jasonPlayed", played);
  playedEl.textContent = played;
  status.textContent = "PLAYING: " + sounds[i].split("/").pop();

  button.classList.add("flash");
  setTimeout(()=>button.classList.remove("flash"),120);
}

button.addEventListener("click", playJason);
document.addEventListener("keydown", e=>{
  if(e.key.toLowerCase() === "x" && !e.repeat) playJason();
});
volume.addEventListener("input",()=>{
  volText.textContent = Math.round(Number(volume.value)*100) + "%";
});
