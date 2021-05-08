pipeline {
	agent any
	
	tools{nodejs "nodejs"}
	
	stages 
	{				
		stage('Test')
		{
			steps
			{
				sh 'npm install'
				sh 'npm run test'
				echo 'Test'
			}
		}
	}		
	post
	{
		success
		{
			emailext attachLog: true,
                		body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
              			recipientProviders: [developers(), requestor()],
              			to: 'zychowicz.nikola@gmail.com',
              			subject: "Success"
		}			
		failure
		{
			emailext attachLog: true,
                		body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                		recipientProviders: [developers(), requestor()],
                		to: 'zychowicz.nikola@gmail.com',
                		subject: "Failed"
		}
	}	
