# frozen_string_literal: true

module Api
  module V1
    # CustomersController
    class CustomersController < ApplicationController
      def index
        filtered = Customer.joins(:people).where('people.first_name LIKE ?', "%#{params[:filter]}%")
        # @pagy, @customers = pagy(filtered.all, items: 10)
      end
    end
  end
end
