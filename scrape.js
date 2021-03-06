var cheerio = require("cheerio")
var request = require("request")

var url = 'https://mlh.io/seasons/na-2017/events'

module.exports = function(fn) {
  request(url, function(err, resp, body) {
    if (err) {
      throw err
    }

    $ = cheerio.load(body)

    var events = []

    $(".event-wrapper" ).each(function(index) {
      var event = {}

      event.name = $(this).find("h3").text()
      event.date = $(this).find("p").first().text()
      event.location = $(this).find("p").last().text()

      events.push(event)
    })

    fn(events)
  })
}
