# Fruitcakes Pets API

This api will allow the users of our react front-end application to CRUD pets and their toys.

This application uses token authentication instead of sessions.

## Resources

### Foods

##### Routes Table

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET    | `/foods`                | `foods#index`      |
| GET    | `/foods/:id`            | `foods#show`       |
| POST   | `/foods`                | `foods#create`     |
| PATCH  | `/foods/:id`            | `foods#update`     |
| DELETE | `/foods/:id`            | `foods#delete`     |

### Users

##### Routes Table

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/`    | `users#changepw`  |
| DELETE | `/sign-out/`           | `users#signout`   |

### Dish

##### Routes Table

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/dishes/:foodId`         | `dishes#create`     |
| PATCH  | `/dishes/:foodId/:dishId`  | `dishes#update`     |
| DELETE | `/dishes/:foodId/:dishId`  | `dishes#delete`     |