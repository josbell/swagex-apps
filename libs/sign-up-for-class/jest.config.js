module.exports = {
  name: 'sign-up-for-class',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/sign-up-for-class',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
