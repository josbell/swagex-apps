module.exports = {
  name: 'book-class',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/book-class',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
