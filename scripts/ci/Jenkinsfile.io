properties(
    [
        buildDiscarder(
            logRotator(
                numToKeepStr: '10'
            )
        ),
        disableConcurrentBuilds()
    ]
)
// change node back to node ('') for recent version, legacy for old
node ('legacy') {
    stage ('Checkout') {
        if(env.BRANCH_NAME == 'acceptance') {
            git url: 'git@gitlab.devops.geointservices.io:dgs1sdt/fritz.git', branch: 'acceptance', credentialsId: '0059b60b-fe05-4857-acda-41ada14d0c52', poll: true
        } else if (env.BRANCH_NAME == 'master') {
            git url: 'git@gitlab.devops.geointservices.io:dgs1sdt/fritz.git', branch: 'master', credentialsId: '0059b60b-fe05-4857-acda-41ada14d0c52', poll: true
        }
    }

    stage ('Test & Build') {
        sh """
        docker pull dgs1sdt/fritz:test

        docker stop Fritz || true && docker rm Fritz || true

        docker run --name Fritz -v `pwd`:/app -itd dgs1sdt/fritz:test

        docker exec Fritz /bin/bash -c "/app/scripts/tests.sh"
        """
    }

    stage ('Fortify') {
       sh '/opt/hp_fortify_sca/bin/sourceanalyzer -64 -verbose -Xms2G -Xmx10G -b ${BUILD_NUMBER} -clean'
       sh '/opt/hp_fortify_sca/bin/sourceanalyzer -64 -verbose -Xms2G -Xmx10G -b ${BUILD_NUMBER} "**/*" -exclude "client/node_modules/**/*" -exclude "client/build/**/*" -exclude ".mvn/**/*" -exclude "target/**/*" -exclude "src/main/resources/static/**/*" -exclude "acceptance/node_modules/**/*" -exclude "**/squashfs-root/**/*"'
       sh '/opt/hp_fortify_sca/bin/sourceanalyzer -64 -verbose -Xms2G -Xmx10G -b ${BUILD_NUMBER} -scan -f fortifyResults-${BUILD_NUMBER}.fpr'
    }

    if(env.BRANCH_NAME == 'acceptance') {
        stage ('Deploy NGA') {
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: '8e717287-708e-440f-8fa8-17497eac5efb', passwordVariable: 'PCFPass', usernameVariable: 'PCFUser']]) {
                withEnv(["CF_HOME=${pwd()}"]) {
                    sh "cf login -a api.system.dev.east.paas.geointservices.io -u $PCFUser -p $PCFPass -o DGS1SDT -s 'Fritz'"
                    sh "cf push -f ./manifest-acceptance.yml"
                }
            }
        }
        stage ('Deploy VI2E') {
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'ff9fca26-b34c-42e2-bad9-c3cfa5722489', passwordVariable: 'pass', usernameVariable: 'user']]) {
            withEnv(["CF_HOME=${pwd()}"]) {
             sh "cf login -a api.system.vi2e.io -u $user -p $pass -o Lab-1 -s 'Fritz' --skip-ssl-validation"
             sh "cf push -f ./manifest-acceptance.yml"
            }
          }
        }
    } else if(env.BRANCH_NAME == 'master') {
        stage ('Deploy NGA') {
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: '8e717287-708e-440f-8fa8-17497eac5efb', passwordVariable: 'PCFPass', usernameVariable: 'PCFUser']]) {
                withEnv(["CF_HOME=${pwd()}"]) {
                    sh "cf login -a api.system.dev.east.paas.geointservices.io -u $PCFUser -p $PCFPass -o DGS1SDT -s 'Fritz'"
                    sh "cf push -f ./manifest.yml"
                }
            }
        }
        stage ('Deploy VI2E') {
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'ff9fca26-b34c-42e2-bad9-c3cfa5722489', passwordVariable: 'pass', usernameVariable: 'user']]) {
                withEnv(["CF_HOME=${pwd()}"]) {
                    sh "cf login -a api.system.vi2e.io -u $user -p $pass -o Lab-1 -s 'Fritz' --skip-ssl-validation"
                    sh "cf push -f ./manifest.yml"
                }
            }
        }
    }
}