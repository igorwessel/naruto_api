defmodule NarutoAPI.Application do
  require Logger
  use Application

  import Supervisor.Spec

  def start(_type, _args), do: Supervisor.start_link(children(), opts())

  defp children(), do: [
    supervisor(NarutoAPI.Repo, []),
    {Plug.Cowboy, scheme: :http, plug: NarutoAPI.Endpoint, options: get_config()},
  ]

  defp opts(), do: [
    strategy: :one_for_one,
    name: NarutoAPI.Supervisor
  ]

  defp get_config() do
    Logger.info("Starting NarutoAPI application")

    with {:ok, config} <- Application.fetch_env(:naruto_api, NarutoAPI.Endpoint) do
      port = System.get_env("PORT") || 4000
      Logger.info("Starting server using port #{port}")
      config
    end
  end
end
