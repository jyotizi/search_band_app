require "test_helper"
require "minitest/mock"

class Api::V1::BandsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @mock_location = "MockCity"
    @mock_bands = [
      { id: 1, name: "Band A", year_founded: 2015 },
      { id: 2, name: "Band B", year_founded: 2018 }
    ]
  end

  test "should get index" do
    get api_v1_bands_url
    assert_response :success
  end

  test "should return bands for a given city" do
    mock = Minitest::Mock.new
    mock.expect :call, @mock_bands, ["New York"]

    FetchBandsService.stub(:get_bands_by_location, mock) do
      get api_v1_bands_url(city: "New York"), as: :json
      assert_response :success

      response_data = JSON.parse(@response.body)
      assert_equal 2, response_data.length
      assert_equal "Band A", response_data[0]["name"]
    end

    mock.verify
  end

  test "should return bands using user's location when city is not provided" do
    mock_location = Minitest::Mock.new
    mock_bands = Minitest::Mock.new

    mock_location.expect :call, @mock_location
    mock_bands.expect :call, @mock_bands, [@mock_location]

    FetchBandsService.stub(:get_user_location, mock_location) do
      FetchBandsService.stub(:get_bands_by_location, mock_bands) do
        get api_v1_bands_url, as: :json
        assert_response :success

        response_data = JSON.parse(@response.body)
        assert_equal 2, response_data.length
        assert_equal "Band A", response_data[0]["name"]
      end
    end

    mock_location.verify
    mock_bands.verify
  end
end
