class MainController < ApplicationController
  def index
    system("node app/javascript/puppeteerScreenshot.js #{Shellwords.escape("https://google.com")} #{Shellwords.escape("output.pdf")}")
  end
end
