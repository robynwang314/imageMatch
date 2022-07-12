# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


1. create app
rails new imageMatch --webpack=react --database=postgresql

2. config db/ variables etc

3. rails db:create

4. start server, check localhost:300

5. create a controller, action, route, views (views can be left alone and empty)

6. Add js_pack_tag pointing to the entrypoint- ex index.jsx into application.html.erb

7. add yarn start scripts into package.json, then yarn start

8. refresh page check contents of index.jsx is rendered

9. add puppeteer (https://developer.chrome.com/docs/puppeteer/get-started/)
  (https://javascript.plainenglish.io/scraping-for-images-using-puppeteer-9a3700bd5a2d)

10. create a new pack/entry point with scripts

11. call it from controller

12. add axios and create api calls