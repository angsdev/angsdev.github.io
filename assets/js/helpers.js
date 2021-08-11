'use strict'
const doc = document;
const fadeElement = (el, activator) => {
	let perneg = (el.offsetTop - el.offsetHeight),
			perpos = (el.offsetTop + el.offsetHeight);
	if(((doc.documentElement.scrollTop >= (perneg - 300)) && (doc.documentElement.scrollTop <= perpos)) && (!el.classList.contains(activator))){
		el.classList.add(activator);
	}
	else if(((doc.documentElement.scrollTop < (perneg - 300)) || (doc.documentElement.scrollTop > perpos)) && (el.classList.contains(activator))){
		el.classList.remove(activator);
	}
}
const previewImage = (file, defaultImage) => {
	return (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/svg+xml' || file.type === 'image/webp' || file.type === 'image/tiff') ? URL.createObjectURL(file) :	defaultImage;
}
const uploadProgress = (file, { progbar, label }) => {

	let fileReader = new FileReader();
	fileReader.readAsDataURL(file);
	fileReader.addEventListener('progress', (e) => {
		progbar.value = Math.round(parseInt((e.loaded * 100) / e.total));
		label.textContent = file.name;
	});
}
const contentLoad = (files, $image, $progressbar, $label) => {
	let imageURL = previewImage(files[0], './assets/img/file.svg');
	$image.setAttribute('src', imageURL);
	uploadProgress(files[0], { progbar: $progressbar, label: $label });
}
const cleanUrlObject = (element) => {
	URL.revokeObjectURL(element.src);
}
const nullingInput = ($input) => {
	($input.value) ? $input.value = null : undefined;
}
const getFormProps = ($form) => {
	return {
		url: $form.action,
		init: {
			method: $form.method,
			headers : { 'Content-Type': 'application/json', 'Accept': 'application/json' },
			body: new FormData($form)
		}
	}
}
const slideBack = ($elements, position) => {

	$elements.forEach((val)=>{

		if((val.previousElementSibling)){

			if(val.previousElementSibling.classList.contains(position[0])) {
				val.classList.replace(position[2], position[1]);
			}
			else if(val.previousElementSibling.classList.contains(position[1])) {
				val.classList.replace(position[0], position[2]);
			}
			else if(val.previousElementSibling.classList.contains(position[2])) {
				val.classList.replace(position[1], position[0]);
			}
		}
		else if(val.nextElementSibling) {

			if(val.nextElementSibling.classList.contains(position[2])) {
				val.classList.replace(position[1], position[0]);
			}
			else if(val.nextElementSibling.classList.contains(position[0])) {
				val.classList.replace(position[2], position[1]);
			}
			else if(val.nextElementSibling.classList.contains(position[1])) {
				val.classList.replace(position[0], position[2]);
			}
		}
	});
}
const slideForward = ($elements, position) => {
	$elements.forEach((val)=>{

		if((val.previousElementSibling)){

			if(val.previousElementSibling.classList.contains(position[0])) {
				val.classList.replace(position[0], position[1]);
			}
			else if(val.previousElementSibling.classList.contains(position[1])) {
				val.classList.replace(position[1], position[2]);
			}
			else if(val.previousElementSibling.classList.contains(position[2])) {
				val.classList.replace(position[2], position[0]);
			}
		}
		else if(val.nextElementSibling) {

			if(val.nextElementSibling.classList.contains(position[2])) {
				val.classList.replace(position[1], position[2]);
			}
			else if(val.nextElementSibling.classList.contains(position[0])) {
				val.classList.replace(position[2], position[0]);
			}
			else if(val.nextElementSibling.classList.contains(position[1])) {
				val.classList.replace(position[0], position[1]);
			}
		}
	});

}
const getLanguage = () => {

	let language = window.localStorage.getItem('portfolioLanguage') ?? navigator.language;
	switch (language) {
			case 'es':
			case 'es-ES':
			case 'español':
					return 'español';
			case 'en':
			case 'en-US':
			case 'en-GB':
			case 'english':
			default:
					return 'english';
	}
}
const languageHandler = (res) => {

	switch (getLanguage()) {
		case 'es':
		case 'es-ES':
		case 'español':
			return res.español;
		case 'en':
		case 'en-US':
		case 'en-GB':
		case 'english':
		default:
			return res.english;
	}
}
const setAllText = (el, data) => {

	for(let i = 0; i < el.length; i++) {

		if(el[i].length) {

			switch(i){
				case 0:
					el[i].forEach((v, k) => {
						v.textContent = data.nav.buttons[k];
					});
					break;
				case 1:
					el[i].forEach((v, k) => {
						v.textContent = data.about.title[k];
					});
					break;
				case 2:
					el[i].forEach((v, k) => {
						v.innerHTML = data.about.info[k];

					});
					break;
				case 5:
					el[i].forEach((v, k) => {
						v.children[0].firstChild.alt = data.projects.project[k].alt;
						v.children[1].children[0].children[0].textContent = data.projects.project[k].title;
						v.children[2].children[0].textContent = data.projects.project[k].description;
					});
					break;
				case 8:
					el[i].forEach((v, k) => {
						v.children[1].children[0].textContent = data.contact.cards[k].title;
					});
					break;
				case 9:
					el[i].forEach((v, k) => {
						v.children[0].textContent = data.contact.form[k];
					})
					break;
				case 10:
					el[i].forEach((v, k) => {
						v.textContent = data.contact.formAttachment[k];
					})
					break;
				case 13:
					el[i].forEach((v, k) => {
						(v.value === getLanguage()) ? v.selected = true : undefined;
					});
					break;
			}
		}
		else {

			switch(i){
				case 3:
					el[i].textContent = data.projects.title;
					break;
				case 4:
					el[i].textContent = data.projects.info;
					break;
				case 5:
					el[i].children[0].firstChild.alt = data.projects.project[0].alt;
					el[i].children[1].children[0].children[0].textContent = data.projects.project[0].title;
					el[i].children[2].children[0].textContent = data.projects.project[0].description;
					break;
				case 6:
					el[i].textContent = data.projects.more;
					break;
				case 7:
					el[i].textContent = data.contact.title;
					break;
				case 11:
					el[i].firstChild.textContent = data.contact.formAttachmentLabel;
					break;
				case 12:
					el[i].textContent = data.contact.sendButton;
					break;
			}
		}
	}
}
const setTextContent = (elements, path = './data/lang.json') => {
	fetch(path).then(res => res.json()).then(data => setAllText(elements, languageHandler(data)));
}
const fixViewportHeight = () => {
	let vh = window.innerHeight * 0.01;
	doc.documentElement.style.setProperty('--vh', `${vh}px`);
}
const registerSW = (path = './sw.js') => {
	if(navigator.serviceWorker) {
		navigator.serviceWorker.register(path)
			.then(reg => console.log('Registration successful'))
			.catch(err => console.log('Error during service worker registration'));
	} else {
		console.log('Service Worker is not supported');
	}
}
const connectionStatus = (element, time = 2000) => {
	element.classList.add('--active');
	setTimeout(() => element.classList.remove('--active'), time);
}
const isIOs = () => {
  let userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test( userAgent );
}
const isInStandaloneMode = () => {
	('standalone' in window.navigator) && (window.navigator.standalone);
}
const showInstallBox = (installBox) => {
	if (isIOs() && !isInStandaloneMode()) installBox.classList.add('--showed');
}

export {
	fadeElement, slideBack, slideForward,
	getFormProps, contentLoad, uploadProgress,
	languageHandler, setAllText, setTextContent,
	nullingInput, fixViewportHeight, registerSW,
	cleanUrlObject, showInstallBox, connectionStatus
}