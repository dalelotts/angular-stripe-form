/*globals $, angular, alert, Stripe, jQuery */

var app = angular.module('stripeFormDemo', ['ui.bootstrap.stripe-form'])
  .config(function () {
    //noinspection JSUnresolvedFunction,JSUnresolvedVariable
    Stripe.setPublishableKey('pk_test_wyD5tYXWpBLQ5pdCMN6JsRvX');
  });

app.controller(
  "stripeFormController",
  function ($scope) {
    'use strict';

    $scope.tokens = [];

    $scope.cancelHandler = function () {
      $('#creditCardModal').modal('toggle');
      $scope.tokens.push('Cancelled!!');
    };

    $scope.createTokenHandler = function (code, body) {
      $('#creditCardModal').modal('toggle');
      if (code !== 200) {
        alert("ERROR: " + code + " " + angular.toJson(body));
      } else {
        $scope.$apply(function () {
          $scope.tokens.push(body);
        });
      }
    };
  }
);