module.exports = {
  name: 'latin-swag-studio-web',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/latin-swag-studio-web',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
