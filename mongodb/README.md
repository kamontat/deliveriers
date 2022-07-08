# MongoDB realm configuration

For functions you must manually copied to functions in App Services by yourself.

## Data model

```js

store = {
  _id: "ObjectId",
  name: "Store A",
  app_ids: ["AID_A", "AID_B", "AID_C"],
  menu_ids: ["MID_A","MID_B"],
  review_ids: ["RID_1","RID_2"],
  create_at: new Date()
}

app = {
  _id: "ObjectId",
  name: "App A"
}

menu = {
  _id: "ObjectId",
  name: "Menu A",
  price: 10.00,
  create_at: new Date()
}

review = {
  _id: "ObjectId",
  rating: 5,
  title: "Review A",
  comment: "This is a comment",
  menu_ids: ["MID_A","MID_B"],
  create_at: new Date()
}
```
{
  "title": "app",
  "properties": {
    "_id": {
      "bsonType": "objectId"
    },
    "name": {
      "bsonType": "string"
    }
  },
  "required": [
    "name"
  ],
  "additionalProperties": false
}

{
  "title": "menu",
  "properties": {
    "_id": {
      "bsonType": "objectId"
    },
    "name": {
      "bsonType": "string",
      "minLength": 1
    },
    "price": {
      "bsonType": "number"
    },
    "create_at": {
      "bsonType": "date"
    }
  },
  "required": [
    "name",
    "price",
    "create_at"
  ],
  "additionalProperties": false
}

{
  "title": "review",
  "properties": {
    "_id": {
      "bsonType": "objectId"
    },
    "rating": {
      "bsonType": "int"
    },
    "title": {
      "bsonType": "string",
      "minLength": 1
    },
    "comment": {
      "bsonType": "string",
      "minLength": 1
    },
    "menu_ids": {
      "bsonType": "array",
      "items": {
        "bsonType": "objectId"
      }
    },
    "create_at": {
      "bsonType": "date"
    }
  },
  "required": [
    "rating",
    "title",
    "comment",
    "menu_ids",
    "create_at"
  ],
  "additionalProperties": false
}

{
  "title": "store",
  "properties": {
    "_id": {
      "bsonType": "objectId"
    },
    "name": {
      "bsonType": "string",
      "minLength": 1
    },
    "app_ids": {
      "bsonType": "array",
      "items": {
        "bsonType": "objectId"
      }
    },
    "menu_ids": {
      "bsonType": "array",
      "items": {
        "bsonType": "objectId"
      }
    },
    "review_ids": {
      "bsonType": "array",
      "items": {
        "bsonType": "objectId"
      }
    },
    "create_at": {
      "bsonType": "string"
    }
  },
    "required": [
    "name",
    "app_ids",
    "menu_ids",
    "review_ids",
    "create_at"
  ],
  "additionalProperties": false
}