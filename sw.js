importScripts('./assets/js/sw_helpers.js');

const CACHE_NAME = 'AngsDev' ;
const APP_SHELL = [
	'./',
	'./index.html',
	'./manifest.json',
	'./assets/css/app.css',
	'./assets/img/altumcode_dMUt0X3f59Q_unsplash.webp',
	'./assets/img/arrowdown.svg',
	'./assets/img/cancel.svg',
	'./assets/img/dots.svg',
	'./assets/img/file.svg',
	'./assets/img/globe.svg',
	'./assets/img/logo.svg',
	'./assets/img/mail.svg',
	'./assets/img/menuicon.svg',
	'./assets/img/rest.svg',
	'./assets/img/share.svg',
	'./assets/img/SL_030420_28660_03.webp',
	'./assets/img/undraw_contact_us_15o2.svg',
	'./assets/img/undraw_Creation_process_re_74on.svg',
	'./assets/img/undraw_online_cv_qy9w.svg',
	'./assets/img/undraw_Pitching_re_fpgk.svg',
	'./assets/img/brands/bootstrap_logo.svg',
	'./assets/img/brands/css3_logo.svg',
	'./assets/img/brands/database_logo.svg',
	'./assets/img/brands/git_logo.svg',
	'./assets/img/brands/github_logo.svg',
	'./assets/img/brands/google_logo.svg',
	'./assets/img/brands/html5_logo.svg',
	'./assets/img/brands/jquery_logo.svg',
	'./assets/img/brands/js_logo.svg',
	'./assets/img/brands/laravel_logo.svg',
	'./assets/img/brands/linkedin_logo.svg',
	'./assets/img/brands/markdown_logo.svg',
	'./assets/img/brands/mariadb_logo.svg',
	'./assets/img/brands/mysql_logo.svg',
	'./assets/img/brands/nodejs_logo.svg',
	'./assets/img/brands/php_logo.svg',
	'./assets/img/brands/postgresql_logo.svg',
	'./assets/img/brands/sass_logo.svg',
	'./assets/img/brands/semanticui_logo.svg',
	'./assets/img/brands/sql_logo.svg',
	'./assets/img/brands/wordpress_logo.svg',
	'./assets/img/icons/logo_icon_x48.png',
	'./assets/img/icons/logo_icon_x72.png',
	'./assets/img/icons/logo_icon_x96.png',
	'./assets/img/icons/logo_icon_x128.png',
	'./assets/img/icons/logo_icon_x152.png',
	'./assets/img/icons/logo_icon_x167.png',
	'./assets/img/icons/logo_icon_x180.png',
	'./assets/img/icons/logo_icon_x192.png',
	'./assets/img/icons/logo_icon_x384.png',
	'./assets/img/icons/logo_icon_x512.png',
	'./assets/js/app.js',
	'./assets/js/helpers.js',
	'./assets/js/myDom.js',
	'./data/lang.json'
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