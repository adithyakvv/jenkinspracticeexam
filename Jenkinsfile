pipeline {
    agent any

    stages {

        // ===================================
        // ===== FRONTEND BUILD STAGE ========
        // ===================================
        stage('Build Frontend') {
            steps {
                // Change directory to our React project
                dir('cricket-react') {
                    // Install dependencies and create the production build
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===================================
        // ===== FRONTEND DEPLOY STAGE =======
        // ===================================
        stage('Deploy Frontend to Tomcat') {
            steps {
                // This is a Windows batch script to copy the build files
                bat '''
                rem --- First, clean up the old deployment ---
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\cricketreact" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\cricketreact"
                )

                rem --- Create a fresh directory and copy the new build ---
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\cricketreact"
                xcopy /E /I /Y cricket-react\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\cricketreact"
                '''
            }
        }

        // ===================================
        // ===== BACKEND BUILD STAGE =========
        // ===================================
        stage('Build Backend') {
            steps {
                // Change directory to our Spring Boot project
                dir('cricket-springboot') {
                    // Use Maven to clean and package the application into a .war file
                    bat 'mvn clean package'
                }
            }
        }

        // ===================================
        // ===== BACKEND DEPLOY STAGE ========
        // ===================================
        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                rem --- First, clean up the old .war file and exploded directory ---
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\cricketteam-api.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\cricketteam-api.war"
                )
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\cricketteam-api" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\cricketteam-api"
                )

                rem --- Copy the new .war file to the Tomcat webapps directory ---
                rem --- FIXED: Changed the filename to match the build output ---
                copy "cricket-springboot\\target\\cricketteam-api.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\"
                '''
            }
        }
    }

    // This block runs at the end of the pipeline
    post {
        success {
            echo 'Deployment Successful! The full stack application has been built and deployed.'
        }
        failure {
            echo 'Pipeline Failed. Please check the console output for errors.'
        }
    }
}