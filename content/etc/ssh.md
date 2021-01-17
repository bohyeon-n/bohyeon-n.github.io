+++
category = etc
comments = true
date = "20210117"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = [ "github", "ssh", "github 계정"]
title = "여러 github 계정 등록하기 "
description = "여러 github 계정을 등록해보자!"
front = true
+++

# 여러 github 계정 등록하기 

한 대의 컴퓨터에서 여러 github 계정을 사용하고 싶을 때가 있다. 

이 글은 ssh 프로토콜로 두 개의 github 계정을 로컬에 등록하여 사용하는 과정을 정리한 글이다. 실습 환경은 mac OS다. 

## SSH? HTTPS?

github 저장소를 클론하려고 보면 SSH, HTTPS 중 하나를 선택하라고 나온다. 

SSH와 HTTPS는 뭘까? 
SSH와 HTTPS 모두 클라이언트와 서버 사이에 통신을 위한 프로토콜이다.

### ssh? 

SSH 은 Secure Shell로 커넥션을 수립하기 위해서 사용자 username/
password 인증 시스템이 내장되어 있다. 

22번 포트를 사용하여 커넥션을 위한 인증 프로세스를 수행한다. 원격 시스템의 인증은 공개키 암호화를 사용하여 수행되며 필요한 경우 원격 컴퓨터에서 사용자를 인증할 수 있다. 

> 공개키 방식은 하나의 복호화 키를 사용하는 대칭키와 달리, 암호화할 때 공개키를 사용하고 복호화할 때 개인키를 사용한다. 

ssh는 개인 키와 공개키로 알려진 한 쌍의 키로 구성할 수 있다. 

SSH는 공개키 방식으로 커넥션을 수립하는데 자세한 과정은 다음과 같다. 

SSH 서버는 공개키로 암호화하여 챌린지를 생성하고 SSH 클라이언트로 다시 보낸다. 클라이언트는 챌린지를 수행하고 클라이언트의 개인 키로 메시지를 해독한 다음 원래 챌린지를 SSH 서버로 보낸다. 
이 과정이 완료되면 연결이 설정되고 작업을 시작할 수 있다.

### HTTPS 

HTTPS HyperText Transfer Secure 프로토콜로 HTTP의 보안 버전이다. HTTPS는 공개키 암호화 방식과 대칭키 암호화 방식을 함께 사용한다. 인증을 받은 인증서가 있는 사이트는 이 방식을 사용해 암호화하여 통신할 수 있다. 

git에서 HTTPS 프로토콜의 모든 작업에 비밀번호 기반 인증을 사용한다.
명령 줄에서 HTTPS URL을 사용하여 원격 저장소, git fetch, pull, push를 가져오는 경우 git은 사용자 이름과 비밀번호를 요청한다. 

git 서버 공급( github)에게 ssh 키를 생성/복사/붙여넣기 하지 않아도 된다. 어디서든 저장소에 액세스하고 쓰기가 더 쉬우며 계정 세부 정보만 있으면 된다. 

----

### SSH 프로토콜을 사용하여 github 계정 등록하기 

계정을 등록하여 사용하는 방법에는 몇 가지 단계가 있다.

1. ssh keys 생성하기 (공개키, 개인키)
2. github에 공개키 등록하기 
3. ssh key 로컬에 등록하기 
4. SSH config 설정을 통해서 이 SSH 규칙 설정하기 
5. [옵션] gitconfig 설정을 통해서 git 설정해주기 

먼저 공개키와 개인키를 생성하기 전에 기존 SSH 키를 확인한다. 이미 있다면 그 키를 사용하고 없으면 만들면 된다. 

.ssh 는 숨겨진 폴더이기 때문에 `ls -al ~/.ssh`로 확인할 수 있다. 여기에 .pub 확장자 파일이 SSH 키다. 

계정마다 ssh키가 있어야 한다. 개인용과 업무용으로 사용할 계획이라면 SSH 키가 두 개 있어야 하며 없는 경우 생성하면 된다. 

`ls -al ~/.ssh` 명령을 실행한 후 No such file or directory가 표시되면 
`mkdir -p ~/.ssh` 명령을 사용하여 디렉터리를 생성할 수 있다. 

p 플래그는 중첩된 디렉터리를 생성하지만, 아직 존재하지 않은 경우에만 가능하다는 의미다. 

내 경우에는 이렇게 했는데도 블로그와 달리 .ssh 파일에 접근할 수 없어서 파일에 대한 권한을 다시 설정해줬었다. 

`chmod 700 ~/.ssh` 

chmod는 파일 또는 디렉터리의 권한을 설정해주는 명령어인데 700 맨 앞에 7이 오너에 대한 설정으로 read, write, execute 모든 권한을 주기 위해서 각각의 권한을 더한 7로 명령했다. 

### ssh key 생성하기 

다음 명령어로 공개키와 개인키를 생성한다. 

`ssh-keygen -t rsa -C <email>` 

내가 github에서 사용하는 메일 주소는 `goosee115@gmail.com`이므로 

`ssh-keygen -t rsa -C goosee115@gmail.com` 

이렇게 입력하면 

```
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/<current user>/.ssh/id_rsa):
```

이때 각각의 계정을 구별할 수 있는 키 값을 넣어주면 된다. 기본은 id_rsa다. 

예를 들면, `id_rsa_private` `id_rsa_work` 등으로 아무거나 구분할 수 있는 문자를 넣어주면 된다.
입력 후 암호를 입력하라는 메시지가 표시되면 원하는 암호를 아무거나 입력해주면 된다. 

이 암호는 일반적으로 개인 키를 암호화할 때 사용한다. 개인키를 보호하지 않으면 컴퓨터에 접근할 수 있는 사람은 공용키가 있는 원격 서버(github)에 접근할 수 있다. 

### github에 공개키 등록하기 

github에 생성한 두 개의 공개키를 각각의 계정에 로그인해서 등록해준다. 

`cat` 명령어는 파일을 읽고 출력해준다. 이 명령어로 공개키 파일에 있는 키를 복사한 뒤 github에 등록해준다. 

`cat ~/.ssh/id_rsa_private.pub` 

1. github setting에 들어가기 
2. SSH ans GPG Keys 선택 후 
3. New SSH Key 버튼 클릭 후 등록해주기
4. Title은 아무거나 적으면 된다! 

### ssh key 등록하기 

ssh key를 만들었으니 이 키를 사용한다고 알려주기 위해서 ssh-agent에 SSH 키를 등록해줘야 한다. 

`ssh-add ~/.ssh/id_rsa_private` 
`ssh-add ~/.ssh/id_rsa_work` 

### SSH config 파일 생성 후 규칙 추가하기 

git/github 관련 작업을 수행하는 동안 회사계정을 사용할 때와 개인 계정을 사용할 때 SSH에 알리기 위해서 SSH config 규칙을 추가해야 한다. 

`~/.ssh/config`에 파일에 설정을 해주면 된다. 파일 작성은 vim이나 editor를 사용할 수 있다. 

만약 이 파일이 없으면 `touch ~/.ssh/config ` `touch` 명령어로 파일을 만들면 된다. 

```
# work 
Host github.com-work
HostName github.com
User git 
IdentityFile ~/.ssh/id_rsa_work 

# private 
Host github.com-private
HostName github.com
User git 
IdentityFile ~/.ssh/id_rsa_private
```

여기서 Host 값은 나중에 해당 계정을 나타내는 값으로 사용된다. 

#### 확인하기 

이렇게 설정해준뒤에 설정이 잘 된 건지 확인하려면 `ssh -T [host]` 명령어로 연결해볼 수 있다. 

`ssh -T github.com-work` 

`ssh -T github.com-private`

### SSH로 통신하기 

#### clone 

`git clone git@<Host>:bohyeon-n/repository.git` 

예시)
- `git clone git@github.com-private:bohyeon-n/repository.git` 

#### remote 주소 변경 

이미 로컬에 생성된 repository에 remote 주소를 변경해줄 수 있다. 

`git remote set-url origin git@<Host>:bohyeon-n/repository.git`

예시) 
- `git remote set-url origin git@github.com-private:bohyeon-n/repository.git`

#### remote 주소 등록 

로컬에 새 저장소를 추가하는 경우에는 remote 주소를 등록해야 한다. 

`git remote add origin git@<Host>:bohyeon-n/repository.git` 

예시)
- `git remote add origin git@github.com-private:bohyeon-n/repository.git` 

### gitconfig 설정 

프로젝트 별로 설정을 관리하고 싶다면 .gitconfig에서 프로젝트마다 다른 설정 파일을 적용할 수 있다. 

각각의 프로젝트 폴더에 .gitconfig 파일을 정의해서 사용할 수도 있지만 이런 식으로 특정 폴더 하위에 있는 것들은 다른 .gitconfig 파일을 사용할 수 있도록 설정할 수 있다. 

`~/.gitconfig`에 전역 설정을 해준다. 

```
[user]
  email = bohyeon-work@gmail.com
  name = bohyeon-work
[includeIf "gitdir:~/Private"] 
  path = .gitconfig-private
```

`includeIf` 에 directory를 정해주면, 이 디렉터리 하위에 있는 파일들은 path에 지정해준 `gitconfig`를 따른다.

`.gitconfig-private` 파일을 만들어서 다른 계정에 적용할 것들을 설정해주면 된다. 

```
[user]
  email = goosee115@gmail.com
  name = bohyeon-n 
```

#### 확인하기 

gitconfig에서 설정한 것들이 잘 적용되고 있나 확인하고 싶다면 
`git config --list` 명령어를 입력하면 해당 프로젝트의 config를 볼 수 있다. 

### gitconfig에 다 설정해줄 수 없나? => 모르겠음

여기까지 실습을 한 후에 의문이 들었다. 

gitconfig에 remote 주소도 설정해줄 수 없을까? 설정할 때마다 `Host`를 붙여주지 않고 알아서 해주는 건 없나?

위에서처럼 remote주소를 설정하지 않고, gitconfig로 특정 폴더 아래 있는 건 다 알아서 private로 프로파일링할 순 없나 라는 생각으로 시도를 해봤지만

origin도 name과 email처럼 똑같이 설정해줄 순 있지만 내가 원하는 것처럼 자동으로(?) 뭔가를 해주는 방법은 찾지 못했다.  

-----

## 마치며

3주 전에 이 설정하려고 했다가 잘 안 돼서 git credential 설정에 들어가서 해당 계정을 사용할 때 마다 수정하는 고생스러운 짓을 했었다. 

다른 블로그 글을 읽어보니 HTTPS 프로토콜로도 멀티 계정을 설정하는 방법이 있는 것 같다. git credential store를 사용하여 config에 설정할 수 있는 것 같다.(잘 모름)

설정하는 데 시간이 좀 걸렸지만... 아무튼 이제 멀티 계정으로 사용할 수 있어서 기쁘다...! 😎

----

## 참고 자료 

https://dublin-java.tistory.com/62

https://ourtechroom.com/tech/https-vs-ssh-in-git/#:~:text=your%20git%20account.-,Git%20With%20SSH,fetch%20and%20git%20pull%2C%20etc.

https://dev.to/jogendra/how-to-use-multiple-github-accounts-on-single-machine-2me9

https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh

https://kb.iu.edu/d/aews