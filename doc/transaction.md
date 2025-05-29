# Transaction API Spec

### Create Transaction

Endpoint : POST /api/transactions

Request Header :

- Authorization : token

Request Body :

```json
{
	"category_id": "clw8z123123123123",
	"amount": 150000,
	"description": "Bayar Listrik",
	"date": "2025-05-12"
}
```

Response Body :

```json
{
	"data": {
		"category_id": "clw8z123123123123",
		"amount": 150000,
		"description": "Bayar Listrik",
		"date": "2025-05-12"
	}
}
```

### List Transactions

Endpoint : GET /api/transactions

Request Header :

- Authorization : token

Query Parameter (Optional):

- type : INCOME | EXPENSE
- start : YYYY-MM-DD
- end : YYY-MM-DD
- page : number, default 1
- size : number, default 10

Response Body :

```json
{
	"data": [
		{
            "id": "asdihjq0198",
            "amount": 150000,
			"description": "Bayar Listrik",
			"date": "2025-05-12",
			"category": {
                "id": "clw8z123123123123",
                "name": "Tagihan",
                "type": "EXPENSE"
            }
		},
		{
            "id": "asdhr4sd198",
			"amount": 100000,
			"description": "Bayar Air",
			"date": "2025-05-10",
            "category": {
                "id":"clw8z123123123123",
                "name":"Tagihan",
                "type": "EXPENSE"
            }
		},
        ...
	],
    "paging" : {
        "current_page" : 1,
        "total_page" : 5,
        "size" : 10
    }
}
```

### GET Transaction

Endpoint : GET /api/transactions/{transactionId}

Request Header :

- Authorization : token

Response Body :

```json
{
	"data": {
		"id": "asdihjq0198",
		"category_id": "clw8z123123123123",
		"amount": 170000,
		"description": "Bayar Wifi",
		"date": "2025-05-22"
	}
}
```

### Update Transaction

Endpoint : PATCH /api/transactions/{transactionId}

Request Header :

- Authorization : token

Request Body :

```json
{
	"category_id": "clw8z123123123123",
	"amount": 170000,
	"description": "Bayar Listrik Naik",
	"date": "2025-05-21"
}
```

Response Body :

```json
{
	"data": {
		"id": "asdihjq0198",
		"category_id": "clw8z123123123123",
		"amount": 170000,
		"description": "Bayar Listrik Naik",
		"date": "2025-05-21"
	}
}
```

### Delete Transaction

Endpoint : DELETE /api/transactions/{transactionId}

Request Header :

- Authorization : token

Response Body :

```json
{
	"data": true
}
```
