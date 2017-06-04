
module.exports = function(content){
  return `
    <html>
      <head>
        <style>
        .box {
float: left;
margin: 10px;
}
.after-box {
clear: left;
}
        </style>
      </head>
      <body>${content}</body>
    </html>
  `
}
