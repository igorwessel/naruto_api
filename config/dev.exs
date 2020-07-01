use Mix.Config

# Logger
config :logger, level: :debug

# Configures application
config :naruto_api, NarutoAPI.Endpoint,
  port: 4000
