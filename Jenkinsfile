pipeline {
    agent any

    // Define the Tomcat installation path as a variable for easy management.
    // This makes it simpler to update if you move Tomcat or use a different version.
    environment {
        TOMCAT_HOME = "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1"
    }

    stages {

        // ===================================
        // ===== FRONTEND BUILD STAGE ========
        // ===================================
        stage('Build Frontend') {
            steps {
                // Run npm commands in the root of the workspace, where package.json is located.
                echo 'Starting frontend build...'
                bat 'npm install'
                bat 'npm run build'
                echo 'Frontend build completed.'
            }
        }

        // ===================================
        // ===== FRONTEND DEPLOY STAGE =======
        // ===================================
        stage('Deploy Frontend to Tomcat') {
            steps {
                echo 'Deploying frontend to Tomcat...'
                bat '''
                rem --- First, remove the old deployment directory to ensure a clean deploy ---
                if exist "%TOMCAT_HOME%\\webapps\\cricketreact" (
                    echo "Removing old frontend directory..."
                    rmdir /S /Q "%TOMCAT_HOME%\\webapps\\cricketreact"
                )

                rem --- Create a fresh directory for the new build ---
                echo "Creating new frontend directory..."
                mkdir "%TOMCAT_HOME%\\webapps\\cricketreact"

                rem --- Copy the new build output from the 'dist' folder ---
                rem --- CORRECTED: The source path is now 'dist', not 'cricket-react\\dist' ---
                echo "Copying new frontend build files..."
                xcopy /E /I /Y "dist\\*" "%TOMCAT_HOME%\\webapps\\cricketreact"
                '''
                echo 'Frontend deployment finished.'
            }
        }

        // ===================================
        // ===== BACKEND BUILD STAGE =========
        // ===================================
        stage('Build Backend') {
            steps {
                // Change directory into the Spring Boot project folder.
                dir('cricket-springboot') {
                    echo 'Starting backend build with Maven...'
                    // Use Maven to clean the project and package it into a .war file.
                    bat 'mvn clean package'
                    echo 'Backend build completed.'
                }
            }
        }

        // ===================================
        // ===== BACKEND DEPLOY STAGE ========
        // ===================================
        stage('Deploy Backend to Tomcat') {
            steps {
                echo 'Deploying backend to Tomcat...'
                bat '''
                rem --- Remove the old .war file and its exploded directory ---
                if exist "%TOMCAT_HOME%\\webapps\\cricketteam-api.war" (
                    echo "Deleting old cricketteam-api.war..."
                    del /Q "%TOMCAT_HOME%\\webapps\\cricketteam-api.war"
                )
                if exist "%TOMCAT_HOME%\\webapps\\cricketteam-api" (
                    echo "Removing old exploded backend directory..."
                    rmdir /S /Q "%TOMCAT_HOME%\\webapps\\cricketteam-api"
                )

                rem --- Copy the newly built .war file to the Tomcat webapps directory ---
                echo "Copying new cricketteam-api.war to Tomcat..."
                copy "cricket-springboot\\target\\cricketteam-api.war" "%TOMCAT_HOME%\\webapps\\"
                '''
                echo 'Backend deployment finished.'
            }
        }
    }

    // The 'post' block runs after all stages are completed.
    post {
        // This runs only if the entire pipeline succeeds.
        success {
            echo 'Deployment Successful! The full stack application has been built and deployed.'
        }
        // This runs only if any stage in the pipeline fails.
        failure {
            echo 'Pipeline Failed. Please check the console output for errors.'
        }
    }
}