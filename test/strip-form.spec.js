/*globals describe, beforeEach, it, input, expect, module, inject, jQuery, moment */

/**
 * @license angular-stripe-form
 * (c) 2013 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author        Dale "Ducky" Lotts
 *    @since        11/8/2013
 */
describe('stripe-forms', function () {
  'use strict';

  var $rootScope, $compile, $element;

  beforeEach(module('ui.bootstrap.stripe-form'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $element = $compile('<stripe-form></stripe-form>')($rootScope);
    $rootScope.$digest();
  }));

  describe('html contains', function () {

    it('div', function () {
      expect($element.prop('tagName')).toBe('DIV');
    });

    it('div contains one form', function () {
      var element = $compile('<stripe-form></stripe-form>')($rootScope);
      expect(element.find('form').length).toBe(1);
    });
    it('div contains four input elements', function () {
      var element = $compile('<stripe-form></stripe-form>')($rootScope);
      expect(element.find('input').length).toBe(4);
    });
    it('div contains four label elements', function () {
      var element = $compile('<stripe-form></stripe-form>')($rootScope);
      expect(element.find('label').length).toBe(4);
    });
  });
});