/**
 * DOM
 *
 * A simple wrapper for basic DOM manipulation
 * @author Guilherme Rv Coelho
 */

var DOM = function(selector) {
  this.elem = document.querySelector(selector);
};

/**
 * Run a function when the document is ready
 *
 * @param {Function} fn
 */
DOM.ready = function(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
};

/**
 * Add a class to the class list
 *
 * @param {string} className
 */
DOM.prototype.addClass = function(className) {
  if(this.elem.classList) {
    this.elem.classList.add(className);
  } else {
    this.elem.className += ' ' + className;
  }
};

/**
 * Remove a class from the class list
 *
 * @param {string} className
 */
DOM.prototype.removeClass = function(className) {
  if(this.elem.classList) {
    this.elem.classList.remove(className);
  } else {
    this.elem.className = this.elem.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
};

/**
 * Check if an element has a class inside the class list
 *
 * @param {string} className
 */
DOM.prototype.hasClass = function(className) {
  if(this.elem.classList) {
    return this.elem.classList.contains(className);
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(this.elem.className);
  }
};

/**
 * Create an event listener
 */
DOM.prototype.addEventListener = function(event, fn) {
  this.elem.addEventListener(event, fn);
};
