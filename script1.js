console.log("Welcome to Spotify");

// ================= INITIALIZE =================
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName:"Addicted to you", filePath:"songs/Song1.mp3", coverPath:"covers/cover1.jpeg"},
    {songName:"Meri Banogi kya", filePath:"songs/Song2.mp3", coverPath:"covers/cover2.jpg"},
    {songName:"Genie In a Bottle", filePath:"songs/Song3.mp3", coverPath:"covers/cover3.jpg"},
    {songName:"Let Me Love You", filePath:"songs/Song4.mp3", coverPath:"covers/cover4.jpeg"},
    {songName:"Sanun Nahar Wale Pul", filePath:"songs/Song5.mp3", coverPath:"covers/cover5.jpg"},
    {songName:"Can't Help Falling in Love", filePath:"songs/Song6.mp3", coverPath:"covers/cover6.jpg"},
    {songName:"Woman", filePath:"songs/Song7.mp3", coverPath:"covers/cover7.jpg"}
];

// ============== LOAD SONG LIST =================
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});

// ============== MASTER PLAY ====================
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// ============== PROGRESS BAR ===================
audioElement.addEventListener('timeupdate', ()=>{
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress || 0;
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// ============== HELPER FUNCTION ================
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// ============== SONG ITEM CLICK =================
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);

        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');

        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;

        audioElement.currentTime = 0;
        audioElement.play();

        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

// ============== NEXT SONG =======================
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= songs.length - 1){
        songIndex = 0;
    } else {
        songIndex++;
    }

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;

    audioElement.currentTime = 0;
    audioElement.play();

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// ============== PREVIOUS SONG ===================
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = songs.length - 1;
    } else {
        songIndex--;
    }

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;

    audioElement.currentTime = 0;
    audioElement.play();

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
