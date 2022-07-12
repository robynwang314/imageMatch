class MainController < ApplicationController
  def index
   
  end

  def call_puppeteer_screenshot
    system("node app/javascript/puppeteerScreenshot.js #{Shellwords.escape("https://google.com")} #{Shellwords.escape("puppeteer.pdf")}")
  end

  def reverse_image_url_search
    system("node app/javascript/puppeteerScreenshot.js #{Shellwords.escape("https://google.com")} #{Shellwords.escape(params[:image_url])}")
  end

end
