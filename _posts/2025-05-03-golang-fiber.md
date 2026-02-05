---
title: GoLang, Fiber 프레임워크
layout: single
category: software
tags: ["golang","fiber"]
---

Go 언어로 API 서버를 구현하기 위해서 Fiber라는 프레임워크를 사용한다.

<br/>

# 프레임워크
프레임워크(framework)는 특정 목적을 가진 기능을 구현하기 쉽도록 미리 만들어진 함수와 구조체의 모음이다.

대표적인 프레임워크로는 [Java언어의 Spring], [Python언어의 Django], [java script언어의 React] 등이 있다.
<br/>

# API
API는 서버와 클라이언트 간의 데이터 교환 방식이다.

API의 종류에 따라 REST API, SOAP API, GraphQL API 등이 있다.

이 중 내가 구현하는 것은 REST API다.

REST API는 별도의 설정 없이 HTTP 요청으로 데이터를 주고받을 수 있다는 장점이 있다.
<br/>

# Fiber
fiber는 Go서버에서 HTTP 요청을 처리하기 위한 프레임워크다.

Go에서 사용할 수 있는 다른 프레임워크로 gin, echo, fasthttp 등이 있지만 서비스 확장성에 대한 장점이 있는 fiber를 사용한다.

https://gofiber.io/
<br/>


# Fiber app init
fiber를 이용하기 위해서 main.go 파일에서 초기화 및 선언이 필요하다.

```
func main() {
// 앱 객체 선언 및 할당
app := fiber.New(fiber.Config {AppName: <app name>})

// 로깅 미들웨어 사용 설정
app.Use(logger.New(logger.ConfigDefault))

// 라우터 등록
app.Get("/", func(c fiber.Ctx) error {
return c.SendString("Hello! Here is go api server!")
})

// 라우터 그룹을 이용한 등록
router.SetupApiRoutes(app)

// 서버 실행 및 포트 지정
app.Listen(":8888")
}

func SetupApiRoutes(app *fiber.App) {
// 라우터 그룹 설정
apiGroup := app.Group("/api")

// 라우터 등록 ("" 으로 설정된 경우 그룹의 최상단을 의미한다.)
// 여기에서 사용한 "apiGroup.Get"은 Get 메서드로 요청한 데이터를 해당 라우터에서 처리한다는 의미다.
apiGroup.Get("", func(c fiber.Ctx) error { return c.JSON("api route called") })
}
```
<br/>

# Fiber request listen
fiber를 이용해서 클라이언트 요청을 받고, 데이터를 처리한 뒤 반환하는 방법은 아래와 같다.

// 선행 조건 : apiGroup.Get 등으로 등록된 라우터에서 핸들러로 아래 함수 지정 및 파라미터 이름 명시
```
apiGroup.Get("/:paramName", func(c fiber.Ctx) error { return c.JSON("api route called") })

func GetRequestWithParams(c fiber.Ctx) error {
// 클라이언트에서 요청과 함께 보낸 파라미터 가져오기
param := c.Params(<parameter name>)

// 가져온 파라미터를 포함한 데이터를 클라이언트에 반환
return c.JSON(fiber.Map {"data": param})
}
```
<br/>

# Fiber request handler
위에서 언급한 핸들러는 데이터를 처리할 함수를 의미한다.

사용 방식은 "apiGroup.Get("", handlerFunction)"이며, 

핸들러 등록 시에는 뒤에 ()를 붙여 함수 실행문을 작성하지 않아야 한다.

"handlerFunction()"으로 작성할 경우 라우터 등록 시에 함수가 실행되고, 요청에 대해서는 실행되지 않는 오류가 발생한다.

handlerFunction과 handlerFunction()의 차이는 함수에 대한 정보를 의미하는 것과 함수 실행을 위한 트리거를 의미하는 데에 있다.
<br/>

# middleware
fiber app init 시에 이용한 로깅 미들웨어와 같은 미들웨어는 데이터를 가로채 특정 행동을 하는 함수를 말한다.

로깅 미들웨어는 요청에 대한 정보를 터미널 또는 로그 파일에 출력하는 역할을 한다.

또 다른 미들웨어 예시로 request header 값을 읽고 특정 값이 없다면 400번대 응답을 반환하는 역할이 있다.(로그인 등의 사용자 인증에 사용)
