module.exports = {
  key: 'log4j2',
  fn: {
    configureProviderPomDependencies (optionalDependencies, props) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'org.springframework.boot' },
          { artifactId: 'spring-boot-starter-log4j2' }
        ]
      })
    }
  }
}
