var templates = {};

templates.stripeForm = "\
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
  </div>";

templates.types = "\
        <ul>\
          <li id='envelope'>\
            <img src='static/img/envelope.png' />\
            <span class='type'>Envelope</span>\
          </li>\
        </ul>\
";

templates.address = "\
      <form action='#'>\
          <fieldset>\
            <label>From ZipCode: </label>\
            <input type='text' id='fromZip' value='zip' />\
            <br />\
            <label>Send to: </label>\
            <input type='text' id='name' data-value='Full name' value='Full name' />\
            <br />\
            <label>at</label>\
            <input type='text' id='street' data-value='Street' value='Street' />\
            <br />\
            <input type='text' id='city' data-value='City' value='City' />\
            <br />\
            <input type='text' id='state' data-value='ST' value='ST' />\
            <input type='text' id='zip' data-value='Zip' value='Zip' />\
          </fieldset>\
        </form>\
";

templates.packageForm = "\
  <div id='packageForm'>\
  <h2>Who and where are you sending it to?</h2>\
    <div id='address'>" +
    templates.address +
    "</div>\
    <h2>Click Envelope to Pay!</h2>\
    <div id='types'>" +
    templates.types +
    "</div>\
    <div id='navigation'>\
    <div>\
  </div>\
";

