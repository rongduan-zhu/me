defmodule Me.UserController do
  use Me.Web, :controller

  import Me.TokenVerifier, only: [verify_and_login: 3]

  def create(conn, %{"token" => token, "provider" => provider} = data) do
    case verify_and_login(provider, token, data) do
      {:ok, jwt, claims} -> json(conn, %{:jwt => jwt, :claims => Poison.encode!(claims)})
      {:error, _} -> send_resp(conn, :unauthorized, "Unable to register/login")
    end
  end
  def create(conn, %{"form" => _form} = data) do

  end
end
