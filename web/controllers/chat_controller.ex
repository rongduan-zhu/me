defmodule Me.ChatController do
  use Me.Web, :controller

  def index(conn, _params) do
    render conn, "index.html", ng2: true
  end
end
