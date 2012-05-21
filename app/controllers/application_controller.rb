class ApplicationController < ActionController::Base
  protect_from_forgery
  helper :all

  private
  
  def mobile_device?
    return true # Fake mobile device for now
    request.user_agent =~ /Mobile|webOS/
  end
  
  helper_method :mobile_device?
end
