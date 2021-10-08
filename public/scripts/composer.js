$("document").ready(() => {
  $(".tweet-text").on("input", function() {
    const maxCharacters = 140;
    const len = maxCharacters - $(this).val().length;
  
    // Next element with counter class
    const counter = $(this).parent().find(".counter");
  
      // Red font characters over max
      if (len < 0) $(counter).addClass("negative");
      if (len >= 0) $(counter).removeClass("negative");
  
      $(counter).html(len);
    });

  $(window).scroll(() => {
    if ($(window).scrollTop() < 100) {
      $("#scroll-top").fadeOut();
      $(".create-tweet").fadeIn();
      $("nav").find("span").fadeIn();
      return;
    }

    $("#scroll-top").fadeIn();
    $(".create-tweet").fadeOut();
    $("nav").find("span").fadeOut();
  })

  $("#scroll-top").click(() => {
    $("html, body").animate({scrollTop: 0}, 500);
    $("#error").slideUp();
    $(".new-tweet").slideDown(() => {
      $(".tweet-text").focus();
    });
  });
});
