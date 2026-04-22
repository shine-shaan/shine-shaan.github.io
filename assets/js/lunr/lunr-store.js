var store = [{
        "title": "GoLang, Mongo Driver",
        "excerpt":"Python 프로젝트에서 데이터베이스로 Mongo를 주로 이용해 왔다. Go에서도 Mongo 데이터베이스를 이용해보려 한다. Mongo 특징 Mongo는 No-sql 데이터베이스다. sql 데이터베이스(MySQL, Postgre)와 달리 데이터 구조를 명시하고 타입을 지정하지 않고 다양한 형태의 데이터가 저장된다. Mongo 데이터는 document 형태로 저장되는데, 단어 그대로 문서처럼 저장된다는 뜻이다. Mongo document는 BSON, (binary JSON) 타입의 문서인데, java-script 데이터...","categories": ["software"],
        "tags": ["golang","mongo"],
        "url": "/software/golang-mongo-driver/",
        "teaser": null
      },{
        "title": "GoLang, 변수 타입 변환",
        "excerpt":"Go는 정적 타입 언어이므로 변수 선언 후 타입을 변경할 수 없다. 또한, 타입의 변환 또는 반환값에 대한 타입 확인 과정이 다른 언어와 다른 점이 있다. TYPE ASSERTION을 사용하는 경우 interface {} 타입 등의 불명확한 타입인 경우 TYPE CONVERSION을 사용하는 경우 int to string처럼 타입을 변환하는 경우 TYPE ASSERTION (타입 명시)...","categories": ["software"],
        "tags": ["golang"],
        "url": "/software/golang-variable-type-change/",
        "teaser": null
      },{
        "title": "GoLang, Fiber 프레임워크의 POST 메서드",
        "excerpt":"Fiber에서는 HTTP 요청을 수신하고, 응답할 수 있다. 그중 POST 메서드에 대해 다른 프레임워크와 다른 점이 있어 소개한다. (데이터를 직접 조작하지 않고 특정 구조체에 바로 할당하는 방식) Fiber Listen POST Method Fiber App에서 POST Method를 수신하는 방법은 아래와 같다. package main import \"&lt;module path&gt;/handler\" // Fiber app 선언 app := fiber.New()...","categories": ["software"],
        "tags": ["golang","fiber"],
        "url": "/software/golang-fiber-post-method/",
        "teaser": null
      },{
        "title": "GoLang, Fiber 프레임워크",
        "excerpt":"Go 언어로 API 서버를 구현하기 위해서 Fiber라는 프레임워크를 사용한다. 프레임워크 프레임워크(framework)는 특정 목적을 가진 기능을 구현하기 쉽도록 미리 만들어진 함수와 구조체의 모음이다. 대표적인 프레임워크로는 [Java언어의 Spring], [Python언어의 Django], [java script언어의 React] 등이 있다. API API는 서버와 클라이언트 간의 데이터 교환 방식이다. API의 종류에 따라 REST API, SOAP API, GraphQL API...","categories": ["software"],
        "tags": ["golang","fiber"],
        "url": "/software/golang-fiber/",
        "teaser": null
      },{
        "title": "GoLang, bcrypt 비밀번호 보안",
        "excerpt":"웹 서비스를 이용할 때, 비밀번호를 등록해서 로그인 인증을 하는 경우가 많다. 우리가 입력한 비밀번호가 그대로 데이터베이스에 저장된다면 어떤 일이 일어날까? 데이터베이스의 단편적인 정보 유출로 유저 권한을 탈취당한다. 이런 일을 방지하기 위해서 로그인 비밀번호 등의 민감 정보는 암호화하는 과정이 필요하다. HASH 해시는 원본 데이터를 해쉬 함수를 이용해 변환한 결과값을 말한다. 해시는...","categories": ["software"],
        "tags": ["golang","password","secure"],
        "url": "/software/golang-bcrypt/",
        "teaser": null
      },{
        "title": "GoLang, Mongo Index",
        "excerpt":"Mongodb에서 특정 키를 빠르게 조회하기 위해 Index 기능을 사용할 수 있다. Index 기능을 사용하면 특정 키 값을 기준으로 데이터를 조회하는 데에 필요한 연산이 줄어들고, unique option을 이용해 컬렉션 안에서 유일한 값으로 지정할 수 있다. Index Model Index 설정을 위해서 어떤 키를 Index로 사용하는지에 대한 Model을 선언해야 한다. 예시에서는 단일 필드...","categories": ["software"],
        "tags": ["golang","mongo"],
        "url": "/software/golang-mongo-index/",
        "teaser": null
      },{
        "title": "좋은 직장이라는 환상",
        "excerpt":"“대기업, 높은 연봉, 멋진 직함.” 모두가 부러워하는 그곳에 입사한 친구는 왜 1년 만에 퇴사했을까요? ‘대퇴사의 시대’, ‘조용한 퇴직’이라는 말들이 쏟아집니다. 하지만 거창한 단어 뒤에 숨겨진 본질은 어쩌면 아주 간단한 한 문장일지 모릅니다. 이 회사, 나랑 안 맞아요. 우리는 늘 ‘좋은 직장’을 찾아 헤맵니다. 하지만 우리가 ‘좋은 직장’이라고 믿었던 기준들이, 사실은...","categories": ["business"],
        "tags": ["recruiting"],
        "url": "/business/hallucinatioin-of-great-job/",
        "teaser": null
      },{
        "title": "창업을 선택한 이유",
        "excerpt":"사람들과 이야기 중 자주 나오는 질문입니다. 왜 창업했어요? 저는 이 질문에 답하는 방식이 두 가지입니다. 직함과 성과를 중요시하는 상대 흥미와 능력을 중요시하는 상대 서로 다른 유형의 답변에는 모두 거짓은 없지만, 표면적인 이유와 근본적인 이유를 각각 포함합니다. 제가 20살에 창업한 표면적인 이유는 직접 만든 상품을 통해 저와 같은 문제를 가진 사람들에게...","categories": ["business"],
        "tags": ["startup"],
        "url": "/business/reason-of-startup/",
        "teaser": null
      },{
        "title": "마법과 공학, 현상과 이해",
        "excerpt":"요즘 대규모 언어 모델(Gemini, GPT, Claude)을 활용해서 프로그래밍 지식 없이 애플리케이션 서비스를 만들었다는 이야기가 많이 들립니다. 하지만 저의 관점에서 프로그래밍 지식 없이 ‘프로그래밍을 했다’는 말은 근본적인 의문을 품게 합니다. 어떻게 프로그래밍했다는 거지? 인공지능의 발전으로 다양한 지식에 손쉽게 접근하고, 컴퓨터를 이용하는 분야에 대해서는 손쉬운 자동화가 가능하다는 점은 분명 환영하고 활용해야 할...","categories": ["business"],
        "tags": ["ai","service building"],
        "url": "/business/do-not-say-understand-with-generative-ai/",
        "teaser": null
      },{
        "title": "스타트업이 뭐길래?",
        "excerpt":"요즘 사람들이 이야기하는 스타트업은, 제게 의문을 가지게 합니다. 저에게 스타트업은 새로운 방식으로 문제를 해결하는 집단인데, 스타트업을 기사로만 접하는 대중과 스타트업 현업 종사자조차 다르게 생각합니다. 이들에게 스타트업은 투자를 받아 사업하는 기업이며 투자를 잘 받는 스타트업이 잘 나가는 것입니다. 어쩌다가 스타트업의 가치가 투자 금액을 기준으로 삼게 되었는지 모르겠습니다. ‘투자’는 자금을 활용하는 방법입니다....","categories": ["business"],
        "tags": ["startup"],
        "url": "/business/what-is-that-startup/",
        "teaser": null
      },{
        "title": "투자는 서비스 개발에 필요한가?",
        "excerpt":"서비스 개발 단계에서 투자는 필수적인가? 흔히들 스타트업은 투자를 이어가며 기업을 운영하는 방식이 필수적이라고 생각한다. 내 생각에는 ‘필수가 아니다’를 넘어 기피해야 한다는 입장이다. 이전에 투자 유치 플랫폼에 기재한 정보를 통해 한 투자자가 미팅을 요청했다. 인증된 플랫폼을 통한 접근이지만, 해당 투자자는 자신이 밝힌 소속 홈페이지에 정보가 없고 메일 주소 역시 소속과 관계...","categories": ["business"],
        "tags": ["investment","service"],
        "url": "/business/is-investment-necessary-to-service/",
        "teaser": null
      },{
        "title": "양자내성암호와 보안",
        "excerpt":"양자컴퓨터의 개발과 보안의 두려움 양자컴퓨터는 고전컴퓨터와 달리 양자의 중첩을 이용해 동시에 여러 경우를 계산할 수 있는 점이 특징이다. 2개의 비트가 있다면 고전컴퓨터는 [00, 01, 10, 11] 4개의 경우 중 하나를 골라 계산하지만 양자컴퓨터는 4개의 경우를 중첩하여 계산 후 가장 확률이 높은 경우를 골라낸다. 양자의 중첩을 이용해 각 경우를 확률로 존재하는...","categories": ["software"],
        "tags": ["software","secure"],
        "url": "/software/quantum-computer-and-post-quantum-crypto/",
        "teaser": null
      },{
        "title": "블록체인과 스마트 컨트랙트",
        "excerpt":"블록체인 블록체인은 각 데이터 간의 연결고리를 만들어 데이터의 외부 개입에 의한 위변조를 방지하는 기술이다. 외부에서 임의로 기존 데이터 사이에 새로운 데이터를 삽입하거나 기존 데이터를 변조하면 블록체인 규칙에 의해 저장된 검증 데이터가 모두 바뀌기 때문에 검증 시점에서 위변조를 탐지할 수 있다. 작업증명 블록체인의 연결고리 방식 중 작업증명이 있다. 작업증명 방식은 높은...","categories": ["software"],
        "tags": ["software","blockchain"],
        "url": "/software/block-chain-and-smart-contract/",
        "teaser": null
      },{
        "title": "이더리움 L2 네트워크와 ZKsync Era 소개",
        "excerpt":"Ethereum 이더리움은 이전 포스트의 내용처럼 지분 증명 방식을 이용한 블록체인 네트워크다. 이더리움은 작업 증명 방식의 네트워크에 비교했을 때 빠른 블록 생성 속도를 강점으로 가지지만, 대용량 트래픽 환경에서는 한정적인 자원으로 인해 사용자 체감 속도가 원활하지 않을 수 있다. 이더리움 네트워크 안에서 블록을 압축해 기록하는 방식으로 특정 계약의 블록 효율을 높이는 시도가...","categories": ["software"],
        "tags": ["software","blockchain"],
        "url": "/software/introduce-ethereum-layer2-zksync-era/",
        "teaser": null
      },{
        "title": "이더리움 L2 네트워크의 운영 안정성",
        "excerpt":"이더리움 Layer 2 블록 증명 방식 이더리움 Layer 2 네트워크는 각 목적에 따라 Optimistic, Validity 등의 블록 검증 방식을 이용한다. 이전에 소개한 zkSync Era는 Validity 검증 방식 중 boojum 이라는 증명 알고리즘을 이용하는 예시다. 이 글에서는 Layer 2 네트워크의 블록 증명 방식에 따른 운영 안정성을 고려하기 위한 내용을 다룬다. Optimistic...","categories": ["software"],
        "tags": ["software","blockchain"],
        "url": "/software/ethereum-subchain-stability/",
        "teaser": null
      },{
        "title": "기록의 중요성과 유의미한 기록",
        "excerpt":"인간은 이전의 기록을 보고, 간접 경험을 통해 다음 세대가 발전하는 과정을 거쳐왔다. 기록은 현재의 가치를 정리해 미래로 전달하는 방법이다. 기록의 중요성 우리는 다른 사람에게 정보를 전달하기 위해 기록하는 경우가 많다. {보고서, 제안서, 편지, 채팅, 논문, 블로그} 등의 형식을 띠는 기록이 다른 사람에게 정보를 전달하는 목적이다. 스스로 생각을 정리하거나 잊지 않기...","categories": ["lifestyle"],
        "tags": ["history","logging"],
        "url": "/lifestyle/importance-of-history/",
        "teaser": null
      },{
        "title": "이더리움의 계정 추상화, 네이티브 계정 추상화",
        "excerpt":"계정 추상화 계정 추상화는 프로그래밍 함수를 포괄적으로 사용할 수 있도록 기능을 일반화할 때 사용하는 추상화와 같은 의미로 계정을 변환하는 방식을 말한다. 추상 계정은 특정 목적으로 사전 정의되어 있는 기능 외에 상황에 따라 요구하는 추가 기능을 사용할 수 있는 유연한 기능 범위를 가지게 되어 프로그래밍 가능한 계정으로 변화한다. 예를 들면, 자산의...","categories": ["software"],
        "tags": ["software","blockchain"],
        "url": "/software/ethereum-native-acount-abstract/",
        "teaser": null
      }]
