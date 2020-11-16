'use strict';
      
{
  const chara = document.querySelector('#vtuber');
  
  const recognition = new webkitSpeechRecognition();
  
  recognition.lang = 'ja-JP';
  
  recognition.onend = (event) => {
    recognition.start();
  }
  recognition.onspeechstart = (event) => {
    chara.classList.add('talk');
  }
  recognition.onspeechend = (event) => {
    chara.classList.remove('talk');
  }
  
  recognition.start();
}
