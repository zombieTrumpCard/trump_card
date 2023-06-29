const express = require("express");
const dotenv = require("dotenv");
const router = express.Router();

dotenv.config();

// const client_id = process.env.CLIENT_ID;
// const client_secret = process.env.CLIENT_SECRET;

const api_key = process.env.API_KEY;

// router.get("/search/encyc", function (req, res) {
//   const api_url =
//     "https://openapi.naver.com/v1/search/encyc?query=" +
//     encodeURI(req.query.word); // JSON 결과
//   const request = require("request");
//   const options = {
//     url: api_url,
//     headers: {
//       "X-Naver-Client-Id": client_id,
//       "X-Naver-Client-Secret": client_secret,
//     },
//   };
  router.get("/search/encyc", function (req, res) {
    const api_url =
    "https://stdict.korean.go.kr/api/search.do?key=" + api_key
    + "&req_type=json&q=" + encodeURI(req.query.word); // JSON 결과
    const request = require("request");
//   request.get(options, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
//       const data = JSON.parse(body);
//       if (!data.items[0].title) res.end("false");
//       const answer = data.items[0].title.replace(/<\/?b>/g, "");
//       if (answer === req.query.word) res.end("true");
//       else res.end("false");
//     } else {
//       res.status(response.statusCode).end();
//       console.log("error = " + response.statusCode);
//     }
//   });
// });
console.log(req.query.word);
request.get(api_url, function (error, response, body) {
if (!error && response.statusCode == 200 && body) {
    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });    
    const data = JSON.parse(body);
    const answer = data.channel.item[0].word.replace('-', '');
    if (answer === req.query.word){ res.end("true");}
  } else {
    res.end("false");
  }
});
});

module.exports = router;
