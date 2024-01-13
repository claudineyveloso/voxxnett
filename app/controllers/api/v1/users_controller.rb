# frozen_string_literal: true

module Api
  module V1
    # UsersController
    class UsersController < ApplicationController
      before_action :set_user, only: %i[show update destroy]

      def index
        users = params[:filter].nil? ? User.where(is_active: true).all.order(email: :asc) : User.where('email ILIKE ?', "%#{params[:filter]}%").order(email: :asc)
        # users = User.all.order(email: :asc)
        render json: users, each_serializer: UserSerializer
      end

      def custom_create
        user = User.create!(user_params)
        if user
          # user.customers << Customer.find(params[:customers_ids]) if params[:customers_ids].present?
          render json: {
            status: { code: 200, message: 'Registered with successfully.' }
          }
        else
          render json: {
            status: { code: 400, message: 'Unprocessable entity.' }
          }
        end
      end

      def edit
        user = User.find(params[:id])
        render json: user, each_serializer: UserSerializer
      end

      def update
        user = User.find(params[:id])
        if user.update!(user_params)
          render json: {
            status: { code: 200, message: 'Updated with successfully..' }
          }
        else
          render json: {
            status: { code: 400, message: 'Unprocessable entity.' }
          }
        end
      end

      def show
        render json: @user
      end

      def destroy
        @user.destroy
        head :no_content
      end

      private

      def set_user
        @user = User.find(params[:id])
      end

      def user_params
        params.require(:user).permit(:user_name,
                                     :is_active,
                                     :user_type,
                                     :email,
                                     :password,
                                     customers_ids: [],
                                     people_attributes: %i[id first_name last_name cpf_cnpj identity_municipal_registration dispatcher birthday_date],
                                     addresses_attributes: %i[id street complement neighborhood city state zip_code])

        # customer_ids: [],
        # terminal_ids: []
      end
    end
  end
end
