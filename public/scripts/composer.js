/**
 * Functions for changing elements on site dynamically
 * 
 * Creator: Jordan Cronier
 *
 */

$("document").ready(() => {
  
  // Change counter on input to tweet form
  $(".tweet-text").on("input", function() {
    const maxCharacters = 140;
    const len = maxCharacters - $(this).val().length;
  
    // Next element with counter class
    const counter = $(this).parent().find(".counter");
  
      // Red font characters over max
      if (len < 0) $(counter).addClass("negative");
      if (len >= 0) $(counter).removeClass("negative");
  
      $(counter).val(len);
    });

  // Window scrolled
  $(window).scroll(() => {
    const $scrollButton = $("#scroll-top");
    const $composeButton = $("#compose");
    const $nav = $("nav");

    // window at top
    if ($(window).scrollTop() < 100) {
      $scrollButton.fadeOut();
      $composeButton.fadeIn();

      // App name
      $nav.find("span").fadeIn();
      return;
    }

    // window scrolled
    $scrollButton.fadeIn();
    $composeButton.fadeOut();

    // App name
    $nav.find("span").fadeOut();
  })

  // Scroll to top and compose tweet
  $("#scroll-top").click(() => {
    $("html, body").animate({scrollTop: 0}, 500);
    $("#error").slideUp();
    $("#tweet-form").slideDown(() => {
      $(".tweet-text").focus();
    });
  });
});
