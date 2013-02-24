var publicStripeApiKeyTesting = 'pk_test_64CDek6XwYKs27Tw6ejWMTNj';
var stripeForm = "\
  <div id='stripe-form'>\
      <div class='form-row'>\
        <div class='cc-text'>Card Number</div>\
        <input type='text' size='30' autocomplete='off' class='card-number'/>\
      </div>\
      <div class='form-row'>\
        <div class='cc-text'>CVC</div>\
        <input type='text' size='4' autocomplete='off' class='card-cvc'/>\
      </div>\
      <div class='form-row'>\
        <div class='cc-text'>Expiration (MM/YYYY)</div>\
        <input type='text' size='2' class='card-expiry-month'/>\
        <span> / </span>\
        <input type='text' size='4' class='card-expiry-year'/>\
      </div>\
      <input type='input' name='amount' value='2000' id='cc-amount'>\
      <input type='button' id='payButton' value='Submit Payment'></button>\
      <div id='error' class='hidden'></div>\
  </div>"
  
var setupStripeForm = function (){
  $("#mainFrame").append(stripeForm);
  $("#payButton").on("click", function(){
    $('#stripe-form').addClass("hidden");
    $('#mainFrame').append("<div id='loading'> <img src=loading.gif> </div>")
    processPayment();
  });
  
};
var displaySuccessPage = function(){
  $("#mainFrame").html("");
  $("#mainFrame").append("<div>Payment Successful</div><br><input type='button' id='shipAnother' value='Ship Another?'<input>")
  $("#shipAnother").on("click", function (){
    window.location = "/";
  });
};
var processPayment = function (){
  Stripe.setPublishableKey(publicStripeApiKeyTesting);
  $('#payButton').attr("disabled", "disabled");
  var amount = $('#cc-amount').val(); // amount you want to charge in cents
  Stripe.createToken({
    number: $('.card-number').val(),
    cvc: $('.card-cvc').val(),
    exp_month: $('.card-expiry-month').val(),
    exp_year: $('.card-expiry-year').val()
  }, stripeResponseHandler);
}
var stripeResponseHandler = function (status, response) {
    if (response.error) {
      $('#loading').remove();
      $('#stripe-form').removeClass("hidden");
      $('#error').text(response.error.message);
      $('#error').slideDown(300);
      $('#stripe-form #payButton').removeAttr("disabled");
      return;
    }
    postData = {stripeToken: response.id,
                amount: $('#cc-amount').val()}
    $.ajax({
      url: "/pay",
      type: "GET",
      data: postData,
      success: function (data){ 
        $('#loading').remove();
        displaySuccessPage();},
      error: function (derror){ console.log(error);}
    });
  };