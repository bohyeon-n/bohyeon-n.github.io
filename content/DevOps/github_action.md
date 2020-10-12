+++
category = DevOps
comments = true
date = "20201012"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = [ "DevOps", "github action", "자동 배포"]
title = "Github Action, AWS CodeDeploy를 사용하여 자동 배포하기!"
description = "Github Action, AWS CodeDeploy를 사용하여 자동 배포를 해보자!"
front = true
+++

'거북이 스터디' 프로젝트를 하면서 수동으로 배포하다가, 공부하면서 지속적으로 업데이트 하려고 배포를 자동화하기로 했다.

Github Action 과 AWS codedeploy 서비스를 사용하여 자동 배포를 한 과정을 정리해보았다.

## CI, CD란?

CI\CD란 무엇일까?

CI는 지속적인 통합(Continuous Integration)을 의미한다. 여러 명의 개발자가 동시에 개발할 때, 코드 작업을 하면 정기적으로 빌드 및 테스트 과정을 거쳐 공유 리포지토리에 통합된다.

CD는 Continuous Delivery\ Continuous Deployment를 의미한다. 변경 사항을 리포지토리에서 고객이 사용 가능한 프로덕션 환경까지 자동으로 릴리즈하는 것을 의미한다.

각자 작업한 코드들을 통합하고(CI), 자동으로 프로덕션 프로그램에 배포한다(CD)

![redhat CI/CD](https://www.redhat.com/cms/managed-files/ci-cd-flow-desktop_1.png)

## 자동 배포 과정

github action과 aws s3, codedeploy를 사용한 배포 과정은 아래와 같다.

1. github repository에 push/pr등을 한다.

2. 설정한 이벤트를 감지하면 github action workflow에 정의한 작업이 실행된다.

3. s3 버킷에 푸시한다.

4. Codedeploy를 사용하여 s3에서 EC2 인스턴스로 배포한다.

5. 배포 후 codedeploy agent가 appspec에 정의한 추가 작업을 실행한다.

## CoDedeploy Agent 설치

CodeDeploy 에이전트는 인스턴스를 CodeDeploy 배포에서 사용할 수 있게 해주는 소프트웨어 패키지이다.

EC2 서버에 들어가서 codedeploy agent를 설치해준다.

```
sudo apt-get update
sudo apt-get install ruby
sudo apt-get install wget
cd /home/ubuntu
wget https://bucket-name.s3.region-identifier.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto
```

bucket name은 버킷 생성 시 설정했던 이름이다. region-identifier는 리전의 식별자이다.

[지역별 리소스 키트 버킷 이름](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/resource-kit.html#resource-kit-bucket-names)을 참고해서 region-identifieㄹ에 넣어주면 된다.

## EC2 IAM 설정

IAM이란 AWS 리소스에 대한 액세스를 안전하게 제어할 수 있는 웹서비스이다.

EC2에서 CodeDeploy 서비스를 사용할 수 있도록 권한을 주어야 한다.

1. IAM 역할 만들기
2. AWSCodeDeployFullAccess, AmazonS3FullAccess 권한을 선택한다.
3. 태그에 Name을 적은 후 역할을 생성한다.
4. EC2 해당 인스턴스의 역할ㅅ 생성한 역할로 바꾼다.

## CodeDeploy IAM 설정

CodeDeploy도 IAM 설정이 필요하다.

똑같이 IAM 역할을 생성해준다.

![iam](https://user-images.githubusercontent.com/36990926/95739440-d1083a00-0cc5-11eb-84d1-416e7c7efb7e.png)

## CodeDeploy

### CodeDeploy란?

CodeDeploy는 모든 AWS 인스턴스에 대한 코드 배포를 자동화하는 서비스다.

![codedeploy](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/images/sds_architecture.png)

### CodeDeploy 생성하기

S3에 업로드한 파일을 배포하기 위해서 CodeDeploy 애플리케이션을 생성한다.

자세한 과정은
[github action과 aws code deploy를 이용하여 spring boot 배포하기(3)](<https://isntyet.github.io/deploy/github-action%EA%B3%BC-aws-code-deploy%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-spring-boot-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0(3)/>)
참고하기!

## S3 버킷 생성하기

S3를 생성 후 s3에 업로드한 파일을 CodeDeploy로 EC2에 배포한다.

## AWS CLI용 IAM user 생성하기

github action workflow에서 s3로 업로드하고 codedeploy를 실행하려면, 이 작업을 하기 위한 IAM User를 생성해야 한다.

1. IAM 사용자 추가
2. access 유형: 프로그래밍 방식 액세스
3. `S3FullAccess`, `CodeDeployFullAccess` 선택하기
4. 생성
5. 생성 후 발급되는 `access-key` 와 `secret-access-key`를 기억해야 한다. workflow 실행할 때 입력해줘야 한다.

## Github Action Workflow

github action은 CI/CD, github에서 제공하는 패키지 관리 및 올인원 자동화 서비스이다. pulbic 저장소는 무료로 이용할 수 있다.

저장소에 Action 탭에 들어가서 workflow를 생성한다.

어떤 이벤트를 설정하고, 이 이벤트가 감지되면, 실행할 job을 설정한다.

```js
# This is a basic workflow to help you get started with Actions

name: gradle CD

# Controls when the action will run. Triggers the workflow on push or pull request
# events but only for the dev branch
on:
  push:
    branches: [ dev ]
  pull_request:
    branches: [ dev ]

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-18.04
    defaults:
      run:
        shell: bash
        working-directory: study-app-server
    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2

      - name: JDK 11 설치
        uses: actions/setup-java@v1
        with:
          java-version: 11.0.8

      - name: ./gradlew 권한 설정
        run: chmod +x ./gradlew

      - name: 빌드
        run: ./gradlew build

      - name: aws 세팅
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-northeast-2

      - name: S3 업로드
        run: aws deploy push --application-name study-app-codedeploy-server --description "study-app server" --s3-location s3://study-codedeploy/server/build.zip --source .

      - name: code deploy
        run: aws deploy create-deployment --application-name study-app-codedeploy-server --deployment-config-name CodeDeployDefault.OneAtATime --deployment-group-name dev --s3-location bucket=study-codedeploy,bundleType=zip,key=server/build.zip

```

## secrets 추가하기

S3 업로드할 때 필요한 키를 입력해줘야 한다.

github setting의 secrets 탭에 필요한 키들을 입력해주면 된다.

## appspec.yml & deploy.sh 추가하기

이제 s3에 업로드하고 ec2로 파일을 옮기는 작업까지 했다.

그 다음에 배포를 위해서 ec2 서버에서 실행해야 할 일들을 정의해야 한다.

### appspec.yml

ec2에 설치했던 CodeDeploy agent에서 appspec.yml 파일을 보고 받아온 파일을 어디에 저장할지 그리고 무엇을 실행할지 정의해 놓을 수 있다.

```
version: 0.0
os: linux

files:
  - source: /
    destination: /home/ubuntu/server
permissions:
  - object: /home/ubuntu/server
    owner: ubuntu
    group: ubuntu
    mode: 755
hooks:
  AfterInstall:
    - location: deploy.sh
      timeout: 60
      runas: root
```

### deploy.sh

CodeDeploy agent는 appspec에서 AfterInstall 훅에 정의해 놓은 deploy.sh 파일을 실행한다.

수동 배포를 할 때는 로컬에서 파일을 빌드한 다음에 EC2로 카피했는데,

자동 배포를 하면서 product 환경 변수를 어떻게 저장할까 하다가, EC2 폴더에 따로 저장하고 실행할 때 가져와서 사용하기로 했다.

```
#!/usr/bin/env bash

REPOSITORY=/home/ubuntu/server
cd $REPOSITORY

APP_NAME=study-app
JAR_NAME=$(ls $REPOSITORY/build/libs/ | grep '.jar' | tail -n 1)
JAR_PATH=$REPOSITORY/build/libs/$JAR_NAME

CURRENT_PID=$(pgrep -f $APP_NAME)

if [ -z "$CURRENT_PID" ]
then
  echo "> 종료할 것 없음." >> /home/ubuntu/deploy.log
else
  echo "> sudo kill -15 $CURRENT_PID" >> /home/ubuntu/deploy.log
  kill -15 "$CURRENT_PID" >> /home/ubuntu/deploy.log 2>&1
  sleep 5
fi

echo "> $JAR_PATH 배포"
nohup java -jar -Dspring.config.location=classpath:/,file:///home/ubuntu/study-app-env/application-prod.properties "$JAR_PATH" >> /home/ubuntu/deploy.log 2>&1 &

echo "[$(date)] server deploy" >> /home/ubuntu/deploy.log

```

## 프론트 배포

프론트 배포도 위 과정과 동일하게 진행했다.

### workflow

```
# This is a basic workflow to help you get started with Actions

name: front CD

# Controls when the action will run. Triggers the workflow on push or pull request
# events but only for the dev branch
on:
  push:
    branches: [ dev, test ]
  pull_request:
    branches: [ dev, test ]

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest
    defaults:
      run:
        shell: bash
        working-directory: study-app
    strategy:
      matrix:
        node-version: [12.x]
    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2

      - name: pwd 확인
        run: pwd

      - name: node.js ${{ matrix.node-version }} 설치
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}

      - name: install npm
        run: npm install

      - name: npm build
        run: npm run build
        env:
          CI: false

      - name: zip 생성
        run: zip -qq -r ./build.zip .
        shell: bash

      - name: aws 설정
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}

      - name: S3 upload
        run: aws deploy push --application-name study-app-codedeploy-server --description "study-app server" --s3-location s3://study-codedeploy/client/build.zip --source .

      - name: code deploy
        run: aws deploy create-deployment --application-name study-app-codedeploy-server --deployment-config-name CodeDeployDefault.OneAtATime --deployment-group-name dev --s3-location bucket=study-codedeploy,bundleType=zip,key=client/build.zip

```

#### CI false로 해야 하는 이유??

빌드할 때 CI 환경 변수가 true이면, 경로를 오류로 처리한다. 린터 실행 결과 경고가 뜨면 빌드가 실패한다.

workflow를 실행할 때 환경 변수를 설정해줄 수 있는데, github에서 CI를 기본적으로 true로 설정하기 때문에 CI를 flase로 설정해야 한다.

### appspec

```
version: 0.0
os: linux

files:
  - source: /
    destination: /home/ubuntu/client

permissions:
  - object: /home/ubuntu/client
    owner: ubuntu
    group: ubuntu
    mode: 755

hooks:
  AfterInstall:
    - location: deploy.sh
      timeout: 60
      runas: root
```

### deploy

프로젝트를 apache로 배포하였는데, 배포 기본 폴더를 /html로 수정해 놓아서 코드를 `home/ubuntu/html/build`로 옮긴 다음에 apache reload 를 한다.

```
#!/usr/bin/env bash

echo "[$(date)] client deploy" >> /home/ubuntu/deploy.log

sudo cp -rf /home/ubuntu/client/build/*  /home/ubuntu/html/build

sudo systemctl reload apache2
```

## 참고 자료

[CI/CD(지속적 통합/지속적 제공): 개념, 방법, 장점, 구현 과정](https://www.redhat.com/ko/topics/devops/what-is-ci-cd)

[Quickstart for GitHub Actions](https://docs.github.com/en/free-pro-team@latest/actions/quickstart)

[CodeDeploy 에이전트](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/codedeploy-agent.html)

[github action과 aws code deploy를 이용하여 spring boot 배포하기 시리즈](<https://isntyet.github.io/deploy/github-action%EA%B3%BC-aws-code-deploy%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-spring-boot-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0(1)/>)

[github action environment-variables](https://docs.github.com/en/free-pro-team@latest/actions/reference/environment-variables)
