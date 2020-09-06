module.exports = {
  name: 'latin-swag-studio-web-home',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/latin-swag-studio-web/home',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
