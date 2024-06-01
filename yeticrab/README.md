##№ Установка

```bash
$ npm install
```

## Запуск
```bash
$ npm run dev

### Документация API

#### `create(data: Object) => Promise<Object>`
Создает новую запись в базе данных с предоставленными данными.

- **Запрос**
  - Метод: POST
  - URL: `http://localhost:3001/dataTable/`
  - Тело: JSON объект, представляющий данные для создания.

- **Ответ**
  - Тип: Promise<Object>
  - Формат данных: JSON объект, представляющий вновь созданную запись.
  ```json
  {
      "_id": "6629482d8c62f348ae64d172",
      "numReq": number,
      "dateTimeReq": "2024-04-24T17:57:42.889Z",
      "clientFirm": "string",
      "fioTrans": "string",
      "phoneTrans": "string",
      "comments": "string",
      "status": "новая" || "в работе" || "завершено",
      "linkTrans": "string",
      "__v": 0
  }
  ```

#### `getAll() => Promise<Array<Object>>`
Извлекает все записи из базы данных.

- **Запрос**
  - Метод: GET
  - URL: `http://localhost:3001/dataTable/`

- **Ответ**
  - Тип: Promise<Array<Object>>
  - Формат данных: Массив JSON объектов, представляющих записи.
  ```json
  [
        {
            "_id": "6629482d8c62f348ae64d172",
            "numReq": number,
            "dateTimeReq": "2024-04-24T17:57:42.889Z",
            "clientFirm": "string",
            "fioTrans": "string",
            "phoneTrans": "string",
            "comments": "string",
            "status": "новая" || "в работе" || "завершено",
            "linkTrans": "string",
            "__v": 0
        },
        {
            "_id": "6629482d8c62f348ae64d172",
            "numReq": number,
            "dateTimeReq": "2024-04-24T17:57:42.889Z",
            "clientFirm": "string",
            "fioTrans": "string",
            "phoneTrans": "string",
            "comments": "string",
            "status": "новая" || "в работе" || "завершено",
            "linkTrans": "string",
            "__v": 0
        }
  ]
  ```

#### `update(data: Object) => Promise<Object>`
Обновляет существующую запись в базе данных с предоставленными данными.

- **Запрос**
  - Метод: PUT
  - URL: `http://localhost:3001/dataTable/`
  - Тело: JSON объект, представляющий обновленные данные.

- **Ответ**
  - Тип: Promise<Object>
  - Формат данных: JSON объект, представляющий обновленную запись.
  ```json
    {
        "_id": "6629482d8c62f348ae64d172",
        "numReq": number,
        "dateTimeReq": "2024-04-24T17:57:42.889Z",
        "clientFirm": "string",
        "fioTrans": "string",
        "phoneTrans": "string",
        "comments": "string",
        "status": "новая" || "в работе" || "завершено",
        "linkTrans": "string",
        "__v": 0
    }
  ```

#### `remove(id: string) => Promise<void>`
Удаляет запись из базы данных по предоставленному ID.

- **Запрос**
  - Метод: DELETE
  - URL: `http://localhost:3001/dataTable/:id`

- **Ответ**
  - Тип: Promise<void>
  - Нет тела ответа.