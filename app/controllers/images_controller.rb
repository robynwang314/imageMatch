class ImagesController < ApplicationController
require 'puppeteer'
respond_to :html, :json, :png

  def index
    @images = Image.all
    render json: @images
  end

  def create
    @Image = Image.create(image_params)

    render json: @Image
  end 

  # def call_puppeteer_screenshot
  #   system("node app/javascript/puppeteerScreenshot.js #{Shellwords.escape("https://google.com")} #{Shellwords.escape("https://static01.nyt.com/images/2021/02/07/fashion/NEW-BLUE-1/NEW-BLUE-1-superJumbo.jpg")} #{Shellwords.escape("puppeteer.pdf")}")

    # respond_with(@Image, root: false, location: false, serializer: ImageSerializer)
  # end

  def generate_image_file_from_screenshot
    # refer below:
    # https://stackoverflow.com/questions/58812500/httparty-response-get-image-and-convert-bytes-to-base64-image-data-url
    # https://stackoverflow.com/questions/15995015/open-and-save-base64-encoded-image-data-uri-in-ruby


    img = HTTParty.get(params[:stored_image])
    base64_img = Base64.encode64(img)
    # base64_img = Base64.strict_encode64(img)
    data_url = 'data:image/png;base64,' + base64_img
    png      = Base64.decode64(data_url['data:image/png;base64,'.length .. -1])
    File.open('stored_screenshot.png', 'wb') { |f| f.write(png) }
  end

  def reverse_image_url_search
    # for screenshots below
    # stuff = system("node app/javascript/puppeteerScreenshot.js #{Shellwords.escape(params[:website_url])} #{Shellwords.escape(params[:image_url])} #{Shellwords.escape("puppeteer.pdf")}")
 

    # # tryiing to move this to the back end
    # Puppeteer.launch(headless: true) do |browser|
    #   page = browser.pages.first || browser.new_page
    #   page.goto(params[:website_url], timeout: 0, wait_until: "networkidle2")

    #   page.wait_for_selector('input[title=Search]')

     

    #   page.screenshot(path: "puppeteer.png")
    # end


    system("node app/javascript/puppeteerScreenshot.js #{Shellwords.escape(params[:website_url])} #{Shellwords.escape(params[:image_url])}")
  end

  private 

  def image_params
    params.permit(:image_file)
  end

end


# next steps: call puppeteerScreenshot.js
# but instead of loading urls, load png file

# need to figure out validations for if screenshot is already in active storage or to purge after each search

# front end stuff
# return search results


# then... moving beyond google
# match image on a given website
