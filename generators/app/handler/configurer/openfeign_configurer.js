module.exports = {
  key: 'openfeign',
  fn: {
    configureProviderPomDependencies (optionalDependencies) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'org.springframework.cloud' },
          { artifactId: 'spring-cloud-starter-openfeign' }
        ]
      })
    },
    configureApplicationYaml (yaml, env) {
    }
  }
}
