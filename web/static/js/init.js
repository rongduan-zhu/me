angular.module('app', [
  'ngAnimate', 'ngComponentRouter', 'ngMaterial',
  'resume', 'scroll-trigger'
])
.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
})
.value('$routerRootComponent', 'main')
.component('main', {
  $routeConfig: [
    { path: '/', name: 'Home', component: 'resume', useAsDefault: true },
    { path: '/resume/:section', name: 'Home', component: 'resume' }
  ],
  templateUrl: require('../template/main.html')
});
