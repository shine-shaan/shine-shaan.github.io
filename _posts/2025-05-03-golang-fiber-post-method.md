---
title: GoLang, Fiber 프레임워크의 POST 메서드
layout: single
---

Fiber에서는 HTTP 요청을 수신하고, 응답할 수 있다.

그중 POST 메서드에 대해 다른 프레임워크와 다른 점이 있어 소개한다.

(데이터를 직접 조작하지 않고 특정 구조체에 바로 할당하는 방식)
<br/>

# Fiber Listen POST Method
Fiber App에서 POST Method를 수신하는 방법은 아래와 같다.
```
package main
import "<module path>/handler"

// Fiber app 선언
app := fiber.New()
// POST 메서드를 수신하는 path 등록
app.Post("/path", handler.PostHandler)
// 로컬호스트의 포트 3000에서 앱 실행
app.Listen(":3000")
```
<br/>

# Curl request
위 예제와 같다면 "http://localhost:3000/path"에서 POST 메서드를 수신한다.

일반적으로, POST 메서드를 사용하는 경우 POST BODY에 서버에 전달할 데이터를 입력한다.

Curl을 예시로 들면, 아래와 같은 요청 구문을 사용한다.

"curl -H "Content-Type: application/json" -X POST http://localhost:3000/path -d '{<json data>}'"

-H "Content-Type: application/json"

=> POST BODY의 유형이 json임을 헤더에 표시
<br/>

-X POST

=> HTTP 요청 메서드를 POST로 지정
<br/>

-d '{<json data>}'"

=> POST BODY 데이터 입력, 헤더에서 json으로 타입을 지정했기 때문에 json으로 입력한다.
<br/>

(헤더의 Content-Type를 application/json 외에 text/plain, text/html 등으로 지정할 수 있다.)

<br/>

# Fiber Body
Fiber는 Fiber.Ctx 타입의 데이터를 인자로 받아 핸들러 함수를 호출한다.

예제는 인자에서 Body 데이터를 가공하는 과정이다.

Body 데이터를 []byte 타입으로 얻을 수도 있지만, 불필요한 코드를 줄이기 위해 Bind 방식을 이용한다.

Bind 방식을 이용하기 위해서는 미리 입력받을 데이터의 구조체를 선언해야 한다.(PostData)

구조체의 내부 변수 이름은 대문자로 시작해야 하며, json에서 이용하는 변수 이름을 따로 지정한다.

(패키지 외부에서 접근하는 요소는 대문자로 시작, 내부에서만 사용하는 경우 소문자로 시작)

**!! 권장 방식은 ctx.BodyParser() 함수를 이용하는 것**인데, 현재 글을 작성하는 시점에서 fiver/v3가 해당 함수를 지원하지 않아 Bind().Body() 방식을 이용한다.

```
package handler

type PostData struct {

    Name string `json:"name"`

    Number int `json:"number"`

}

func PostHandler(ctx fiber.Ctx) error {
    // 데이터가 입력될 변수 선언
    bodyData := new(PostData)
    // 요청의 Body를 앞에서 선언한 bodyData로 할당
    ctx.Bind().Body(&bodyData)

    // 데이터가 제대로 할당된 경우 Name을 반환
    return ctx.SendString(bodyData.Name)
}
```
