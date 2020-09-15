module.exports = {
  name: 'eys-studio-web',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/eys-studio-web',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
