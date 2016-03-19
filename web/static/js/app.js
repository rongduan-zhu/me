require('./socket.js');

import "phoenix_html";

angular.module('app', [])
.component('app', {
  template: '<div>Rongduan said hi {{ $ctrl.secondsPast }} seconds ago.</div>',
  controller($interval) {
    this.secondsPast = 0;

    $interval(() => this.secondsPast++, 1000);
  }
});
