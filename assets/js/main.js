'use strict';
      
{
  const chara = document.querySelector('#vtuber');
  const windowWidth = 639 / 2 + 20;
  const windowHeight = 899.3 / 2 + 20;

  const recognition = new webkitSpeechRecognition();
  
  window.resizeTo( windowWidth, windowHeight);

  recognition.lang = 'ja-JP';
  
  recognition.onend = event => {
    recognition.start();
  }
  recognition.onspeechstart = event => {
    chara.classList.add('talk');
  }
  recognition.onspeechend = event => {
    chara.classList.remove('talk');
  }
  
  recognition.start();
}
