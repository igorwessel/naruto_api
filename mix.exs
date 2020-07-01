defmodule NarutoAPI.MixProject do
  use Mix.Project

  def project do
    [
      app: :naruto_api,
      version: "0.1.0",
      elixir: "~> 1.10",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [

      # RESTFul
      {:plug, "~> 1.8"},
      {:cowboy, "~> 2.6"},
      {:plug_cowboy, "~> 2.0"},

      # Database
      {:myxql, "~> 0.3.0"},
      {:ecto, "~> 3.1"},
      {:ecto_sql, "~> 3.1"},
      # {:dep_from_hexpm, "~> 0.3.0"},
      # {:dep_from_git, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"}
    ]
  end
end
