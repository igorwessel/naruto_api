defmodule NarutoAPITest do
  use ExUnit.Case
  doctest NarutoAPI

  test "greets the world" do
    assert NarutoAPI.hello() == :world
  end
end
