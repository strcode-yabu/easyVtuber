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
const dbParamAndValues = [
  {
    param: 'imagePause',
    defaultValue: './assets/images/eomc.png',
    dom: vtuberPause,
    eveDom: inputImagePause
  },
  {
    param: 'imageBlink',
    defaultValue: './assets/images/ecmc.png',
    dom: vtuberBlink,
    eveDom: inputImageBlink
  },
  {
    param: 'imageTalk',
    defaultValue: './assets/images/eomo.png',
    dom: vtuberTalk,
    eveDom: inputImageTalk
  },
  {
    param: 'imageTalkAndBlink',
    defaultValue: './assets/images/ecmo.png',
    dom: vtuberTalkAndBlink,
    eveDom: inputImageTalkAndBlink
  },
  {
    param: 'bgColor',
    defaultValue: 'white',
    dom: selectBgColor,
    eveDom: selectBgColor
  }
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

dbParamAndValues.forEach( dbParamAndValue => {
  db.settingStore.get(dbParamAndValue.param).then( settingStore => {
    if (dbParamAndValue.param === 'bgColor') {
      dbParamAndValue.dom.options[bgColors.indexOf(settingStore.value)].selected = true;
      changeBgColor(dbParamAndValue.dom);
    } else {
      dbParamAndValue.dom.src = settingStore.value;
    }
  })
  .catch( error =>{
    db.settingStore.put({
      param: dbParamAndValue.param,
      value: dbParamAndValue.defaultValue
    }).catch( error =>{
      console.error(error);
    });
  });
  if (dbParamAndValue.param === 'bgColor') {
    dbParamAndValue.eveDom.addEventListener('change', event => {
      changeBgColor(event.target);
    });
  } else {
    dbParamAndValue.eveDom.addEventListener('change', event => {
      choiceVtuberImage(event.target, dbParamAndValue.dom, dbParamAndValue.param);
    });
  }
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
