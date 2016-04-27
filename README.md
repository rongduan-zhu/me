# Me

## Purpose of app

I made this to learn and play with new web technologies.

## Setting up Production Server

### Environment variables to define

* ```PHOENIX_SECRET```
* ```TLS_KEY_PATH```
* ```TLS_CERT_PATH```
* ```DB_USERNAME```
* ```DB_PASSWORD```
* ```BUILD_PROD```

* ```FB_APP_ID```
* ```FB_SECRET```

### OAuth Setup
You will need to create a oauth config file ```config/oauth/prod.exs```

With the following content
```elixir
use Mix.Config

config :me,
  facebook_app_id: System.get_env("FB_APP_ID"),
  facebook_secret: System.get_env("FB_SECRET")
```
