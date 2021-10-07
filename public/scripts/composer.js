$("document").ready(() => {
  $(window).scroll(() => {
    if ($(window).scrollTop() < 100) {
      $("#scroll").fadeOut();
      $(".create-tweet").fadeIn();
      return;
    }

    $("#scroll").fadeIn();
    $(".create-tweet").fadeOut();
  })

  $("#scroll").click(() => {
    $("html, body").animate({scrollTop: 0}, 500);
    $("#error").slideUp();
    $(".new-tweet").slideDown(() => {
      $(".tweet-text").focus();
    });
  });
});