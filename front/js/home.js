(function(window, document, undefined) {

  DOM.ready(function() {
    var body           = new DOM('body');
    var navbarToggle   = new DOM('#navbar-toggle');
    var responsiveMenu = new DOM('#responsive-menu');

    /**
     * Navbar toggle
     */

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

    /**
     * Masonry (grid)
     */

    var postThumbContainer = document.querySelector('.post-thumb-list');
    new Masonry(postThumbContainer, {});
  });

})(window, document);
