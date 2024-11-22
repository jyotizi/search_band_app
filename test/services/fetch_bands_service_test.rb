require "test_helper"
require "minitest/mock"

class FetchBandsServiceTest < ActiveSupport::TestCase
  test "should fetch user location from the GeoJS API" do
    mock = Minitest::Mock.new
    mock.expect :call, "MockCity"

    FetchBandsService.stub(:get_user_location, mock) do
      location = FetchBandsService.get_user_location
      assert_equal "MockCity", location
    end

    mock.verify
  end

  test "should fetch bands from MusicBrainz API for a given location" do
    mock = Minitest::Mock.new
    mock.expect :call, [
      { "id" => 1, "name" => "Band A", "year_founded" => 2015 },
      { "id" => 2, "name" => "Band B", "year_founded" => 2018 }
    ], ["MockCity"]

    FetchBandsService.stub(:get_bands_by_location, mock) do
      bands = FetchBandsService.get_bands_by_location("MockCity")
      assert_equal 2, bands.size
      assert_equal "Band A", bands.first["name"]
    end

    mock.verify
  end
end
