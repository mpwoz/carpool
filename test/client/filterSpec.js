'use strict';

/**
  Filter Unit Tests
*/
describe('myApp.filters', function() {
  beforeEach(module('myApp.filters'));

  /**
    maxPrice Filter Tests
  */
  describe('maxPrice', function() {

    var rides = [{seatPrice: 10}, {seatPrice: 20}, {seatPrice: 30}, {seatPrice: 40}, {seatPrice: 50}, {seatPrice: 60}];

    it('should show rides with prices below max price', function() {
      inject(function(maxPriceFilter) {
        expect(maxPriceFilter(rides, {seatPrice: 20}).length).toBe(2);
        expect(maxPriceFilter(rides, {seatPrice: 80}).length).toBe(6);
        expect(maxPriceFilter(rides, {seatPrice: 0}).length).toBe(6);
      });
    })
  });

});