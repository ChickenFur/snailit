var publicStripeApiKeyTesting = 'pk_test_64CDek6XwYKs27Tw6ejWMTNj';
Stripe.setPublishableKey(publicStripeApiKeyTesting);
$(document).ready(function (){
  function stripeResponseHandler (status, response) {
    if (response.error) {
      $('#error').text(response.error.message);
      $('#error').slideDown(300);
      $('#stripe-form .submit-button').removeAttr("disabled");
      return;
    }
    var form = $("#payment-form");
    form.append("<input type='hidden' name='stripeToken' value='" + response.id + "'/>");
    postData = {stripeToken: response.id,
                amount: $('#cc-amount').val()}
    debugger;
    $.ajax({
      url: "/pay",
      type: "GET",
      data: postData,
      success: function (data){ $('.submit-button')},
      error: function (derror){ console.log(error);}
    });

  }
  // http://stripe.com/docs/tutorials/forms
  $("#payment-form").submit(function(event) {
    $('#error').hide();
    // disable the submit button to prevent repeated clicks
    $('.submit-button').attr("disabled", "disabled");

    var amount = $('#cc-amount').val(); // amount you want to charge in cents
    Stripe.createToken({
      number: $('.card-number').val(),
      cvc: $('.card-cvc').val(),
      exp_month: $('.card-expiry-month').val(),
      exp_year: $('.card-expiry-year').val()
    }, stripeResponseHandler);
    debugger;
    // prevent the form from submitting with the default action
    return false;
  });
});
