# frozen_string_literal: true

# ApplicationController
class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[user_name user_type email avatar])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[user_name user_type email avatar])
  end
end
