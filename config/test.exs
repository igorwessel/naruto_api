use Mix.Config

# Logger
config :logger, level: :warn

# Configures application
config :naruto_api, NarutoAPI.Endpoint,
  port: 4000

# Configure your database
config :naruto_api, NarutoAPI.Repo,
  timeout: 99_999_999,
  pool: Ecto.Adapters.SQL.Sandbox

# Configure test watch
config :mix_test_watch,
  clear: true
