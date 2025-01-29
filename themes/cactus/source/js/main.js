$(document).ready(function() {
  /**
   * Set up any necessary scroll listeners for smooth scrolling
   * and navigation visibility
   */
  if ($(".post").length) {
    var lastScrollTop = 0;
    $(window).on("scroll", function() {
      var scrollTop = $(window).scrollTop();
      
      // Show "back to top" button when scrolled down
      if (scrollTop > 300) {
        $("#top-link").fadeIn();
      } else {
        $("#top-link").fadeOut();
      }
      
      lastScrollTop = scrollTop;
    });
  }

  // Smooth scroll to top
  $("#top-link").click(function(e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
});