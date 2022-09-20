class ImagesController < ApplicationController

  def index
    @images = Image.all
    render json: @images
  end

  def create
    byebug
    @Image = Image.create(image_params)
  end 

  # def call_puppeteer_screenshot
  #   system("node app/javascript/puppeteerScreenshot.js #{Shellwords.escape("https://google.com")} #{Shellwords.escape("https://static01.nyt.com/images/2021/02/07/fashion/NEW-BLUE-1/NEW-BLUE-1-superJumbo.jpg")} #{Shellwords.escape("puppeteer.pdf")}")
  # end

  def reverse_image_url_search
    # for screenshots below
    # stuff = system("node app/javascript/puppeteerScreenshot.js #{Shellwords.escape(params[:website_url])} #{Shellwords.escape(params[:image_url])} #{Shellwords.escape("puppeteer.pdf")}")
 
    system("node app/javascript/puppeteerScreenshot.js #{Shellwords.escape(params[:website_url])} #{Shellwords.escape(params[:image_url])}")
  end

  private 

  def image_params
    params.permit(:image_file)
  end

end
