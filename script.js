// console.log("hello");
let audioElement = new Audio("song/1.mp3");
let songIndex = 0;
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let volumeBar = document.getElementById("volumeBar");
let volumeicon = document.getElementById("volumeicon");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Hindi Song",
    filePath: "song/1.mp3",
    coverPath: "cover/maxresdefault.jpeg",
  },
  {
    songName: "BROWN MUNDE",
    filePath: "song/2.mp3",
    coverPath: "cover/maxresdefault.jpeg",
  },
  {
    songName: "Excuses",
    filePath: "song/3.mp3",
    coverPath: "cover/maxresdefault.jpeg",
  },
  {
    songName: "GOAT - AP DHILLON _ GURINDER GILL _ MONEY MUSIK",
    filePath: "song/4.mp3",
    coverPath: "cover/maxresdefault.jpeg",
  },
  {
    songName: "Gifty _ JayB Singh _ ICan Films _ Legacy Records",
    filePath: "song/5.mp3",
    coverPath: "cover/maxresdefault.jpeg",
  },
  {
    songName: "Kaka New Song",
    filePath: "song/6.mp3",
    coverPath: "cover/maxresdefault.jpeg",
  },
  {
    songName: "Ma Belle - AP Dhillon",
    filePath: "song/7.mp3",
    coverPath: "cover/maxresdefault.jpeg",
  },
  {
    songName: "Temporary Pyar",
    filePath: "song/8.mp3",
    coverPath: "cover/maxresdefault.jpeg",
  },
];

songItems.forEach((element, i) => {
  // console.log(element,i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
});

// handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});

//volume
volumeBar.addEventListener("change", () => {
  audioElement.volume = volumeBar.value / 100;
});

//mute and volume voice
volumeicon.addEventListener("click", () => {
  if (volumeicon.classList.contains("fa-volume-high")) {
    volumeicon.classList.remove("fa-volume-high");
    volumeicon.classList.add("fa-volume-xmark");
    audioElement.volume = 0;
  } else {
    volumeicon.classList.add("fa-volume-high");
    volumeicon.classList.remove("fa-volume-xmark");
    audioElement.volume = 1;
  }
});

//listen to events
audioElement.addEventListener("timeupdate", () => {
  // console.log('timeupdate');
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  // console.log(progress);
  myProgressBar.value = progress;
  // console.log(myProgressBar.value);
  if(myProgressBar.value==100)
  {
     if (songIndex >= 7) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  
  audioElement.src = `song/${songIndex + 1}.mp3`;
  masterSongName.innerHTML = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  }
  
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

//play song from the list
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      // console.log(e.target);
      makeAllPlays();
      masterSongName.innerHTML = songs[songIndex].songName;
      songIndex = parseInt(e.target.id);
    //   console.log(e.target.id);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = `song/${songIndex + 1}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
    });
  }
);

//next song mate
document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 7) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `song/${songIndex + 1}.mp3`;
  masterSongName.innerHTML = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

//previous song mate
document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `song/${songIndex + 1}.mp3`;
  masterSongName.innerHTML = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
