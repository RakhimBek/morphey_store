[<img width="134" src="https://vk.com/images/apps/mini_apps/vk_mini_apps_logo.svg">](https://vk.com/services)

# Create VK Mini App [![npm][npm]][npm-url] [![deps][deps]][deps-url]

## How to install

### Create VK Mini App with gh-pages deploy

`npx @vkontakte/create-vk-mini-app <app-directory-name>`

### Create VK Mini App with Zeit deploy

Firstly, you have to create Zeit account and connect it with your GitHub profile — https://zeit.co/

`npx @vkontakte/create-vk-mini-app <app-directory-name> --zeit`

### Create VK Mini App with Surge deploy

Firstly, you have to create Surge account and Surge-domain — https://surge.sh/

`npx @vkontakte/create-vk-mini-app <app-directory-name> --surge <surge-domain>`

## How to start work with app

Go to created folder and run:
`yarn start` || `npm start` — this will start dev server with hot reload on `localhost:10888`.

`yarn run build` || `npm run build` — this will build production bundle, with tree-shaking, uglify and all this modern fancy stuff

[npm]: https://img.shields.io/npm/v/@vkontakte/create-vk-mini-app.svg
[npm-url]: https://npmjs.com/package/@vkontakte/create-vk-mini-app

[deps]: https://img.shields.io/david/vkcom/create-vk-mini-app.svg
[deps-url]: https://david-dm.org/vkcom/create-vk-mini-app



Home:
-- тут карусель. Необходимо заставить ее крутится  по нажатию на кнопку "Испытать удачу". Вращение должно быть зациклено и быстрым (желательно с плавной остановкой на некотором слоте)

Слот возвращается по адресу:
https://randee.store/api/vk/prize/random?vk_user_id=12345


{
    "code": 200,
    "description": "OK.",
    "data": {
        "id": 3,
        "title": "Купон -500₽ на матрас - 10%",
        "path": "/api/attachment/3"
    }
}

12345 - Существующии тестовый юзер



https://randee.store/morphey/api/vk/prize

возвращает все доступные призы:
{
    "code": 200,
    "description": "OK.",
    "data": [
        {
            "id": 1,
            "title": "Купон -300 рублей на акксессуары",
            "path": "/api/attachment/1"
        },
        ...
    ]
}


Где: data[i].path - путь относительный https://rande.store к файлу логотипа
