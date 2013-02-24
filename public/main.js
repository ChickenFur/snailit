$(document).ready(function (){

//Shipping


//1 Click



//payment
$("#mainFrame").append("<input type='button' value='Pay' id='payNowButton'></input>")
$("#payNowButton").on("click", function (){
  $("#payNowButton").remove();
  setupStripeForm();
})

});