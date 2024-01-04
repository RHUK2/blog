<!-- todo: 내용 보완 필요 -->

# Node

자바스크립트는 본래 브라우저 환경에서만 동작하는 스크립팅 언어였으나 운영체제 환경에서도 동작 가능하도록 발전했다. 그 결과물이 Node.js이고, Node.js는 자바스크립트 엔진을 기반으로 한 자바스크립트 런타임 환경이며 단일 스레드, 비동기식 이벤트 주도 방식을 기반으로 하는 Non-blocking I/O 모델을 채택하고 있다.

## NPM(Node Package Manager)

NPM은 Node 환경에서 패키지를 관리해주는 패키지 매니저이다.

### package.json

`package.json`은 Node 프로젝트의 구성 파일로 프로젝트에 대한 정보 및 종속성을 정의하는데 사용된다.

#### main

`main` 속성은 `String` 값으로 Node 프로젝트가 어떤 모듈(라이브러리)로 제작되는 경우에, 해당 모듈의 진입점에 해당하는 파일을 입력하는 것으로 사용된다.

#### private

`private` 속성은 `Boolean` 값으로, 프로젝트의 공개여부를 나타낸다. 기본값은 `false`로 공개 상태로 되어있다.

#### scripts

`scripts` 속성은 `String` 값으로 Node 프로젝트 내에서 실행 가능한 커맨드 명령어를 정의한다. 쉘 스크립트와 유사한 개념이며 아래와 같이 몇 가지 차이점이 있다.

- 쉘 스크립트는 운영체제의 쉘에서 실행되지만, `scripts` 속성은 Node 환경에서 실행된다. 즉, Node 환경의 내장된 스크립팅 기능과 npm 패키지 관리자의 기능을 활용할 수 있다.
- 쉘 스크립트는 쉘 문법과 쉘 명령어를 혼합해 사용한다. `scripts` 속성은 보통 쉘 명령어를 직접 사용하기보다 패키지 이름과 옵션을 명시해서 사용하는 경우가 일반적이다.

#### dependencies

런타임 시 필요한 패키지들

#### devDependencies

개발과정에서만 필요한 패키지들, 대표적으로 포맷팅, 번들러, 바벨, 테스트툴, 타입스크립트가 해당된다.

#### workspaces

npm workspace는 종속성 관리지 설정 파일 관리는 아님

## PM2 무중단 배포

정적 호스팅은 번들링 파일 바뀌면 브라우저에서 캐싱되서 무중단 배포처럼 보임

서버 어플리케이션은 내용이 바뀌면 pm2로 무중단 서비스 배포가 필요

## scriptssss

package.json 파일의 "scripts" 섹션에서는 기본적으로 Node.js 자바스크립트 코드를 직접 실행할 수는 없습니다. "scripts"는 주로 명령어 라인 명령을 실행하는 데 사용됩니다. 그러나 package.json 파일 내부에서 직접 JavaScript 코드를 실행할 수 있는 기능은 제공되지 않습니다.

만약 파일 시스템을 조작하려면, 해당 조작을 수행하는 별도의 Node.js 스크립트 파일을 만들고, "scripts"에서는 이를 호출하는 방식을 사용할 수 있습니다. 예를 들어, 다음과 같이 scripts 섹션에 node 명령어를 사용하여 특정 스크립트 파일을 실행하는 방식입니다.

json
Copy code
{
"scripts": {
"custom-script": "node my-script.js"
}
}
그리고 my-script.js 파일 내에서 필요한 파일 시스템 조작을 수행할 수 있습니다.

javascript
Copy code
// my-script.js
const fs = require('fs');

fs.writeFileSync('output.txt', 'Hello, World!');
console.log('File written successfully.');
이후, npm run custom-script 명령어를 사용하여 "custom-script"를 실행하면, 해당 스크립트 파일이 실행되고 파일 시스템 조작이 이루어집니다.

요약하면, "scripts"에서 직접 Node.js 코드를 실행하는 것은 불가능하지만, 별도의 JavaScript 파일을 실행하고 그 파일 내에서 필요한 작업을 수행할 수 있습니다.

User
package.json에서 사용하는 scripts는 쉘 스크립트와 동일하다고 봐도 되지?
ChatGPT
package.json 파일의 "scripts"는 일반적으로 쉘 스크립트와 유사한 기능을 합니다. "scripts" 섹션에서 정의한 명령어들은 주로 터미널 또는 명령 프롬프트에서 실행되는 쉘 명령어들입니다. 이 명령어들은 npm을 통해 실행될 때, npm 스크립트가 내부적으로 해당 명령어를 실행하는 것이 일반적입니다.

예를 들어:

json
Copy code
{
"scripts": {
"start": "node server.js",
"build": "webpack",
"test": "mocha"
}
}
위의 예제에서 "start", "build", "test"는 각각 node server.js, webpack, mocha 명령어를 실행하는데, 이는 일반적인 쉘 명령어와 유사한 구조를 갖고 있습니다.

그러나 "scripts" 섹션은 완전한 쉘 스크립트가 아니며, npm에서 실행할 수 있는 특별한 형식의 명령어를 정의하는 용도로 사용됩니다. 예를 들어, npm에서는 cross-platform 호환성을 유지하기 위해 특별한 환경 변수와 스크립트 실행 방식을 제공합니다.

쉘 스크립트와 npm "scripts" 간에는 몇 가지 차이가 있지만, 기본적으로 "scripts" 섹션은 터미널에서 실행되는 명령어를 정의하는 용도로 사용되며, 이는 쉘 스크립트와 비슷한 동작을 합니다.
