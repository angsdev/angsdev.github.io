/*============================ Imports ============================*/
// importScripts('./assets/js/sw_helpers.js');
/*============================ Rest ============================*/

const CACHE_NAME = 'AngsDev' ;
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './assets/css/app.css',
  './assets/js/app.js',
  './assets/js/chunk-vendors.js',
  './assets/js/glider.min.js',
  './assets/ico/apple-touch-icon-57.png',
  './assets/ico/apple-touch-icon-72.png',
  './assets/ico/apple-touch-icon-114.png',
  './assets/ico/apple-touch-icon-144.png',
  './assets/ico/favicon.png',
  './assets/img/main.webp',
  './assets/img/about.webp',
  './assets/img/resume.webp',
  './assets/img/projects.webp',
  './assets/img/reviews.webp',
  './assets/img/contact.webp',
  './assets/img/bars.svg',
  './assets/img/icomoon.svg',
  './assets/img/partners/netrivals.webp',
  './assets/img/partners/pwc.webp',
  './assets/img/partners/remoters.webp',
  './assets/img/partners/saime.webp',
  './assets/img/partners/storage-canopy.webp',
  './assets/img/partners/tcs.webp'
];

self.addEventListener('install', e => {

	let cache = caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL));
	e.waitUntil(cache);
});

self.addEventListener('activate', e => {

	let cleaning = caches.keys()
		.then(keys => {
			keys.forEach(key => { if(key !== CACHE_NAME) caches.delete(key); });
		});
	e.waitUntil(cleaning);
});

self.addEventListener('fetch', e => {

	let response = caches.open(CACHE_NAME).then(cache => {
		fetch(e.request)
			.then(res => cache.put(e.request, res))
			.catch(err => console.warn('No internet connection to update: ', err));
		return cache.match(e.request);
	});
	e.respondWith(response);
});