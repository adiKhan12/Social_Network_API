pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/adiKhan12/Social_Network_API.git'
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
