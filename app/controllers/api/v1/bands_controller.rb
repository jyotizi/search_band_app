class Api::V1::BandsController < ApplicationController
  def index
    city = params[:city] || FetchBandsService.get_user_location
    bands = FetchBandsService.get_bands_by_location(city)

    # render json: bands
    respond_to do |format|
      format.html
      format.json { render json: bands }
    end
  end
end
