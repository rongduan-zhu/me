angular.module('app', [
  'ngAnimate', 'ngComponentRouter', 'ngMaterial',
  'resume', 'scroll-trigger'
])
.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
})
.constant('NotFoundPath', { name: 'Home', path: '/' })
.value('$routerRootComponent', 'main')
.component('main', {
  $routeConfig: [
    { path: '/', name: 'Home', component: 'resume', useAsDefault: true },
    { path: '/resume/:section', name: 'Resume', component: 'resume' }
  ],
  templateUrl: require('../template/main.html')
});
