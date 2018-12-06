pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        slackSend(message: 'hey', channel: 'backend_builds')
      }
    }
  }
}