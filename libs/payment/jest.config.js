module.exports = {
  name: 'payment',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/payment',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
