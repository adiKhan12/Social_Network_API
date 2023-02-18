pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/example-user/example-project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Linting') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Testing') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Publish') {
            steps {
                sh 'npm publish'
            }
        }

        stage('Deployment') {
            steps {
                // deploy built code to server or cloud provider
            }
        }
    }
}
