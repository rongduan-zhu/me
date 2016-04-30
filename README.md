# Me

## Purpose of app

I made this to learn and play with new web technologies.

## Setting up Production Server

### Environment variables to define

* `MIX_ENV` environment for MIX, should be `prod`
* `PHOENIX_SECRET` app secret
* `TLS_KEY_PATH` path to private key for certificate
* `TLS_CERT_PATH` path to certificate
* `DB_USERNAME` database username
* `DB_PASSWORD` database password
* `BUILD_PROD` define this variable so project will be built using production settings
* `FB_APP_ID` Facebook application ID
* `FB_SECRET` Facebook application secret

### OAuth Setup
You will need to create a oauth config file `config/oauth/prod.exs`

With the following content
```elixir
use Mix.Config

config :me,
  facebook_app_id: System.get_env("FB_APP_ID"),
  facebook_secret: System.get_env("FB_SECRET")
```

### Let's Encrypt

First setup a ini file.

`/etc/letsencrypt/letsencrypt.ini`

With the following content:

```ini
rsa-key-size = 4096
email = example@example.com
domains = www.example.com
text = True
authenticator = webroot
webroot-path = /var/web/priv/static
```

Then we can obtain the certificate.
```bash
letsencrypt certonly --config /etc/letsencrypt/letsencrypt.ini
```
