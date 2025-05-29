# Category (Per User) API Spec

### Create Category

Endpoint : POST /api/categories

Request Header :

- Authorization : token

Request Body :

```json
{
	"name": "Transportasi",
	"type": "EXPENSE" // or INCOME,
}
```

Response Body :

```json
{
	"data": {
		"id": "clw8z123123123123",
		"name": "Transportasi",
		"type": "EXPENSE"
	}
}
```

### Get Category

Endpoint : GET /api/categories

Request Header :

- Authorization : token

Response Body :

```json
{
	"data": [
        {
            "id": "clw8z123123123123",
            "name": "Transportasi",
            "type": "EXPENSE"
        },
        {
            "id": "clw8z12312afasf123",
            "name": "Gaji",
            "type": "INCOME"
        },
        ...
    ]
}
```

### Update Category

Endpoint : PATCH /api/categories/{categoryId}

Request Header :

- Authorization : token

Request Body :

```json
{
	"name": "Makan",
	"type": "INCOME"
}
```

Response Body :

```json
{
	"data": {
		"id": "clw8z12312afasf123",
		"name": "Makan",
		"type": "INCOME"
	}
}
```

### Delete Category

Endpoint : DELETE /api/categories/{categoryId}

Request Header :

- Authorization : token

Response Body :

```json
{
	"data": true
}
```
