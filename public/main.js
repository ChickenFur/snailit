$(document).ready(function (){

//Shipping
displayStartingPage();

//1 Click



//payment
//displayPaymentButton();

});
var displayPaymentButton = function (){
  $("#mainFrame").append("<input type='button' value='Pay' id='payNowButton'></input>")
  $("#payNowButton").on("click", function (){
    $("#payNowButton").remove();
    setupStripeForm();
  });
};

var displayStartingPage = function (){
  $("#mainFrame").append(templates.packageForm);
  $("input").on("click", function(event) {
    $(event.target).attr("value", "");
  })
  $("#envelope").on("click", function(event){
    var price = requestPrice();
    setupStripeForm();
    $("#cc-amount").val(price);
  });
}
