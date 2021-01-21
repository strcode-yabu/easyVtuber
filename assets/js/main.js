'use strict';
      
{
  const nowBlink = document.querySelector('#now_blink');
  const nowTalk = document.querySelector('#now_talk');
  const windowWidth = 639 / 2 + 20;
  const windowHeight = 899.3 / 2 + 20;

  let blinkTiming = 0;
  let talkTiming = 0;
  let talkingFlag = false;

  const recognition = new webkitSpeechRecognition();
  
  window.resizeTo( windowWidth, windowHeight);

  recognition.lang = 'ja-JP';
  
  recognition.onend = event => {
    recognition.start();
  }
  recognition.onspeechstart = event => {
    talkingFlag = true;
  }
  recognition.onspeechend = event => {
    talkingFlag = false;
  }
  
  setInterval( () => {
    blinkTiming = Math.floor(Math.random() * 1000) + 1000;
    talkTiming = Math.floor(Math.random() * 1000) + 1000;
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
  }, 1000);

  recognition.start();
}
