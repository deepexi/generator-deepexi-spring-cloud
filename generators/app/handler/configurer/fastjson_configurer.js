module.exports = {
  key: 'fastjson',
  fn: {
    configureProviderPomDependencies (optionalDependencies, props) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'com.alibaba' },
          { artifactId: 'fastjson' },
          { version: '1.2.62' }
        ]
      })
    }
  }
}
