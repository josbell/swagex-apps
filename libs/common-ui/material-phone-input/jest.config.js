module.exports = {
  name: 'common-ui-material-phone-input',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/common-ui/material-phone-input',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
