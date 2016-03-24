angular.module('app')
.directive('delayedEnter', function($animate, $timeout) {
  return {
    restrict: 'A',
    link(scope, elem, attrs) {
      let delay = attrs.delayedEnter || 500;
      let animationLength = attrs.animationLength || 500;

      elem.addClass('ng-hide');

      $timeout(
        () => {
          elem.removeClass('ng-hide');
          $animate.addClass(elem, 'enter');
        },
        delay
      )
      .then(() => $timeout(
        () => $animate.removeClass(elem, 'enter'),
        animationLength
      ));
    }
  };
});
