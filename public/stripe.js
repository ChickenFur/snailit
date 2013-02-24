var publicStripeApiKeyTesting = 'pk_test_64CDek6XwYKs27Tw6ejWMTNj';
  
var setupStripeForm = function (){
  $("#mainFrame").append(templates.stripeForm);
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