/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const validate = function (text) {
  if (text.length === 0) {
    $("#error").slideDown("fast").text("📢 📢 📢 Your tweet is empty! 📢 📢 📢");
    return false;
  }

  if (text.length > 140) {
    $("#error").slideDown("fast").text("📢 📢 📢 Your tweet exceeds maximum amount of characters! 📢 📢 📢");
    return false;
  }

  return true;
};

const createTweet = function (tweetData) {
  return $(`
  <article class="flex tweet">
    <header class="flex">
      <div class="flex user">
        <img src=${tweetData.user.avatars}></img>
        <span>${tweetData.user.name}</span>
      </div>
      <span class='handle'>${tweetData.user.handle}</span>
    </header>
    <section class="tweet-content">
      ${escape(tweetData.content.text)}
    </section>
    <footer class="flex">
      <span>${timeago.format(tweetData.created_at)}</span>
      <div class="flex icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>
  `);
};

const renderTweets = function (tweets) {
  $('#tweets-container').empty();
  for (const tweet of tweets) {
    $('#tweets-container').prepend(createTweet(tweet));
  }
};

const loadTweet = function () {
  $.get("/tweets")
    .then(tweets => {
      renderTweets(tweets);
    });
};

$("document").ready(() => {

  // Fetch and render new tweets
  $("#tweet-form").hide();

  loadTweet();

  // Submit tweet to server
  $("#tweet-form").submit(function (event) {
    event.preventDefault();
    $("#error").hide();
    const tweet = $(this).serialize();
    const tweetText = $(".tweet-text").val();

    if (validate(tweetText)) {
      $.post("/tweets", tweet)
        .then(() => {
          loadTweet();
          $(".tweet-text").val("");
          $(".counter").val(140);
        });
    }
  });

  // Toggle new tweet form
  $(".create-tweet").click(() => {
    $("#error").slideUp();
    $("#tweet-form").slideToggle(() => {
      $(".tweet-text").focus();
    });
  })

  // Submit tweet when enter key pressed
  $(document).on("keydown",function(e){
    const keyCode = e.which || e.keyCode;
    if(keyCode == 13)
    {
      e.preventDefault();
      $("#tweet-form").submit();
    }
 });
});