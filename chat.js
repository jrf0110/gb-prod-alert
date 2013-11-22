var request = require('request')
  , apiToken = process.env.HIPCHAT_TOKEN;

module.exports = {

  /**
   * Returns a string based on the order
   */
  createOrderMesssage: function(order) {
    return [
      'A new order was accepted from ' + order.restaurant_name + ' delivering to ',
      order.user.name + ' for a total of $' + order.total,
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
      background:         options.color || 'green',
      format:             options.format || 'json',
      auth_token:         options.auth_token || apiToken
    };

    request({
      url: 'https://api.hipchat.com/v1/rooms/message',
      qs: qs
    });
  }
};