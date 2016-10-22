class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def angular
    render './angular', layout: false
  end
end
