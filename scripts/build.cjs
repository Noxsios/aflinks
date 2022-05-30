const fs = require("fs");
const glob = require("glob");

const htmlFiles = glob.sync("static/**/*.html");

const minifyHtml = require("@minify-html/js");
const cfg = minifyHtml.createConfiguration({ keep_spaces_between_attributes: true, keep_comments: true, minify_css: true, minify_js: true });

htmlFiles.forEach((file) => {
  let html = fs.readFileSync(file, "utf8");
  const attribution = `
  <!-- https://razzle.cloud -->
  `;
  html = attribution + html;
  const minified = minifyHtml.minify(html, cfg);
  fs.writeFileSync(file, minified);
});

fs.rmSync("static/css/base.css");
