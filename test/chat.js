var assert = require('assert');
var chat = require('../chat');

describe('chat', function(){
  describe('createOrderMessage', function(){
    it('should handle complete order', function(){
      var order = {
        restaurant_name: 'Taco Bell'
      , id: 9
      , total: 1000
      , user: { }
      };
      var result = chat.createOrderMessage(order);
      assert(result);
      assert(result === 'A new order was accepted from Taco Bell for a total of $10.00. View online at https://www.goodybag.com/orders/9');
    });

    it('should handle order with missing username', function() {
      var order = {
        restaurant_name: 'Burger King'
      , id: 10
      , total: 7300
      , user: {
          name: 'john'
        }
      };
      var result = chat.createOrderMessage(order);
      assert(result);
      assert(result === 'A new order was accepted from Burger King delivering to john for a total of $73.00. View online at https://www.goodybag.com/orders/10');
    });
    
    it('should return error for missing order', function() {
      var result = chat.createOrderMessage(null);
      assert(result);
      assert(result === 'Beep boop, order not found! Initiating self-destruction sequence..');
    });
  });
});

