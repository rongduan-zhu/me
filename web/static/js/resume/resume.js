angular.module('resume', [])
.factory('ResumeSections', function($location) {
  let sections = [];
  let activeSection = {};

  return {
    sections,
    activeSection,
    registerSection(section) {
      if (_.includes(_.map(sections, 'id'), section.id)) { throw 'Duplicate id found.'; }
      if (_.includes(_.map(sections, 'url'), section.url)) { throw 'Duplicate url found.'; }

      section.active = $location.path() == section.url;
      sections.push(section);
    },
    updateActive(id) {
      if (!_.includes(_.map(sections, 'id'), id)) { throw 'Id not found.'; }

      if (activeSection.id == id) { return; }

      _.each(sections, section => {
        section.active = false;

        if (section.id == id) {
          section.active = true;
          _.merge(activeSection, section);
        }
      });
    }
  };
})
.component('resume', {
  transclude: true,
  templateUrl: require('../../template/resume/resume.html'),
  controller($element) {
    $element.addClass('resume');
    $element.attr('layout', 'column');
    $element.attr('layout-align', 'start stretch');

    this.$routerCanReuse = () => true;
  }
})
.component('resumeSection', {
  templateUrl: require('../../template/resume/section.html')
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
  templateUrl: require('../../template/resume/section_pane.html')
})
.component('resumeNav', {
  controller(ResumeSections) {
    this.sections = ResumeSections.sections;
  },
  templateUrl: require('../../template/resume/nav.html')
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
  templateUrl: require('../../template/resume/nav_pane.html')
});
