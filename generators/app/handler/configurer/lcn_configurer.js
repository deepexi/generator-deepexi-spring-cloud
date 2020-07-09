module.exports = {
  key: 'lcn',
  fn: {
    configureProviderPomDependencies (optionalDependencies) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'com.codingapi.txlcn' },
          { artifactId: 'txlcn-tc' },
          { version: '5.0.2.RELEASE' }
        ]
      });
      optionalDependencies.push({
        dependency: [
          { groupId: 'com.codingapi.txlcn' },
          { artifactId: 'txlcn-txmsg-netty' },
          { version: '5.0.2.RELEASE' }
        ]
      })
    }
  }
};
