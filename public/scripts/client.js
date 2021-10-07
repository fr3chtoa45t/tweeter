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


const createTweet = function (tweetData) {
  return $(`
  <br>
  <article class="flex tweet">
    <header class="flex">
      <div class="flex user">
        <img src=${tweetData.user.avatars}></img>
        <span>${tweetData.user.name}</span>
      </div>
      <span class="flex username">${tweetData.user.handle}</span>
    </header>
    <section class="flex">
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

const renderTweet = function (tweets) {
  $('#tweets-container').empty();
  for (const tweet of tweets) {
    $('#tweets-container').prepend(createTweet(tweet));
  }
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

$("document").ready(() => {
  $(".new-tweet").hide();
  const loadTweets = function () {
    $.get("/tweets")
      .then(tweets => {
        renderTweet(tweets);
      });
  };

  loadTweets();

  $("#tweet").submit(function (event) {
    event.preventDefault();
    $("#error").hide();
    const tweet = $(this).serialize();
    const tweetText = $(".tweet-text").val();

    if (validate(tweetText)) {
      $.post("/tweets", tweet)
        .then(() => {
          loadTweets();
          $(".tweet-text").val("");
        });
    }
  });

  $(".create-tweet").click(() => {
    $("#error").slideUp();
    $(".new-tweet").slideToggle(() => {
      $(".tweet-text").focus();
    });
  })

  $(document).on("keydown",function(e){

    var keyCode = e.which || e.keyCode;
    if(keyCode == 13) // enter key code
    {
      e.preventDefault();
      $("#tweet").submit();
    }
 
 });
});