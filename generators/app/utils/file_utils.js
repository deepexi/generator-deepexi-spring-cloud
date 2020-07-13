module.exports = {

  isBootstrapYaml (name) {
    return /(^|\\|\/)bootstrap\..*\.?ya?ml/.test(name);
  },

  extractApplicationYamlEnv (name) {
    const result = /application(-(\w+))?.*\.ya?ml/.exec(name);
    if (result) {
      const env = result[2];
      return env || 'default';
    }
    return 'unknown';
  }
}
