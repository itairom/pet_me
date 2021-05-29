const gUsers = [
        {
          "_id": "s101",
          "name": "Noah	James",
          "title": "ahla hanot",
          "desc": "happy farm",
          "imgUrl": "url",
          "isOwner":true,
          "tags": [
            "dogs",
            "cows"
          ],
          "pets": [
            {
              "_id": "rev101",
              "isAdopted":false,
              "adoptQue": [
                {
                  "userId": "123",
                  "message": "lolo",
                  "chatId": "i11"
                },
                {
                  "userId": "123",
                  "message": "i like to addopt",
                  "chatId": "ch23"
                  }
                ]
            }
          ],
          "reviews": [
            {
              "id": "rev101",
              "txt": "great farm",
              "rate": 4,
              "by": {
                "_id": "u102",
                "fullname": "user2",
                "imgUrl": "/img/img2.jpg"
              }
            }
          ]
        }
]