pipeline {
    agent any
  
    stages {
        stage('Build') { 
            steps {
                echo 'Building'
                nodejs('npm') {
                    sh 'npm install'
                }
            }
        }
        stage('Test') { 
            steps {
                echo 'Testing'
                nodejs('npm') {
                    sh 'npm run test'
                }
            }
        }
    }

    post {
         success {
            emailext attachLog: true,
                body: "Test status: ${currentBuild.currentResult}",
                recipientProviders: [developers(), requestor()],
                to: 'zychowicz.nikola@gmail.com',
                subject: "Test passed"
        }
        failure {
            emailext attachLog: true,
                body: "${currentBuild.currentResult}",
                recipientProviders: [developers(), requestor()],
                to: 'zychowicz.nikola@gmail.com',
                subject: "Test failed"
        }
    }
}
