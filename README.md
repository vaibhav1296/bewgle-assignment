## What's this?

An API collection which stores the information about API like method, body, query and duration etc. Once you hit a post, get, put or delete request it will send you response after specified duration like between 15 to 30 seconds.

This API collection has a PostgreSQL database for storing API information. This database consists of only one table which has columns listed below

- method (type string)
- headers (type JSON)
- path (type string)
- query (type JSON)
- body (type JSON)
- duration (type integer)
- created_at (type date)
- updated_at (type date)

The collection has two endpoints starting with **_/process and /stat_**.

The **_/process_** endpoint can have **_GET, POST, UPDATE, DELETE_** requests. Each request can either have query and body or not. After the request has been made the response will be there after a specific duration and that duration will be random varying between 15 to 30 seconds.

A sample response is here -

```
{
    "message": "Data is successfully posted",
    "body": {
        "duration": 6,
        "body": {
            "fromDate": "2021-02-04",
            "toDate": "2021-02-09"
        },
        "query": null,
        "headers": {
            "content-type": "application/json",
            "user-agent": "PostmanRuntime/7.26.8",
            "accept": "*/*",
            "postman-token": "e5630347-7f9f-45a5-8cc7-2808c5fcd97a",
            "host": "localhost:3000",
            "accept-encoding": "gzip, deflate, br",
            "connection": "keep-alive",
            "content-length": "58"
        },
        "path": "/process/post-data",
        "method": "POST"
    }
}
```

The **_/stat_** endpoint will give you detail about the request's data saved in database. It will give you details like the number of requests categorized by methods(GET, PUT, DELETE, POST) and the average duration time. You can have filter like from date and to date inside request body.

Suppose you have a query for all the GET method requests from a specific date or to a specific date or both , then you can hit **_/stat_** endpoint with request body like this

```
{
    "fromDate":"<YY-MM-DD>",
    "toDate":"<YY-MM-DD>"

}
```

and you will recieve response like this

```
{
    "message": "Total requests with average time",
    "body": [
        {
            "totalRequests": 3,
            "method": "GET",
            "avgDuration": "14.33"
        },
        {
            "totalRequests": 4,
            "method": "POST",
            "avgDuration": "9.25"
        },
        {
            "totalRequests": 0,
            "method": "DELETE",
            "avgDuration": 0
        },
        {
            "totalRequests": 1,
            "method": "UPDATE",
            "avgDuration": "10.00"
        }
    ]
}
```

###### To run this code repository on your machine you will need -

- NodeJS on your system
- PostgreSQL database
- VS Code or any code
- Postman

###### How to run -

- Clone this repository on your machine.
- Run command **_npm i_**.
- Create a database.
- Edit the config.json file inside config folder with mentioned details ( edit database name, port, username, password ).
- Create a .env file and add a variable named **_SERVER_PORT_** and put a value like 3000 or 8080 or any.
- Run command **_npm start_**
- Test APIs on postman
