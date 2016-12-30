// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html
var cache = null
var index = 0;

$(function() {
  var url = localStorage.getItem("url")
  if(url) {
    $('#url').val(url)
    cache = JSON.parse(localStorage.getItem("cache"))
    displayCards()
  }
  
  
  $('#getCards').click(function(){
    if(!cache) {
      getCardsFromUrl(successful, failure); //https://raw.githubusercontent.com/supermitsuba/supermitsuba.github.io/master/data.csv
    }
    else {
      populateFirstCard()
    }
  })
  
  $('#flip').click(function(){
    var text = $('#answer').text()
    if(text == cache[index].answer){
      $('#answer').text(cache[index].question)
    }else {
      $('#answer').text(cache[index].answer)
    }
    
  })
  
  $('#next').click(function(){
    displayCards()
  })
});

function populateFirstCard(){
    cache = shuffle(cache);
    
    displayCards();
}

function displayCards(){
    index+=1;
    $('#answer').text(cache[index].question)
    if(index >= cache.length){
      cache = shuffle(cache);
      index = 0
    }
}

function successful(data){
  cache = JSON.parse(data)
  localStorage.setItem("url", $('#url').val());
  localStorage.setItem("cache", JSON.stringify(cache));
  populateFirstCard()
}

function failure(data){
  alert('something went bad, hit the button again!')
}

function getCardsFromUrl(success, fail){
  $.ajax({
    type: "POST",
    url: "/csv",
    data: { "url": $('#url').val() },
    success: success,
    fail: fail
  })
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
