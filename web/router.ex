defmodule Me.Router do
  use Me.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
  end

  scope "/", Me do
    pipe_through :browser # Use the default browser stack

    get "/", HomeController, :index
    get "/resume*rest", HomeController, :index

    get "/chat*rest", ChatController, :index
  end

  scope "/api", Me do
    pipe_through :api

    resources "/users", UserController, only: [:create]
  end
end
