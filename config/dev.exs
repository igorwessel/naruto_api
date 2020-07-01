use Mix.Config

# Logger
config :logger, level: :debug

# Configures application
config :naruto_api, NarutoAPI.Endpoint,
  port: 4000

  # Configure your database
config :naruto_api, NarutoAPI.Repo,
  timeout: 99_999_999,
  pool: Ecto.Adapters.SQL
  username: System.get_env("DB_USER"),
  password: System.get_env("DB_PASSWORD"),
  database: System.get_env("DB_NAME"),
  port: System.get_env("DB_PORT")
