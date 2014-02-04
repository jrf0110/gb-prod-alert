var request = require('request')
  , apiToken = process.env.HIPCHAT_TOKEN;

var dollars = function(pennies) {
  var cents = pennies == null ? 0 : parseFloat(pennies); // parse as float incase of partial cents
  return Number.isNaN(cents) ? '' : (cents / 100).toFixed(2); // partial cents get rounded here
};

module.exports = {

  /**
   * Returns a string based on the order
   */
  createOrderMessage: function(order) {
    if (!order) 
      return 'Beep boop, order not found! Initiating self-destruction sequence..';

    return [
      'A new order was accepted from ' + order.restaurant_name,
      order.user.name ? ' delivering to ' + order.user.name : '',
      ' for a total of $' + dollars( order.total ),
      '. View online at https://www.goodybag.com/orders/' + order.id
    ].join('');
  },

  /**
   * Send a message to a hipchat room
   */
  send: function(options) {
    options = options || {};
    var qs = {
      room_id:            options.room_id || 'Cater',
      from:               options.from || 'Goody Bot',
      message:            options.message || 'Hello',
      message_format:     options.message_format || 'text',
      color:              options.color || 'green',
      format:             options.format || 'json',
      auth_token:         options.auth_token || apiToken
    };

    request({
      url: 'https://api.hipchat.com/v1/rooms/message',
      qs: qs
    }, function(error, response, body) {
      if (error) console.error(error);
    });
  }
};
