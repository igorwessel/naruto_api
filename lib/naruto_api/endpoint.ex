defmodule NarutoAPI.Endpoint do
  @moduledoc false
  use Plug.Builder

  plug Plug.RequestId

  plug Plug.Logger
  plug Plug.MethodOverride
  plug Plug.Head

  # TODO: create router
  # plug NarutoAPI.Router

  plug Plug.Parsers, parsers: [:urlencoded, :multipart, :json, Absinthe.Plug.Parser], pass: ["*/*"], json_decoder: Poison
end
