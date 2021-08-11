
let doc = document;
const newElement = (type, props = {}, content = null, parent = null) => {
	let element = doc.createElement(type);
	if(Object.entries(props).length > 0) {
		for(let prop in props){
			element.setAttribute(prop, obj[prop]);
		}
	}
	if(content) {
		(/<.>/.test(content)) ? (element.innerHTML = content) : (element.textContent = content);
	}
	if(parent) {
		parent.appendChild(element);
	}
	return element;
}
const selectElements = (selector) => {
	let node = doc.querySelectorAll(selector);
	return (node.length === 1) ? (doc.querySelector(selector)) : (node);
}
const replaceElements = (element, replace, parent = null) => {
	return (parent) ? parent.replaceChildren(replace, element) : element.replaceWith(replace);
}
const removeElements = (elements, parent = null) => {
	if(parent){
		for(let element of elements){
			parent.removeChild(element);
		}
	}
	else{
		for(let element of elements) {
			element.remove();
		}
	}
}
const setElementsAttr = (selector, props = [], val = []) => {
	let nodes = document.querySelectorAll(selector);
	nodes.forEach((el, i) => {
		el.setAttribute(props[i], val[i]);
	});
	return nodes;
}
const eventListener = (event, callback, target = doc) => {
	target.addEventListener(event, (e) => { callback(e); });
}

export {
	newElement, selectElements, replaceElements,
	removeElements, setElementsAttr, eventListener
}
