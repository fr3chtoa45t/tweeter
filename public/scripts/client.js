/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const charUpdate = function(str) {
  const len = 140 - str.length;
  document.getElementById("counter").innerHTML = len;
};
