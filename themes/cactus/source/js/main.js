

$(document).ready(function() {


  /**
   * Shows the responsive navigation menu on mobile.
   */
  $("#header > #nav > ul > .icon").click(function() {
    $("#header > #nav > ul").toggleClass("responsive");
  });

  /**
   * Controls the different versions of the menu in blog post articles 
   * for Desktop, tablet and mobile.
   */
  if ($(".post").length) {
    var menu = $("#menu");
    var nav = $("#menu > #nav");
    var menuIcon = $("#menu-icon, #menu-icon-tablet");

    /**
     * Display the menu on hi-res laptops and desktops.
     */
    if ($(document).width() >= 1440) {
      menu.show();
      menuIcon.addClass("active");
    }

    /**
     * Display the menu if the menu icon is clicked.
     */
    menuIcon.click(function() {
      if (menu.is(":hidden")) {
        menu.show();
        menuIcon.addClass("active");
      } else {
        menu.hide();
        menuIcon.removeClass("active");
      }
      return false;
    });

    /**
     * Add a scroll listener to the menu to hide/show the navigation links.
     */
    if (menu.length) {
      var lastScrollTop = 0;
      var isScrolling;

      $(window).on("scroll", function() {
        var scrollTop = $(window).scrollTop();
        
        // Clear the timeout throughout the scroll
        window.clearTimeout(isScrolling);

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(function() {
          // Show nav when scrolling up or near the top
          if (scrollTop < lastScrollTop || scrollTop < 50) {
            nav.fadeIn(200);
            $("#menu-icon-tablet").fadeIn(200);
            $("#top-icon-tablet").fadeOut(200);
          } else {
            // Only hide nav if we're not at the bottom of the page
            if ((window.innerHeight + scrollTop) < $(document).height() - 50) {
              nav.fadeOut(200);
              $("#menu-icon-tablet").fadeOut(200);
              $("#top-icon-tablet").fadeIn(200);
            }
          }
          lastScrollTop = scrollTop;
        }, 100);
      });

      // Show navigation when hovering near the top of the screen
      $(document).on('mousemove', function(e) {
        if (e.clientY < 50) {
          nav.fadeIn(200);
          $("#menu-icon-tablet").fadeIn(200);
          $("#top-icon-tablet").fadeOut(200);
        }
      });
    }

    /**
     * Show mobile navigation menu after scrolling upwards,
     * hide it again after scrolling downwards.
     */
    if ($("#footer-post").length) {
      var lastScrollTop = 0;
      $(window).on("scroll", function() {
        var topDistance = $(window).scrollTop();

        if (topDistance > lastScrollTop) {
          // downscroll -> hide menu
          $("#footer-post").fadeOut(200);
        } else {
          // upscroll -> show menu
          $("#footer-post").fadeIn(200);
        }
        lastScrollTop = topDistance;

        // close all submenu's on scroll
        $("#nav-footer").hide();
        $("#toc-footer").hide();
        $("#share-footer").hide();

        // show a "navigation" icon when close to the top of the page, 
        // otherwise show a "scroll to the top" icon
        if (topDistance < 50) {
          $("#actions-footer > #top").hide();
        } else if (topDistance > 100) {
          $("#actions-footer > #top").show();
        }
      });
    }
  }
});