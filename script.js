const master_play = document.querySelector(".master_play")
let music = new Audio('vande.mp3');
// create Array
const header =document.querySelector(".header")
const songs = [
    {
        id:'1',
        songname:` On My Way <br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/1.jpg"
    },
    {
        id:'2',
        songname:` Alan Walker - Fade <br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/2.jpg"
    },
    {
        id:'3',
        songname:`Cartoon - On & On <br>
        <div class="subtitle">Daniel Levi</div>`,
        poster: "img/3.jpg"
    },
    {
        id:'4',
        songname: `Warriyo - Mortals <br><div class="subtitle">Mortals</div>`,
        poster: "img/4.jpg"
    },
    {
        id:'5',
        songname: `Ertugrul Gazi <br><div class="subtitle">Ertugrul</div>`,
        poster: "img/5.jpg"
    },
    {
        id:'6',
        songname: `Electronic Music <br><div class="subtitle">Electro</div>`,
        poster: "img/6.jpg"
    },
    {
        id:'7',
        songname: `Agar Tum Sath Ho <br><div class="subtitle">Tamashaa</div>`,
        poster: "img/7.jpg"
    },
    {
        id:'8',
        songname: `Suna Hai <br><div class="subtitle">Neha Kakker</div>`,
        poster: "img/8.jpg"
    },
    {
        id:'9',
        songname: `Dilber <br><div class="subtitle">Satyameva Jayate</div>`,
        poster: "img/9.jpg"
    },
    {
        id:'10',
        songname: `Duniya <br><div class="subtitle">Luka Chuppi</div>`,
        poster: "img/10.jpg"
    },
    {
        id:'11',
        songname: `Lagdi Lahore Di <br><div class="subtitle">Street Dancer 3D</div>`,
        poster: "img/11.jpg"
    },
    {
        id:'12',
        songname: `Putt Jatt Da <br><div class="subtitle">Putt Jatt Da</div>`,
        poster: "img/12.jpg"
    },
    {
        id:'13',
        songname: `Baarishein <br><div class="subtitle">Atif Aslam</div>`,
        poster: "img/13.jpg"
    },
    {
        id:'14',
        songname: `Vaaste <br><div class="subtitle">Dhvani Bhanushali</div>`,
        poster: "img/14.jpg"
    },
    {
        id:'15',
        songname: `Lut Gaye <br><div class="subtitle">Jubin Nautiyal</div>`,
        poster: "img/15.jpg"
    }
]

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];
masterPlay.addEventListener('click',()=>{
    if (music.paused || music.currentTime<=0){
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    }else{
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('playlistPlay')).forEach((element)=>{
        element.classList.add('bi-play-circle');
        element.classList.remove('bi-pause-circle');
    })
}
const makeAllBackgrounds = ()=>{
    Array.from(document.getElementsByClassName('songItem')).forEach((element)=>{
        element.style.background = "rgb(105, 105, 170, 0)";
    })
}
let index=0;
let poster_master_play = document.getElementById('poster_master_play'); //for the image of song played
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playlistPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index=e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle');
        e.target.classList.add('bi-pause-circle');
        music.src = `audio/${index}.mp3`;
        poster_master_play.src = `img/${index}.jpg`; //for the image of song played
        music.play();
        let song_title = songs.filter((ele)=>{     // for the name of song played
            return ele.id == index;               // for the name of song played
        })
        song_title.forEach(ele=>{
            let {songname} = ele;
            title.innerHTML = songname;
        })
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        music.addEventListener('ended',()=>{
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
            wave.classList.remove('active2');
        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, 0.1)";
    })
})
//////here 

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if (sec<10) {
        sec = `0${sec}`
    }
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if (sec1<10) {
        sec1 = `0${sec1}`
    }
    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', ()=>{
    music.currentTime = seek.value * music.duration/100;
})

music.addEventListener('ended', ()=>{
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
    wave.classList.remove('active2');
})


let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', ()=>{
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 0) {
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a/100;
})



let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', ()=>{
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `audio/${index}.mp3`;
        poster_master_play.src = `img/${index}.jpg`; //for the image of song played
        music.play();
        let song_title = songs.filter((ele)=>{     // for the name of song played
            return ele.id == index;               // for the name of song played
        })
        song_title.forEach(ele=>{
            let {songname} = ele;
            title.innerHTML = songname;
        })
    makeAllPlays()

    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
    
})
next.addEventListener('click', ()=>{
    index -= 0;
    index += 1;
    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 1;
        }
        music.src = `audio/${index}.mp3`;
        poster_master_play.src = `img/${index}.jpg`; //for the image of song played
        music.play();
        let song_title = songs.filter((ele)=>{     // for the name of song played
            return ele.id == index;               // for the name of song played
        })
        song_title.forEach(ele=>{
            let {songname} = ele;
            title.innerHTML = songname;
        })
    makeAllPlays()

    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
    
})


let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click', ()=>{
    pop_song.scrollLeft -= 330;
})
right_scroll.addEventListener('click', ()=>{
    pop_song.scrollLeft += 330;
})


let left_scrolls = document.getElementById('left_scrolls');
let right_scrolls = document.getElementById('right_scrolls');
let item = document.getElementsByClassName('item')[0];

left_scrolls.addEventListener('click', ()=>{
    item.scrollLeft -= 330;
})
right_scrolls.addEventListener('click', ()=>{
    item.scrollLeft += 330;
})

Array.from(document.getElementsByClassName('songItem')).forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songname;
})


//change loop, shuffle, repeat icon on click
const repeatBtn = master_play.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", ()=>{
  let getText = repeatBtn.innerText; //getting this tag innerText
  switch(getText){
    case "repeat":
      repeatBtn.innerText = "repeat_one";
//       repeatBtn.setAttribute("title", "Song looped");
//       break;
//     case "repeat_one":
//       repeatBtn.innerText = "shuffle";
//       repeatBtn.setAttribute("title", "Playback shuffled");
//       break;
//     case "shuffle":
//       repeatBtn.innerText = "repeat";
//       repeatBtn.setAttribute("title", "Playlist looped");
//       break;
//   }
// });

// //code for what to do after song ended
// mainAudio.addEventListener("ended", ()=>{
//   // we'll do according to the icon means if user has set icon to
//   // loop song then we'll repeat the current song and will do accordingly
//   let getText = repeatBtn.innerText; //getting this tag innerText
//   switch(getText){
//     case "repeat":
//       nextMusic(); //calling nextMusic function
//       break;
//     case "repeat_one":
//       mainAudio.currentTime = 0; //setting audio current time to 0
//       loadMusic(musicIndex); //calling loadMusic function with argument, in the argument there is a index of current song
//       playMusic(); //calling playMusic function
//       break;
//     case "shuffle":
//       let randIndex = Math.floor((Math.random() * allMusic.length) + 1); //genereting random index/numb with max range of array length
//       do{
//         randIndex = Math.floor((Math.random() * allMusic.length) + 1);
//       }while(musicIndex == randIndex); //this loop run until the next random number won't be the same of current musicIndex
//       musicIndex = randIndex; //passing randomIndex to musicIndex
//       loadMusic(musicIndex);
//       playMusic();
//       playingSong();
//       break;
  }
});



