use Mix.Config

# Configures Elixir's Logger
config :logger, :console,
  format: "time=$date $time $metadata[$level] $message\n",
  metadata: [:request_id]

# General application configuration
config :naruto_api,
  ecto_repos: [NarutoAPI.Repo],
  generators: [integer: true]

import_config "#{Mix.env()}.exs"
