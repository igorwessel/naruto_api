defmodule NarutoAPI.MixProject do
  use Mix.Project


  @url "https://github.com/igorwessel/naruto_api"

  def project do
    [
      app: :naruto_api,
      version: "0.1.0",
      elixir: "~> 1.10",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      name: "NarutoAPI",
      source_url: @url
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger, :cowboy],
      mod: {NarutoAPI.Application, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [

      # Encoders
      {:poison, "~> 4.0", override: true},

      # RESTFul
      {:plug, "~> 1.8"},
      {:cowboy, "~> 2.6"},
      {:plug_cowboy, "~> 2.0"},

      # Database
      {:myxql, "~> 0.3.0"},
      {:ecto, "~> 3.1"},
      {:ecto_sql, "~> 3.1"},

      # GraphQL
      {:absinthe, "~> 1.5"},
      {:absinthe_plug, "~> 1.5"},
    ]
  end
end
