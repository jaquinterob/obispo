pipeline {
    agent any
    stages {

        stage('npm install') {
            steps {sh 'sudo npm install'}
        } 

        stage('Lint') {
             steps {sh 'sudo npm run ng lint --fix'}
        }

        stage('Build') {
            steps {sh 'sudo ng build --configuration production --base-href=/test/'}
        }
        
        stage('Deploy') {
            steps {sh 'sudo cp -r dist/obispo/* /data/www/html/test/'}
        }
    }
}
