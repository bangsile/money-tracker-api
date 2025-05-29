# User API Spec

### Resgister User

Endpoint : POST /api/users

Request Body :

```json
{
	"username": "bangsile",
	"password": "rahasia",
	"name": "Asil Taufiq"
}
```

Response Body (success) :

```json
{
	"data": {
		"username": "bangsile",
		"name": "Asil Taufiq"
	}
}
```

Response Body (failed) :

```json
{
	"errors": "Username must not blank, ..."
}
```

### Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
	"username": "bangsile",
	"password": "rahasia"
}
```

Response Body (success) :

```json
{
	"data": {
		"username": "bangsile",
		"name": "Asil Taufiq",
		"token": "token"
	}
}
```

### Get User

Endpoint : GET /api/users/current

Request Header :

- Authorization : token

Response Body (success) :

```json
{
	"data": {
		"username": "bangsile",
		"name": "Asil Taufiq"
	}
}
```

### Update User

Endpoint : PATCH /api/users/current

Request Header :

- Authorization : token

Request Body :

```json
{
	"nama": "Asil",
	"password": "password baru"
}
```

Response Body (success) :

```json
{
	"data": {
		"username": "bangsile",
		"name": "Asil"
	}
}
```

### Logout User

Endpoint DELETE /api/users/current

Request Header :

- Authorization : token

```json
{
	"data": true
}
```
