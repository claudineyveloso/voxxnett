# frozen_string_literal: true

module Api
  module V1
    # UsersController
    class UsersController < ApplicationController
      def index
        users = User.all
        render json: users, each_serializer: UserSerializer
      end

      def search
        filtered = User.where('email ILIKE ?', "%#{params[:filter]}%").order(email: :asc)
        render json: filtered, each_serializer: UserSerializer
      end
    end
  end
end
