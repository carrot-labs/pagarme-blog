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

(function(window, document, undefined) {

  DOM.ready(function() {
    var body           = new DOM('body');
    var navbarToggle   = new DOM('#navbar-toggle');
    var responsiveMenu = new DOM('#responsive-menu');

    navbarToggle.addEventListener('click', function(e) {
      if(!navbarToggle.hasClass('navbar__toggle--active')) {
        // Prevent the browser from scrolling
        body.addClass('no-scrolling');

        // Add active classes
        navbarToggle.addClass('navbar__toggle--active')
        responsiveMenu.addClass('navbar__responsive-menu--open');

        // Remove default classes
        navbarToggle.removeClass('navbar__toggle')
        responsiveMenu.removeClass('navbar__responsive-menu');
      } else {
        // Set free the body scrolling
        body.removeClass('no-scrolling');

        // Remove active classes
        navbarToggle.removeClass('navbar__toggle--active')
        responsiveMenu.removeClass('navbar__responsive-menu--open');

        // Add default classes
        navbarToggle.addClass('navbar__toggle')
        responsiveMenu.addClass('navbar__responsive-menu');
      }
    });
  });

})(window, document);
