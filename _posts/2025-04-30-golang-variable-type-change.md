---
title: GoLang, 변수 타입 변환
layout: single
category: software
tags: ["golang"]
---


Go는 정적 타입 언어이므로 변수 선언 후 타입을 변경할 수 없다.

또한, 타입의 변환 또는 반환값에 대한 타입 확인 과정이 다른 언어와 다른 점이 있다.



**TYPE ASSERTION**을 사용하는 경우
- interface {} 타입 등의 불명확한 타입인 경우



**TYPE CONVERSION**을 사용하는 경우 
- int to string처럼 타입을 변환하는 경우
<br/>

# TYPE ASSERTION (타입 명시)
외부 함수로부터 반환된 변수 타입을 명시하는 과정이다.

예를 들어, MONGO DRIVER를 이용해 데이터를 삽입한 뒤 반환받는 InsertOneResult의 경우

InsertOneResult가 가지고 있는 변수인 InsertedID를 타입 명시하는 과정이 필요하다.



코드 예시에서는 result에 할당한 InsertOneResult의 InsertedID를 

bson.ObjectID 타입으로 명시한다.

이 과정이 없다면 컴파일러가 result.InsertedID의 타입이 interface {}이므로 

내부 변수의 사용이 불가능하다.

```
result, err := collection.InsertOne(context.TODO(), document)

if err != nil {

panic(err)

}
```

## 타입 명시 코드 (type assertion)


```
objectID, ok := result.InsertedID.(bson.ObjectID)

if !ok {
panic("error in assertion ObjectID")
}

return objectID.string()
```


# TYPE CONVERSION (타입 변환)
선언된 변수의 타입을 변환하는 과정이다.

이미 알고 있는 타입의 변수를 다른 타입으로 변환할 때 필요하다. 

float64 타입을 float32 타입으로 변환해 메모리 할당을 최적화하는 등에 사용할 수 있다.

## float64 타입으로 변수 선언

var float64Data float64 = 123.12345

## float64 타입의 변수를 float32 타입으로 변환

var float32Data float32 = float32(float64Data)
