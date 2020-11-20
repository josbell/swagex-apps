module.exports = {
  name: 'common-ui-class-list',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/common-ui/class-list',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
