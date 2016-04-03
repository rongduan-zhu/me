angular.module('resume', [])
.factory('ResumeSections', function($location) {
  let sections = [];
  let activeSection = {};
  let callbacks = [];

  let updateActive = id => {
    if (!_.includes(_.map(sections, 'id'), id)) { throw 'Id not found.'; }

    if (activeSection.id == id) { return; }

    _.each(sections, section => {
      section.active = false;

      if (section.id == id) {
        section.active = true;
        _.merge(activeSection, section);
      }
    });
  };

  return {
    sections,
    activeSection,
    activeHome() {
      let section = _.find(sections, { url: '/' });

      if (section) {
        updateActive(section.id);
      } else {
        throw 'No home path found';
      }
    },
    complete() {
      _.each(callbacks, callback => callback.call(null, sections));
    },
    registerSection(section) {
      if (_.includes(_.map(sections, 'id'), section.id)) { throw 'Duplicate id found.'; }
      if (_.includes(_.map(sections, 'url'), section.url)) { throw 'Duplicate url found.'; }

      section.active = $location.path() == section.url;
      sections.push(section);
    },
    updateActive,
    registerOnCompleteCallback(func) {
      callbacks.push(func);
    }
  };
})
.component('resume', {
  bindings: { $router: '<' },
  transclude: true,
  templateUrl: require('../../template/resume/resume.html'),
  controller($element, NotFoundPath, ResumeSections) {
    $element.addClass('resume');
    $element.attr('layout', 'column');
    $element.attr('layout-align', 'start stretch');

    let routeChange = route => {
      let component = route.urlPath.split('/').pop();
      let $router = this.$router;

      return sections => {
        let newSection = _.find(sections, section => section.url.split('/').pop() == component);

        if (newSection) {
          ResumeSections.updateActive(newSection.id);
        } else {
          $router.navigate([NotFoundPath.name]);
          ResumeSections.activeHome();
        }
      };
    };

    this.$routerCanReuse = () => true;

    this.$routerOnActivate = route => {
      ResumeSections.registerOnCompleteCallback(routeChange(route));
    };
    this.$routerOnReuse = route => {
      routeChange(route)(ResumeSections.sections);
    };
  }
})
.component('resumeSection', {
  templateUrl: require('../../template/resume/section')
})
.component('resumeSectionPane', {
  controller($attrs, $element, ResumeSections) {
    this.$onInit = () => {
      if (!$attrs.sid || !$attrs.displayName) { throw 'No id defined on resume-section.'; }

      let url = $attrs.url || '/';

      this.section = {
        id: $attrs.sid,
        displayName: $attrs.displayName,
        url,
        element: $element
      };

      ResumeSections.registerSection(this.section);

      $element.addClass('resume-section-pane');
    };
  },
  transclude: true,
  templateUrl: require('../../template/resume/section_pane')
})
.directive('last', function(ResumeSections) {
  return {
    require: '^resumeSectionPane',
    link() {
      ResumeSections.complete();
    }
  };
})
.component('resumeNav', {
  controller(ResumeSections) {
    this.sections = ResumeSections.sections;
  },
  templateUrl: require('../../template/resume/nav')
})
.component('resumeNavPane', {
  controller($location, ResumeSections) {
    this.changeTo = () => {
      ResumeSections.updateActive(this.section.id);
      $location.path(this.section.url);
    };
  },
  bindings: {
    section: '<'
  },
  templateUrl: require('../../template/resume/nav_pane')
});
