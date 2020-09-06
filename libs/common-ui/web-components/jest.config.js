module.exports = {
  name: 'common-ui-web-components',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/common-ui/web-components',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
