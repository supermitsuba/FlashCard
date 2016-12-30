// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  
  $('#getCards').click(function(){
    $.ajax({
      type: "POST",
      url: "/csv",
      data: { "url": $('#url').val() },
      success: function(data){
        console.log(data)
      },
      fail: function(data){
        
      }
    })
  })
  
});
