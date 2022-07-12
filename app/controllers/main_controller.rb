class MainController < ApplicationController
  def index
   
  end

  def call_puppeteer
    system("node app/javascript/puppeteerScreenshot.js #{Shellwords.escape("https://google.com")} #{Shellwords.escape("puppeteer.pdf")}")
  end

end
