defmodule Me.HomeController do
  use Me.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
