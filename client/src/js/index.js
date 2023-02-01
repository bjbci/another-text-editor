import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');//inside of dist folder
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
///////////////Class Example below  /Class Example below
// export function registerSW(){
//   window.addEventListener('load', ()=>{
//     if ('serviceWorker' in navigator){
//       navigator.serviceWorker
//       .register('service-worker.js')
//       .then(registration=>{

//       })
//       .catch(error=>{
//         console.log('error registering Service Worker')
//         console.log(error)
//       })
//     }else{
//       console.log('yo browser dont support service worker')
//     }
//   })
// }