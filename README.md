# Angular Bootstrap Stripe Form  v0.0.1
================================

Native AngularJS directive that allows you to safely collect credit card information using Stripe.
This directive is styled by Twitter Bootstrap 3
[![Build Status](https://travis-ci.org/dalelotts/angular-stripe-form.png?branch=master)](https://travis-ci.org/dalelotts/angular-stripe-form)
[![devDependency Status](https://david-dm.org/dalelotts/angular-stripe-form/dev-status.png)](https://david-dm.org/dalelotts/angular-stripe-form#info=devDependencies)

# Didn't want to write this

This project started because Stripe recently (October 2013) recently changed the form for Stripe Checkout.
I was using Stripe Check out to collect credit card information from my customers (I was entering in the data, not the customer),
then the Stripe Checkout form changed (for the better I imagine) to make it more 'Check out' friendly.
As a result, I needed to write my own cusotm credit card form.
Hopefull, Stripe will update their JavaScript library and provide a form for my use case.

#Dependencies

Requires:
 * AngularJS 1.1.3 or higher (1.0.x will not work)
 * bootstrap's dropdown component (`dropdowns.less`)
 * jQuery (Sorry!)
 * jQuery.payment (Stripe's general purpose library for building credit card forms, validating inputs and formatting numbers.)

#Testing
This is not well tested at this time.

We use karma and jshint to ensure the quality of the code. The easiest way to run these checks is to use grunt:

```
npm install -g grunt-cli
npm install
```

The karma task will try to open Chrome as a browser in which to run the tests. Make sure this is available or change the configuration in test\test.config.js

#Usage
We use bower for dependency management. Add

```json
dependencies: {
    "angular-stripe-form": "latest"
}
```

To your bower.json file. Then run

```html
bower install
```

This will copy the angular-stripe-form files into your components folder, along with its dependencies.

Add the css:

```html
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="src/css/stripe-form.css">
```

Load the script files in your application:
```html
    <script type="text/javascript" src="https://js.stripe.com/v2/"></script>
    <script type="text/javascript" src="bower_components/jquery/jquery.js"></script>
    <script type="text/javascript" src="bower_components/jquery.payment/lib/jquery.payment.js"></script>
    <script type="text/javascript" src="bower_components/bootstrap/dist/js/bootstrap.js"></script>
    <script type="text/javascript" src="bower_components/angular/angular.js"></script>
    <script type="text/javascript" src="bower_components/stripe-form/src/js/stripe-form.js"></script>
```

Add the date module as a dependency to your application module:

```html
var myAppModule = angular.module('MyApp', ['ui.bootstrap.stripe-form'])
```

Apply the directive to your form elements:

```html
<stripe-form data-on-cancel="cancelHandler" data-on-create-token="createTokenHandler"></stripe-form>
```