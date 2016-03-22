angular.module('app')
.component('resume', {
  controller() {
    this.components = [];

    this.registerSection = section => {
      this.components.push(section);
    };
  }
})
.component('resumeSection', {
  require: {
    resumeCtrl: '^resume'
  },
  controller($attrs, $element) {
    this.$onInit = () => {
      if (!$attrs.id || !$attrs.displayName) { throw 'No id defined on resume-section.'; }

      this.resumeCtrl.registerSection({
        id: $attrs.id,
        displayName: $attrs.displayName,
        element: $element
      });
    };
  }
})
.component('resumeNav', {
  require: {
    resumeCtrl: '^resume'
  },
  controller() {
    this.$onInit = () => {
      this.sections = this.resumeCtrl.components;
    };
  },
  templateUrl: require('../template/resume/nav.html')
})
.component('resumeNavPane', {
  controller(InkRipple) {
    this.changeTo = ev => {
      InkRipple.attach(this, angular.element(ev.target));
    };
  },
  bindings: {
    section: '<'
  },
  templateUrl: require('../template/resume/pane.html')
});
