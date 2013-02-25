$(document).ready(function (){

displayStartingPage();

});
var displayStartingPage = function (){
  $("#mainFrame").append(templates.packageForm);
  $("input").on("click", function(event) {
    $(event.target).attr("value", "");
  })
  $("#envelope").on("click", function(event){
    var fromZip = $('#fromZip').val();
    var toZip = $('#zip').val();
    $("#mainFrame").html("");  
    $('#mainFrame').append("<div id='loading'> <img src=loading.gif> </div>")
    requestPrice(fromZip, toZip, function (data){
      $("#mainFrame").html("");
      setupPriceOptions(JSON.parse(data));
    });
  });
}
var setupPriceOptions = function(prices){
  var priceOptionDiv = createPriceOptions(prices);
  $("#mainFrame").append(priceOptionDiv);
  $('.priceButton').on("click", function( event ){
    $("#mainFrame").html("");
    setupStripeForm();
    var divs = $(event.currentTarget).children()
    var price = divs[1];
    var amount = price.innerText; 
    $("#cc-amount").val(formatToCents(amount));
  })
}

var requestPrice = function(fromZip, toZip, callBack){
  $.ajax({
    url:"/letter/?fromZip="+fromZip+"&toZip="+toZip,
    success: function(data){
      callBack(data);
    },
    error: function(error){
      console.log("Error:", error);
    }
  })
};
var createPriceOptions = function (prices){
  var div = "<div>"
  for (var i = 0; i < prices.rates.length; i++){
    div += "<span class='priceButton'>" +
    "<div>" + prices.rates[i].service + "</div>"+
    "<div>" + prices.rates[i].rate + "</div></span>"
    
  }
  div +="</div>"
  return div;
};

var formatToCents = function (amount){
  var newText = amount.replace(".", "")
  newText = parseInt(newText)
  if ( newText < 50){
    newText += 50;
  }
  return newText;
}