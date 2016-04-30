defmodule Me.ChatView do
  use Me.Web, :view

  def me_data(key, value) do
    raw("<me-data key=\"#{key}\" value=\"#{value}\"></me-data>")
  end

  def facebook_id do
    Application.fetch_env!(:me, :facebook_app_id)
  end
end
