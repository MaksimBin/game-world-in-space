let gameContainer = document.getElementById('loadPreGame')
gameContainer.style = "position:fixsed;top:0;left:0;width:100%;height:100vh; background-color:#E1ED6B;display: flex;flex-direction: column;justify-content: center;alig-items: center;background-image: url('5dfe317d4e7b84ef2315c39541be824b.jpg');background-repeat: no-repeat;background-size: cover;background-position: center;text-align:center;"

let video = document.getElementById('video')
let videostarts = document.getElementById('videostart')

video.innerHTML = ""
videostarts.innerHTML = ""
videostart.style = "position: absolute;top: 0;left: 0;width: 100% ;height: 100vh;object - fit: cover;z-index: 998;display:node;"

let videoPilot = '<video id="video1" src="istockphoto-1126666385-640_adpp_is.mp4" muted autoplay loop></video>'

let videoKorabl = '<video id="video1" src="istockphoto-1216361063-640_adpp_is.mp4" muted autoplay loop></video>'

let videoPilot2 = '<video id="video1" src="istockphoto-1126666366-640_adpp_is.mp4" muted autoplay loop></video>'

let videoStart = '<video src="istockphoto-1271371535-640_adpp_is.mp4" muted autoplay loop></video>'


let audio = new Audio()
const stringTexsts = ['Представляем', 'Игру', 'Разработанную', 'На JAVASCRIPT', 'Babkov M', 'WorldInSpace', '','', '','', '','','','','','','','','','','','','ПОЕХАЛИ','','','','','','','']

const preGame = () => {
  
  audio.pause()
  audio = new Audio("Harold Faltermeyer - Top Gun Anthem (OST из фильма _Лучший стрелок _ Top Gun_) (galamp3.com).mp3")

  audioPlay()
  
setTimeout(() => {
    video.innerHTML = videoPilot
}, 14000)


  setTimeout(() => {
    video.innerHTML = videoKorabl
  }, 24000)
  
    setTimeout(() => {
      video.innerHTML = videoPilot2
    }, 42000)
  
  
  let number = 0
  setInterval(() => {
    document.getElementById('text').innerHTML = `${stringTexsts[number]}`

    number = number + 1

  }, 2000)

  setTimeout(() => {
    audio.pause()
    audio = new Audio('passengers_15. 50 of Light Speed.mp3')
    audioPlay()
    document.getElementById('start').style = "display: none;"

    document.getElementById('h1').style = "z-index: 999"
  }, 52000)
}

let displayContainerNone = document.getElementById('container')
displayContainerNone.style = 'display: none;'


const startGame = () => {
  document.getElementById('h1').style = "z-index: 998"

  audio.pause()

  audio = new Audio('234264-933636b6-9a23-407e-851d-b88c50828212.mp3')

  audioPlay()

  videostarts.innerHTML = videoStart

  videostarts.style = "display: block;position: absolute;top:0;left: 0;width:100%;height:100vh;object- fit: cover;z-index:998;"

  setTimeout(() => {

    videostarts.style = "display: none;"

    displayContainerNone.style = "display: block"
    gameContainer.style = "display: none"
    audio.pause()
    audio = new Audio('ZZ Top — Bad to the bone(саундтрек к к_ф Трудный ребенок) (www.lightaudio.ru).mp3')
    audioPlay()
  }, 8000)

}

//запуск трека меню

const audioPlay = () => {
  audio.play()
}


var width = window.innerWidth;
var height = window.innerHeight;

function drawImage(imageObj) {
  var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
  });

  var layer1 = new Konva.Layer();


  var group = new Konva.Group({
    x: stage.width() / 2 - 200 / 2,
    y: stage.height() / 2 - 137 / 2,
    draggable: true,
  });


  var darthVaderImg = new Konva.Image({
    image: imageObj,
    width: 200,
    height: 137,

  });

  var turbo = new Konva.Rect({
    x: stage.width() / 2 - 295 / 2,
    y: stage.height() / 2 - 460 / 2,
    width: 100,
    height: 2,

    fill: '#580FBD',
    strokeWidth: 4,
  });


  var rect = new Konva.Rect({
    x: stage.width() / 2 - 200 / 2,
    y: stage.height() / 2 - 720 / 2,
    width: 7,
    height: 25,

    fill: '#04FDF9',
    strokeWidth: 4,
  });


  var layer2 = new Konva.Layer()

  var hexagon = new Konva.Image({
    image: imageObj,
    x: 70,
    y: 50,
    width: 50,
    height: 50,
  });


  group.add(rect, darthVaderImg, turbo)

  layer1.add(group);
  layer2.add(hexagon)

  stage.add(layer1, layer2);


  var amplitude = 100;
  var period = 2000;

  var centerX = stage.width() / 2;

  var anim = new Konva.Animation(function(frame) {
    hexagon.x(
      amplitude * Math.sin((frame.time * 2 * Math.PI) / period) + centerX
    );
  }, layer2);
  anim.start();



  let tween = new Konva.Tween({
    node: rect, //имя фигуры, которую будем анимировать 
    duration: 0.5, //продолжительность 
    x: 100, //координата x 
    y: -950, //координата y 

  });



  group.on('mouseover', function() {
    document.body.style.cursor = 'pointer';
  });

  group.on('mouseout', function() {
    document.body.style.cursor = 'default';
  });


  let interval
  let inter
  const groupStart = () => {
    interval = setInterval(() => {
      tween.play()
      let timeOut = setTimeout(() => tween.reset(), 400)
    }, 500)
    inter = setInterval(() => audioStreli.play(), 400)
  }

  const groupRemove = () => {
    clearInterval(interval)
    tween.reset()
    tween.pause()
    audioStreli.pause()
    clearInterval(inter)

  }


  let audioStreli = new Audio('234264-3e98473e-3d08-40a2-85bc-a9b8f43dfd75.mp3')

  group.on('touchstart', () => {
    groupStart()

  })

  group.on('touchend', () => {
    groupRemove()

  })

}

var imageObj = new Image();
imageObj.onload = function() {
  drawImage(this);
};
imageObj.src = 'pngwing.com.png'