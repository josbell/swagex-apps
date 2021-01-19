module.exports = {
  name: 'space-picker',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/space-picker',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
