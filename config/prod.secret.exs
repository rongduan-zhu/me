use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
config :me, Me.Endpoint,
  secret_key_base: "aak7GdQsSJpHb/vNMzpnKF3bs+2PMf643e4Ujrd6TRgQ2N5QfdZKRGzL9XUS+izU"

# Configure your database
config :me, Me.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "me_prod",
  pool_size: 20
