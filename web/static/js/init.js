angular.module('app', ['ngMaterial', 'scroll-trigger'])
.factory('InkRipple', function($mdInkRipple) {
  return {
    attach(scope, element, options) {
      return $mdInkRipple.attach(scope, element, angular.extend({
        center: false,
        dimBackground: true
      }, options));
    }
  };
});
