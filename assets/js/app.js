'use strict'
import { selectElements, eventListener } from "./myDom.js";
import { fadeElement, slideBack, slideForward, contentLoad,
				 nullingInput, getFormProps, setTextContent,
				 fixViewportHeight, registerSW, cleanUrlObject,
				 connectionStatus } from "./helpers.js";

const doc = document, win = window;

		//=========================== Navbar =============================//

let $navbar = selectElements('.navbar'),
		$navbarMenubar = selectElements('.navbar__list__menubar'),
		$navbarMenu = selectElements('.navbar__list__menu'),
		$navbarMenuItems = selectElements('.navbar__list__menu__item'),

		//=========================== About ==============================//

		$cover = selectElements('.cover'),
		$coverArrow = selectElements('.cover__buttonSection__button'),

		//=========================== About ==============================//

		$about = selectElements('.about'),
		$aboutTitle = selectElements('.about__title'),
		$aboutImage = selectElements('.about__section__image'),
		$aboutText = selectElements('.about__section__text'),
		$aboutTechnologiesContainer = selectElements('.about__technologies__container'),
		$aboutTechnologiesElements = selectElements('.about__technologies__container__elements__element'),
		$aboutTechnologiesSlider = selectElements('.about__technologies__container__slider'),

		//=========================== Projects ===========================//

		$projects = selectElements('.projects'),
		$projectsTitle = selectElements('.projects__title'),
		$projectsImage = selectElements('.projects__section__image'),
		$projectsText = selectElements('.projects__section__text'),
		$projectsFigure = selectElements('.projects__flex__figure'),
		$projectsMore = selectElements('.projects__more'),

		//=========================== Contact ============================//

		$contact = selectElements('.contact'),
		$contactTitle = selectElements('.contact__title'),
		$contactCards = selectElements('.contact__cards__card'),
		$contactForm = selectElements('.contact__form'),
		$contactFormInput = selectElements('.contact__form__inputSection'),
		$contactFormButton = selectElements('.contact__form__button'),
		$contactFormAttachment = selectElements('.contact__form__attachment'),
		$contactFormAttachmentText = selectElements('.contact__form__attachment__text'),
		$contactFormAttachmentButton = selectElements('.contact__form__attachment__label'),
		$contactFormAttachmentFileInput = selectElements('.contact__form__attachment__label__input'),
		$contactFormAttachmentPreview = selectElements('.contact__form__attachment__preview'),
		$contactFormAttachmentPreviewImage = selectElements('.contact__form__attachment__preview__image'),
		$contactFormAttachmentPreviewProgress = selectElements('.contact__form__attachment__preview__bar'),
		$contactFormAttachmentPreviewText = selectElements('.contact__form__attachment__preview__text'),
		$contactFormAttachmentPreviewCross = selectElements('.contact__form__attachment__preview__cancel'),

		//=========================== Footer ============================//

		$footerLanguage = selectElements('.footer__language select'),
		$footerLanguageOptions = selectElements('.footer__language select option'),

		//=========================== Wrapper ============================//

		$wrapper = selectElements('.wrapper'),
		$wrapperUnderconstruct = selectElements('.wrapper__underConstruct'),
		$wrapperUnderconstructCross = selectElements('.wrapper__underConstruct__close'),

		//=========================== Connection ============================//

		$onlineAdvice = selectElements('.connectionAdvice__online'),
		$offlineAdvice = selectElements('.connectionAdvice__offline'),

		//===================== Text Content Elements =====================//

		textContentElements = [
			$navbarMenuItems, $aboutTitle, $aboutText, $projectsTitle,
			$projectsText, $projectsFigure, $projectsMore, $contactTitle,
			$contactCards, $contactFormInput, $contactFormAttachmentText,
			$contactFormAttachmentButton, $contactFormButton, $footerLanguageOptions
		];

		//================================================================//

eventListener('DOMContentLoaded', (e) => {

	registerSW();
	setTextContent(textContentElements);
});

eventListener('online', (e) => connectionStatus($onlineAdvice), win);
eventListener('offline', (e) => connectionStatus($offlineAdvice), win);
eventListener('load', (e) => {

	fixViewportHeight();
	fadeElement($aboutImage[0],'--showed');
	fadeElement($aboutText[0],'--showed');
	fadeElement($aboutImage[1],'--showed');
	fadeElement($aboutText[1],'--showed');
	fadeElement($projectsImage,'--showed');
	fadeElement($projectsText,'--showed');
}, win);
eventListener('resize', (e) => {

	fixViewportHeight();
}, win);

eventListener('scroll', (e) => {

	(e.target.scrollingElement.scrollTop > 100) ? ($navbar.classList.add('--sticky')) : ($navbar.classList.remove('--sticky'));
	fadeElement($aboutImage[0],'--showed');
	fadeElement($aboutText[0],'--showed');
	fadeElement($aboutImage[1],'--showed');
	fadeElement($aboutText[1],'--showed');
	fadeElement($projectsImage,'--showed');
	fadeElement($projectsText,'--showed');
});

eventListener('click', (e) => {

	if(e.target.closest(`.${$navbarMenubar.classList[0]}`)) {

		$navbarMenubar.classList.toggle('--active');
		$navbarMenu.classList.toggle('--active');
		$wrapper.classList.contains('--active') ? $wrapper.classList.remove('--active') : $wrapper.classList.add('--active');
		$wrapperUnderconstruct.classList.remove('--active');
	}
	if(e.target.matches(`.${$navbarMenuItems[0].classList[0]}`) || e.target.closest(`.${$navbarMenuItems[0].classList[0]}`)) {

		$navbarMenu.classList.remove('--active');
		switch(e.target) {
			case $navbarMenuItems[0]:
				$wrapper.classList.remove('--active');
				$cover.scrollIntoView();
				break;
			case $navbarMenuItems[1]:
				$wrapper.classList.remove('--active');
				$about.scrollIntoView();
				break;
			case $navbarMenuItems[2]:
				$wrapper.classList.add('--active');
				$wrapperUnderconstruct.classList.add('--active');
				break;
			case $navbarMenuItems[3]:
				$wrapper.classList.remove('--active');
				$projects.scrollIntoView();
				break;
			case $navbarMenuItems[4]:
				$wrapper.classList.remove('--active');
				$contact.scrollIntoView();
				break;
		}
	}
	if(e.target.matches(`.${$coverArrow.classList[0]}`) || e.target.closest(`.${$coverArrow.classList[0]}`)){

		$about.scrollIntoView();
	}
	if(e.target.matches(`.${$aboutTechnologiesSlider[0].children[0].classList[0]}`)) {

		let $elements = e.target.closest(`.${$aboutTechnologiesContainer[0].classList[0]}`).querySelectorAll(`.${$aboutTechnologiesElements[0].classList[0]}`);
		slideBack($elements, ['--prev', '--curr', '--next']);
	}
	if(e.target.matches(`.${$aboutTechnologiesSlider[0].children[1].classList[0]}`)) {

		let $elements = e.target.closest(`.${$aboutTechnologiesContainer[0].classList[0]}`).querySelectorAll(`.${$aboutTechnologiesElements[0].classList[0]}`);
		slideForward($elements, ['--prev', '--curr', '--next']);
	}
	if(e.target.matches(`.${$contactCards[0].classList[0]}:nth-child(2)`) || e.target.closest(`.${$contactCards[0].classList[0]}:nth-child(2)`)){

		e.target.closest(`.${$contactCards[0].classList[0]}:nth-child(2)`).classList.toggle('--active');
		$contactForm.classList.toggle('--active');
	}
	if(e.target.matches(`.${$contactFormAttachmentPreviewCross.classList[0]}`)) {

		cleanUrlObject($contactFormAttachmentPreviewImage);
		$contactFormAttachmentPreview.classList.remove('--visible');
		nullingInput($contactFormAttachmentFileInput);
	}
	if(e.target.matches(`.${$wrapper.classList[0]}`)) {

		$navbarMenu.classList.remove('--active');
		$wrapper.classList.toggle('--active');
		$wrapperUnderconstruct.classList.remove('--active');
	}
	if(e.target.matches(`.${$wrapperUnderconstructCross.classList[0]}`)) {

		e.target.closest(`.${$wrapperUnderconstruct.classList[0]}`).classList.remove('--active');
		e.target.closest(`.${$wrapper.classList[0]}`).classList.remove('--active');
	}
});

eventListener('dblclick', (e) => {

	if(e.target.matches('.cover__logoSection__logo')){
		(doc.fullscreenElement) ? doc.exitFullscreen() : doc.documentElement.requestFullscreen();
	}
});

eventListener('change', (e) => {

	if(e.target.matches(`.${$contactFormAttachmentFileInput.classList[0]}`)){

		cleanUrlObject($contactFormAttachmentPreviewImage);
		$contactFormAttachmentPreview.classList.add('--visible');
		contentLoad(e.target.files, $contactFormAttachmentPreviewImage, $contactFormAttachmentPreviewProgress, $contactFormAttachmentPreviewText);
	}
	if(e.target.matches(`.${$footerLanguage.classList[0]}`)){

		localStorage.setItem('portfolioLanguage', e.target.value);
		setTextContent(textContentElements);
	}
});

eventListener('dragover', (e) => {
	e.preventDefault();

	if(e.target.closest(`.${$contactFormAttachment.classList[0]}`) || e.target.parentElement.closest(`.${$contactFormAttachment.classList[0]}`)) {

		cleanUrlObject($contactFormAttachmentPreviewImage);
		$contactFormAttachment.classList.add('--dragover');
	}
});

eventListener('dragleave', (e) => {
	e.preventDefault();

	if(e.target.closest(`.${$contactFormAttachment.classList[0]}`) || e.target.parentElement.closest(`.${$contactFormAttachment.classList[0]}`)) {

		cleanUrlObject($contactFormAttachmentPreviewImage);
		$contactFormAttachment.classList.remove('--dragover');
	}
});

eventListener('drop', (e) => {
	e.preventDefault();

	if(e.target.closest(`.${$contactFormAttachment.classList[0]}`) || e.target.parentElement.closest(`.${$contactFormAttachment.classList[0]}`)){

		cleanUrlObject($contactFormAttachmentPreviewImage);
		$contactFormAttachmentFileInput.files = e.dataTransfer.files;
		$contactFormAttachmentPreview.classList.add('--visible');
		contentLoad($contactFormAttachmentFileInput.files, $contactFormAttachmentPreviewImage, $contactFormAttachmentPreviewProgress, $contactFormAttachmentPreviewText);
	}
});

eventListener('submit', (e) => {
	e.preventDefault();

	if (e.target.matches(`.${$contactForm.classList[0]}`)) {

		let { url, init } = getFormProps(e.target);
		init.body.append('_template', 'table');
		init.body = JSON.stringify(Object.fromEntries(init.body));

		fetch(url, init)
    .then(res => (res.ok) ? res.json() : Promise.reject(res))
    .then(json => (e.target.reset(), alert(json.message)))
    .catch(console.log);

		$contactFormAttachmentPreview.classList.remove('--visible');
		nullingInput($contactFormAttachmentFileInput);
	}
});
