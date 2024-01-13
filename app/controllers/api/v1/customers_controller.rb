# frozen_string_literal: true

module Api
  module V1
    # CustomersControll er
    class CustomersController < ApplicationController
      before_action :set_customer, only: %i[show edit update destroy]

      def index
        customers = if params[:filter].nil?
                      Customer.joins(:people).all.order('people.first_name')
                    else
                      Customer.joins(:people).where('people.first_name ILIKE ?',
                                                    "%#{params[:filter]}%").order('people.first_name')
                    end
        render json: customers, each_serializer: CustomerSerializer
      end

      def new; end

      def edit
        customer = Customer.find(params[:id])
        render json: customer, each_serializer: CustomerSerializer
      end

      def create
        customer = Customer.create!(customer_params)
        if customer
          render json: {
            status: { code: 200, message: 'Registered with successfully.' }
          }
        else
          render json: {
            status: { code: 400, message: 'Unprocessable entity.' }
          }
        end
      end

      def update
        customer = Customer.find(params[:id])
        if customer.update!(customer_params)
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
        customer = Customer.find(params[:id])
        render json: customer
      end

      def destroy
        @customer.destroy
        head :no_content
      end

      private

      def set_customer
        @customer = Customer.find(params[:id])
      end

      def customer_params
        params.require(:customer).permit(:people_type,
                                         :cell_phone,
                                         :observation,
                                         :email,
                                         :active,
                                         people_attributes: %i[id first_name last_name cpf_cnpj identity_municipal_registration dispatcher birthday_date],
                                         addresses_attributes: %i[id street complement neighborhood city state zip_code])
      end
    end
  end
end
