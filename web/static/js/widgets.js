const timelineUrl = require('../template/widgets/timeline.html');

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
})
.directive('timeline', function() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: timelineUrl,
    link(scope, elem, attrs) {
      scope.from = attrs.from;
      scope.to = attrs.to || 'Present';

      if (!scope.from) { throw 'No from date given.'; }
    }
  };
});
