/*globals $, angular, Stripe, jQuery */
/*jslint vars:true */

/**
 * @license angular-stripe-form  v0.0.1
 * (c) 2013 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author        Dale "Ducky" Lotts
 *    @since        2013-11-10
 */

var stripeFormModule = angular.module('ui.bootstrap.stripe-form', []);

stripeFormModule.directive('stripeForm', [ function () {
  "use strict";

  return {
    restrict: 'E',
    replace: true,
    scope: {
      onCancel: '=',
      onCreateToken: '='
    },
    template: "<div class='stripe-form'>" +
      "   <form name='stripeForm' class='form' data-ng-submit='submitCreditCard()'>" +
      "     <div class='row'>" +
      "       <div class='form-group col-xs-8'>" +
      "         <label>Card Number</label>" +
      "         <input type='tel' class='form-control stripe-card-number' data-placeholder='Card number' required data-ng-model='card.number'>" +
      "       </div>" +
      "      <div class='form-group col-xs-4'>" +
      "         <label>Card code</label>" +
      "         <input class='form-control stripe-cvc' data-placeholder='CVC' required data-ng-model='card.cvc'>" +
      "       </div>" +
      "     </div>" +
      "     <div class='row'>" +
      "       <div class='form-group col-xs-8'>" +
      "         <label>Name on Card</label>" +
      "         <input class='form-control stripe-name-on-card' required data-ng-model='card.name'>" +
      "       </div>" +
      "       <div class='form-group col-xs-4'>" +
      "         <label>Expires</label>" +
      "         <input class='form-control stripe-card-expiry' data-placeholder='MM / YYYY' required data-ng-model='card.expiry'>" +
      "       </div>" +
      "     </div>" +
      "       <button class='btn btn-default' type='button' tabindex='-1' data-ng-click='cancel()'><i class='glyphicon glyphicon-remove'></i>&nbsp;Cancel</button>" +
      "       <button class='btn btn-primary' type='submit' data-ng-disabled='stripeForm.$invalid'><i class='glyphicon glyphicon-ok'></i>&nbsp;Submit</button>" +
      " </form>" +
      "</div>",
    link: function (scope, element) {

      $('input.stripe-card-expiry', element).payment('formatCardExpiry');

      scope.cancel = function () {
        if (angular.isFunction(scope.onCancel)) {
          scope.onCancel();
        }
      };

      scope.submitCreditCard = function () {

        //noinspection JSUnresolvedVariable
        var cardData = angular.extend({}, scope.card);

        //noinspection JSUnresolvedVariable
        var expiry = $.payment.cardExpiryVal(cardData.expiry);

        cardData.exp_month = expiry.month;
        cardData.exp_year = expiry.year;

        //noinspection JSUnresolvedVariable
        delete cardData.expiry;

        if (angular.isFunction(scope.onCreateToken)) {
          //noinspection JSUnresolvedFunction,JSUnresolvedVariable
          Stripe.card.createToken(cardData, scope.onCreateToken);
        }

        //noinspection JSUnresolvedVariable
        delete scope.card;

        // The following is required because resetting the form does not remove the card type class
        $('input.stripe-card-number', element).removeClass('amex');
        $('input.stripe-card-number', element).removeClass('diners');
        $('input.stripe-card-number', element).removeClass('discover');
        $('input.stripe-card-number', element).removeClass('jcb');
        $('input.stripe-card-number', element).removeClass('mastercard');
        $('input.stripe-card-number', element).removeClass('visa');
        //noinspection JSUnresolvedVariable
        scope.stripeForm.$setPristine();
      };
    }
  };
}]);

stripeFormModule.directive('stripeCardNumber', [ function () {
  "use strict";

  return {
    restrict: 'C',
    require: 'ngModel',
    scope: {
      ngModel: '='
    },
    link: function (scope, element, attrs, controller) {
      $(element).payment('formatCardNumber');

      var validateFn = function (viewValue) {
        var valid = viewValue === undefined ? false : $.payment.validateCardNumber(viewValue);
        controller.$setValidity(attrs.ngModel, valid);
        return viewValue;
      };
      controller.$parsers.unshift(validateFn);
    }
  };
}]);

stripeFormModule.directive('stripeCvc', [ function () {
  "use strict";

  return {
    restrict: 'C',
    require: 'ngModel',
    scope: {
      ngModel: '='
    },
    link: function (scope, element, attrs, controller) {
      $(element).payment('formatCardCVC');

      var validateFn = function (viewValue) {
        var valid = viewValue === undefined ? false : $.payment.validateCardCVC(viewValue);
        controller.$setValidity(attrs.ngModel, valid);
        return viewValue;
      };
      controller.$parsers.unshift(validateFn);
    }
  };
}]);

stripeFormModule.directive('stripeCardExpiry', [ function () {
  "use strict";

  return {
    restrict: 'C',
    require: 'ngModel',
    scope: {
      ngModel: '='
    },
    link: function (scope, element, attrs, controller) {
      $(element).payment('formatCardExpiry');

      var validateFn = function (viewValue) {
        var valid = false;

        if (viewValue !== undefined) {
          var expiryValue = $.payment.cardExpiryVal(viewValue);
          valid = $.payment.validateCardExpiry(expiryValue.month, expiryValue.year);
        }

        controller.$setValidity(attrs.ngModel, valid);
        return viewValue;
      };
      controller.$parsers.unshift(validateFn);
    }
  };
}]);
