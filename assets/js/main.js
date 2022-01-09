'use strict';
      
const nowBlink = document.querySelector('#now_blink');
const nowTalk = document.querySelector('#now_talk');
const vtuber = document.querySelector('#vtuber');
const selectBgColor = document.querySelector('#select__bg_color');
const vtuberPause = document.querySelector('#vtuber__pause');
const vtuberBlink = document.querySelector('#vtuber__blink');
const vtuberTalk = document.querySelector('#vtuber__talk');
const vtuberTalkAndBlink = document.querySelector('#vtuber__talk_and_blink');
const inputImagePause = document.querySelector('#image__pause');
const inputImageBlink = document.querySelector('#image__blink');
const inputImageTalk = document.querySelector('#image__talk');
const inputImageTalkAndBlink = document.querySelector('#image__talk_and_blink');

const recognition = new webkitSpeechRecognition();
const intervalTime = 1000;
const langCode = 'ja-JP';
const bgColors = [
  'white',
  'green',
  'blue',
  'pink',
  'yellow'
];
let talkingFlag = false;

const db = new Dexie('easyVtuberDB');

const changeBgColor = target => {
  const classNames = [
    'vtuber',
    `bg_${target.value}`
  ];
  db.settingStore.put({
    param: 'bgColor',
    value: target.value
  }).catch( error =>{
    console.error(error);
  });
  vtuber.classList.remove(...vtuber.classList);
  vtuber.classList.add(...classNames);
};
const choiceVtuberImage = (target, imageDom, paramName) => {
  let file = null;
  let reader = null;
  let imageName = '';

  if (target.files.length > 0) {
    file = target.files[0];
    
    reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = () => {
      imageName = reader.result;
      imageDom.src = imageName;
      db.settingStore.put({
        param: paramName,
        value: imageName
      }).catch( error =>{
        console.error(error);
      });
    }
  }
};

db.version(1).stores({
  settingStore: 'param, value'
});

db.settingStore.get('imagePause').then( settingStore => {
  vtuberPause.src = settingStore.value;
})
.catch( error =>{
  db.settingStore.put({
    param: 'imagePause',
    value: './assets/images/eomc.png'
  }).catch( error =>{
    console.error(error);
  });
});
db.settingStore.get('imageBlink').then( settingStore => {
  vtuberBlink.src = settingStore.value;
})
.catch( error =>{
  console.log(error);
  console.log('---');
  console.log('Data initialize.');
  db.settingStore.put({
    param: 'imageBlink',
    value: './assets/images/ecmc.png'
  }).catch( error =>{
    console.error(error);
  });
});
db.settingStore.get('imageTalk').then( settingStore => {
  vtuberTalk.src = settingStore.value;
})
.catch( error =>{
  console.log(error);
  console.log('---');
  console.log('Data initialize.');
  db.settingStore.put({
    param: 'imageTalk',
    value: './assets/images/eomo.png'
  }).catch( error =>{
    console.error(error);
  });
});
db.settingStore.get('imageTalkAndBlink').then( settingStore => {
  vtuberTalkAndBlink.src = settingStore.value;
})
.catch( error =>{
  console.log(error);
  console.log('---');
  console.log('Data initialize.');
  db.settingStore.put({
    param: 'imageTalkAndBlink',
    value: './assets/images/ecmo.png'
  }).catch( error =>{
    console.error(error);
  });
});
db.settingStore.get('bgColor').then( settingStore => {
  selectBgColor.options[bgColors.indexOf(settingStore.value)].selected = true;
  changeBgColor(selectBgColor);
})
.catch( error =>{
  console.log(error);
  console.log('---');
  console.log('Data initialize.');
  db.settingStore.put({
    param: 'bgColor',
    value: 'white'
  }).catch( error =>{
    console.error(error);
  });
});

selectBgColor.addEventListener('change', event => {
  changeBgColor(event.target);
});
inputImagePause.addEventListener('change', event => {
  choiceVtuberImage(event.target, vtuberPause, 'imagePause');
});
inputImageBlink.addEventListener('change', event => {
  choiceVtuberImage(event.target, vtuberBlink, 'imageBlink');
});
inputImageTalk.addEventListener('change', event => {
  choiceVtuberImage(event.target, vtuberTalk, 'imageTalk');
});
inputImageTalkAndBlink.addEventListener('change', event => {
  choiceVtuberImage(event.target, vtuberTalkAndBlink, 'imageTalkAndBlink');
});

recognition.lang = langCode;

recognition.onend = () => {
  recognition.start();
}
recognition.onspeechstart = () => {
  talkingFlag = true;
}
recognition.onspeechend = () => {
  talkingFlag = false;
}

setInterval( () => {
  let blinkTiming = Math.floor(Math.random() * 1000) + 1000;
  let talkTiming = Math.floor(Math.random() * 1000) + 1000;

  setTimeout( () => {
    if (nowBlink.checked) {
      nowBlink.checked = false;
    } else {
      nowBlink.checked = true;
    }
  }, blinkTiming);
  
  setTimeout( () => {
    if (nowTalk.checked) {
      nowTalk.checked = false;
    } else {
      if (talkingFlag) {
        nowTalk.checked = true;
      }
    }
  }, talkTiming);
}, intervalTime);

recognition.start();
