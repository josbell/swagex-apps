module.exports = {
  name: 'eys-dance-studio-web',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/eys-dance-studio-web',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
