# frozen_string_literal: true

module Api
  module V1
    # UsersController
    class UsersController < ApplicationController
      def index
        users = User.all
        render json: users, each_serializer: UserSerializer
      end
    end
  end
end
