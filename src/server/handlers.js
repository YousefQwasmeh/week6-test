const { readFile } = require("fs");
const path = require("path");
const addCity = require("../database/queries/postData.js");
const getCities = require("../database/queries/getData.js");
const { parse } = require("querystring");
const alert = require("alert-node");

const serverError = (err, response) => {
  response.writeHead(500, "Content-Type:text/html");
  response.end("<h1>Sorry, there was a problem loading the homepage</h1>");
  console.log(err);
};

const homeHandler = response => {
  const filepath = path.join(__dirname, "..", "..", "public", "index.html");
  readFile(filepath, (err, file) => {
    if (err) return serverError(err, response);
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(file);
  });
};

const getCitiesHandler = response => {
  getCities((err, data) => {
    if (err) {
      response.writeHead(200, { "content-type": "application/JSON" });
      response.end("");
    }
    response.writeHead(200, { "content-type": "application/JSON" });
    response.end(JSON.stringify(data));
  });
};

const postCityHandler = (request, response) => {
  let body = "";
  request.on("data", chunk => {
    body += chunk.toString();
  });
  request.on("end", () => {
    const result = parse(body);
    body=body.split("&");
    const name=body[0].split("=")[1];
    const country=body[1].split("=")[1];
    addCity(name,country,(err)=>{
      if(err){
        alert("fail add the city");
        response.writeHead(302, {
          location: "/"
        });
        response.end();
      }
      response.writeHead(302, {
        location: "/"
      });
      response.end();
    })
  });
};

const publicHandler = (url, response) => {
  const filepath = path.join(__dirname, "..", "..", url);
  readFile(filepath, (err, file) => {
    if (err) return serverError(err, response);
    const extension = url.split(".")[1];
    const extensionType = {
      html: "text/html",
      js: "application/js",
      css: "text/css"
    };
    response.writeHead(200, { "content-type": extensionType[extension] });
    response.end(file);
  });
};

const errorHandler = response => {
  response.writeHead(404, { "content-type": "text/html" });
  response.end("<h1>404 Page Requested Cannot be Found</h1>");
};

module.exports = {
  homeHandler,
  getCitiesHandler,
  postCityHandler,
  publicHandler,
  errorHandler
};
