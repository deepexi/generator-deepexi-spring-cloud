module.exports = {
  key: 'websocket',
  fn: {
    configureProviderPomDependencies (optionalDependencies) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'org.springframework.boot' },
          { artifactId: 'spring-boot-starter-websocket' }
        ]
      })
    }
  }
}
