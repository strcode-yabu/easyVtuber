'use strict';
      
{
  const nowBlink = document.querySelector('#now_blink');
  const nowTalk = document.querySelector('#now_talk');
  const windowWidth = 639 / 2 + 20;
  const windowHeight = 899.3 / 2 + 20;

  let blinkTiming = 0;

  const recognition = new webkitSpeechRecognition();
  
  window.resizeTo( windowWidth, windowHeight);

  recognition.lang = 'ja-JP';
  
  recognition.onend = event => {
    recognition.start();
  }
  recognition.onspeechstart = event => {
    nowTalk.checked = true;
  }
  recognition.onspeechend = event => {
    nowTalk.checked = false;
  }
  
  setInterval( () => {
    blinkTiming = Math.floor(Math.random() * 1000) + 1000;
    setTimeout( () => {
      if (nowBlink.checked) {
        nowBlink.checked = false;
      } else {
        nowBlink.checked = true;
      }
    }, blinkTiming);
  }, 1000);

  recognition.start();
}
