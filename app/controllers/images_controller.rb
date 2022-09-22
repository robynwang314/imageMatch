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


  
######################## NEXT STEPS ############################

# next steps: call puppeteerPng.js

###### (A) FOR GOOGLE REVERSE IMAGE SEARCH:
# instead of saving results as a screen shot
# grab the full page html and parse results... ?
# or grab the full page html, return the link of image with matching base URL from the one entered on webpage

###### (B) FOR OTHER WEBSITES
# try to see if theres an image matching tool like percy 
# return the link of the matched image

###### FURTHER DOWN THE LINE
# expand functionality out to ticketmaster and such

###### CLEAN UP
# need to figure out validations for if screenshot is already in active storage or to purge after each search

# front end stuff
# return search results


# then... moving beyond google
# match image on a given website


########## IN THEORY ##########
# google
# 1. user submits a website url
# 2. user uploads a screen shot
# 3. screenshot gets saved into db
# 4. which gets transformed into a png_file that gets saved into the same directory as this project (stored_screenshot.png)
# 5. call method (tbd) that calls something like 
  # system("node app/javascript/puppeteerPng.js #{Shellwords.escape("https://lens.google.com/search?p")} #{Shellwords.escape("https://static01.nyt.com/images/2021/02/07/fashion/NEW-BLUE-1/NEW-BLUE-1-superJumbo.jpg")} #{Shellwords.escape("puppeteerPNG.pdf")}")
# ^^ needs clean up on the params
# and then that file generates a screenshot.(for right now)
# then ideally, re (A) and (B) above

######################## END NEXT STEPS ############################




  # def call_puppeteer_screenshot
  # system("node app/javascript/puppeteerPng.js #{Shellwords.escape("https://lens.google.com/search?p")} #{Shellwords.escape("https://static01.nyt.com/images/2021/02/07/fashion/NEW-BLUE-1/NEW-BLUE-1-superJumbo.jpg")} #{Shellwords.escape("puppeteerPNG.pdf")}")

    # respond_with(@Image, root: false, location: false, serializer: ImageSerializer)
  # end

  # maybe use transform_screenshot_into_png_file
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

