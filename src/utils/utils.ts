import clickSound from '../config/click-sound';

export function playClickAudio () {
  let audio = new Audio('data:audio/mp3;base64,' + clickSound);
  audio.play();
}
