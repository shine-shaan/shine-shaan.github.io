---
title: GoLang, Mongo Index
layout: single
category: software
tags: ["golang","mongo"]
---

Mongodb에서 특정 키를 빠르게 조회하기 위해 Index 기능을 사용할 수 있다.

Index 기능을 사용하면 특정 키 값을 기준으로 데이터를 조회하는 데에 필요한 연산이 줄어들고, unique option을 이용해 컬렉션 안에서 유일한 값으로 지정할 수 있다.
<br/>


# Index Model
Index 설정을 위해서 어떤 키를 Index로 사용하는지에 대한 Model을 선언해야 한다.

예시에서는 단일 필드 "sample_id" 키를 오름차순으로 정렬하는 Index와 복합 필드 "sample_id", "name" 키를 오름차순으로 정렬하는 Index를 선언한다.

Key 값이 필드 이름, Value 값이 정렬 방향이다.(1 : 오름차순 / -1 : 내림차순)
<br/>

## 단일 필드 인덱스

```
singleSampleIndexModel := mongo.IndexModel{Keys: bson.D{{Key: "sample_id", Value: 1}}}
```
<br/>


## 복합 인덱스

```
compoundSampleIndexModel := mongo.IndexModel{Keys: bson.D{{Key: "sample_id", Value: 1},{Key: "name",Value: 1}}}
```
<br/>


# Index Option
Index를 선언할 때, Option을 사용해서 unique 필드 설정이 가능하다.

unique 설정이 true이면, 해당 필드는 컬렉션 내에서 유일한 값이 되며 중복되는 데이터가 삽입 시도되는 경우 "Duplicate error"를 반환하며 삽입에 실패한다.

복합 인덱스의 경우에는 인덱스에 사용한 필드 조합이 컬렉션 내에서 유일한 값이 되며 인덱스에 사용한 모든 필드가 중복되는 경우에는 삽입에 실패하지만, 하나라도 다른 경우 삽입이 가능하다.
<br/>

## 단일 필드 인덱스 unique 설정

```
singleSampleIndexModel := mongo.IndexModel{Keys: bson.D{{Key: "sample_id", Value: 1}}, Options: options.Index().SetUnique(true)}
```
<br/>

## 복합 인덱스 unique 설정

```
compoundSampleIndexModel := mongo.IndexModel{Keys: bson.D{{Key: "sample_id", Value: 1}, {Key: "name", Value: 1}}, Options: options.Index().SetUnique(true)}
```
<br/>

# create Index
Index Model 선언 후에는 컬렉션에 Index를 등록해야 한다.

collection은 mongo driver의 mongo.Collection 타입이다.

아래 예시 코드처럼 인덱스를 등록할 수 있고, 등록에 성공하면 name 변수에 인덱스 이름이 반환된다.

인덱스 이름은 "필드명_순서" 형태이며, 복합 인덱스의 경우 "필드명_순서_필드명_순서"이다.

```
name, err := collection.Indexes().CreateOne(context.TODO(), singleSampleIndexModel)

name, err := collection.Indexes().CreateOne(context.TODO(), compoundSampleIndexModel)
```
