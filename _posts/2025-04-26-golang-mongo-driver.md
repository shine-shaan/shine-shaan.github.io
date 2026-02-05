---
title: GoLang, Mongo Driver
layout: single
date: 2025-04-26 12:00:00 +09:00 
---

Python 프로젝트에서 데이터베이스로 Mongo를 주로 이용해 왔다.

Go에서도 Mongo 데이터베이스를 이용해보려 한다.
<br/>
<br/>

---

# Mongo 특징
Mongo는 No-sql 데이터베이스다.

sql 데이터베이스(MySQL, Postgre)와 달리 데이터 구조를 명시하고 타입을 지정하지 않고 다양한 형태의 데이터가 저장된다.

Mongo 데이터는 document 형태로 저장되는데, 단어 그대로 문서처럼 저장된다는 뜻이다.

Mongo document는 BSON, (binary JSON) 타입의 문서인데, 

java-script 데이터 전달을 위해 만들어진 JSON을 binary 형태의 데이터가 입력되도록 변형된 타입이다.<br/>

---

# Go - Mongo driver
Go에서 이용할 수 있는 Mongo driver는 공식적으로 지원되고 있다.

https://www.mongodb.com/ko-kr/docs/drivers/go/current/

MongoDB 고 (Go) 드라이버 - 고 (Go) 드라이버 v2.2 - MongoDB Docs<br/>
https://www.mongodb.com/ko-kr/docs/drivers/go/current/ 
공식 문서를 이용해 Mongodb와 Go 프로젝트를 연결해 보겠다.<br/>

---

# Mongo Connect
Mongodb는 docker compose를 이용해 컨테이너로 실행한 상태이고, 

docker compose 파일 예시는 아래와 같다.<br/>

```
services:

  mongo:

    image: mongo:8.0.8-noble

    container_name: mongo

    ports:

      - 27017:27017

    volumes:

      - mongo-data:/data/db

      - mongo-setting:/data/configdb

    environment:

      MONGO_INITDB_ROOT_USERNAME: <user name>

      MONGO_INITDB_ROOT_PASSWORD: <user password>

    command: mongod --auth

volumes:

  mongo-data:

    external: false

  mongo-setting:

    external: false
```

현재 설정 상, localhost의 포트 27017로 Mongodb에 접근할 수 있다.

environment에 입력한 user name과 user password를 적용하면 Mongodb 접속을 위한 uri를 작성할 수 있다.



"mongodb://<user name>:<user password>@localhost:27017"



uri를 Mongo driver에 입력하고 반환값을 받는 Go 코드는 아래와 같다.

client, err := mongo.Connect(options.Client(). ApplyURI(uri))<br/>

---

# Mongo Client
위 과정을 통해 Mongodb와 연결을 성공하면, 반환값으로 client를 얻게 된다.

Mongo client는 database 및 collection 접근을 위한 필수 연결점이다.<br/>

---

# Mongo database, collection 접근
client를 이용하면 database와 collection에 접근할 수 있다.

(client), (database), (collection) 관계는 client -> database -> collection으로, 순서대로 접근한다.



database를 얻는 방법은 아래와 같다.
```
database := client.Database(<database name>)
```


collection을 얻는 방법은 아래와 같다.
```
collection := database.Collection(<collection name>)<br/>
```

---

# Mongo CRUD
데이터를 읽고 쓰는 작업을 CRUD(create, read, update, delete)라고 한다.

위에서 얻은 collection을 이용해 CRUD 하는 방법은 아래와 같다.<br/>

## create(insert)

```
doc := <입력할 데이터 구조체>

collection.InsertOne(context.TODO(), doc)
```
<br/>

## read

```
filter := <데이터를 찾기 위한 조건 (예: ID 또는 고유 조합 값)>

collection.FindOne(context.TODO(), filter)
```

<br/>

## update

```
filter := <데이터를 찾기 위한 조건 (예: ID 또는 고유 조합 값)>

update := <업데이트할 내용 (Set, Push 등의 연산자 사용)>

collection.UpdateOne(context.TODO(), filter, update)
```
<br/>

## delete
```
filter := <데이터를 찾기 위한 조건 (예: ID 또는 고유 조합 값)>

collection.DeleteOne(context.TODO(), filter)

Find(FindOne과 다름) 반환값으로는 cursor를 얻게 되며, cursor를 통해 documentId를 얻을 수 있다.
```
<br/>

---

# := 바다코끼리 연산자
Go에서는 Python처럼 := 연산자를 이용할 수 있다.

모양이 바다코끼리와 비슷해서 바다코끼리(walrus) 연산자라고 부른다.

이 연산자를 이용해 할당한 변수는 변수 할당과 동시에 이용할 수 있다.

```
ex) if isWalrus := checkIsWalrus(walrus) {...}
```
예시에서는 if 조건으로 isWalrus를 이용하는 동시에 isWalrus에 checkIsWalrus 함수 반환값을 할당한다.
