/**
 * A live character count of the currently being edited tweet
 */

$(document).ready(function() {
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
});