angular.module('app')
.factory('ResumeSections', function() {
  let sections = [];
  let activeSection = {};

  return {
    sections,
    activeSection,
    registerSection(section) {
      if (section.id in sections) { throw 'Duplicate id found.'; }

      section.active = !sections.length;
      sections.push(section);
    },
    updateSection(section) {
      if (!_.includes(_.map(sections, 'id'), section.id.toString())) { throw 'Id not found.'; }

      if (activeSection.id == section.id) { return; }

      _.each(sections, each_section => {
        each_section.active = false;
      });

      section.active = true;
      _.merge(activeSection, section);
    }
  };
})
.component('resume', {
  transclude: true,
  templateUrl: require('../template/resume/resume.html')
})
.component('resumeSection', {
  templateUrl: require('../template/resume/section.html')
})
.component('resumeSectionPane', {
  controller($attrs, $element, ResumeSections) {
    this.$onInit = () => {
      if (!$attrs.sid || !$attrs.displayName) { throw 'No id defined on resume-section.'; }

      this.section = {
        id: $attrs.sid,
        displayName: $attrs.displayName,
        element: $element
      };

      ResumeSections.registerSection(this.section);

      $element.addClass('resume-section-pane');
    };
  },
  transclude: true,
  templateUrl: require('../template/resume/section_pane.html')
})
.component('resumeNav', {
  controller(ResumeSections) {
    this.sections = ResumeSections.sections;
  },
  templateUrl: require('../template/resume/nav.html')
})
.component('resumeNavPane', {
  controller(ResumeSections) {
    this.changeTo = () => {
      ResumeSections.updateSection(this.section);
    };
  },
  bindings: {
    section: '<'
  },
  templateUrl: require('../template/resume/nav_pane.html')
});
