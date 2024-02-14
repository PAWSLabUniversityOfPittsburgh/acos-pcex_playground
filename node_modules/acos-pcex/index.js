var fs = require('fs');
var ACOS_PCEX = function () { };

ACOS_PCEX.addToHead = function (params) {
  return `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />

    <link rel="stylesheet" href="/static/acos-pcex/css/font-awesome.min.css">
    <link href="/static/acos-pcex/css/bootstrap.min.css" rel="stylesheet">

    <link rel="stylesheet" href="/static/acos-pcex/css/material-icons-font.css">
    <link rel="stylesheet" href="/static/acos-pcex/css/materialize.min.css">
    <link rel="stylesheet" href="/static/acos-pcex/css/jquery.webui-popover.min.css">
    <link href="/static/acos-pcex/css/mdb.min.css" rel="stylesheet">

    <link href="/static/acos-pcex/css/jquery-ui.min.css" rel="stylesheet">
    <link href="/static/acos-pcex/css/vs.css" rel="stylesheet">
    <link href="/static/acos-pcex/css/style.css?v=201711032305" rel="stylesheet">
  `;
};

ACOS_PCEX.addToBody = function (params) {
  return fs.readFileSync(__dirname + '/static/body.html', 'utf8');
};

ACOS_PCEX.initialize = function (req, params, handlers, cb) {
  // Initialize the content type
  params.headContent += ACOS_PCEX.addToHead(params);
  params.bodyContent += ACOS_PCEX.addToBody(params);

  // Initialize the content package
  handlers.contentPackages[req.params.contentPackage].initialize(req, params, handlers, function () {
    cb();
  });
};

ACOS_PCEX.handleEvent = function (event, payload, req, res, protocolPayload, responseObj, cb) {
  var dir = ACOS_PCEX.config.logDirectory + '/acos-pcex/' + req.params.contentPackage;
  // if (event === 'log') {
  //   fs.mkdir(dir, 0o775, function (err) {
  //     var name = payload.exampleId.replace(/\.|\/|\\|~/g, "-") + '.log';
  //     var data = new Date().toISOString() + ' ' + JSON.stringify(payload) + ' ' + JSON.stringify(protocolPayload || {}) + '\n';
  //     fs.writeFile(dir + '/' + name, data, { flag: 'a' }, function (err) {
  //       cb(event, payload, req, res, protocolPayload, responseObj);
  //     });
  //   });
  // } else {
  cb(event, payload, req, res, protocolPayload, responseObj);
  // }
};

ACOS_PCEX.register = function (handlers, app, conf) {
  handlers.contentTypes['acos-pcex'] = ACOS_PCEX;
  fs.mkdir(conf.logDirectory + '/acos-pcex', 0o775, function (err) { });
  ACOS_PCEX.config = conf;
};

ACOS_PCEX.namespace = 'acos-pcex';
ACOS_PCEX.installedContentPackages = [];
ACOS_PCEX.packageType = 'content-type';

ACOS_PCEX.meta = {
  'name': 'acos-pcex',
  'shortDescription': 'Content type for acos-pcex examples.',
  'description': '',
  'author': 'Mohammad Hassany',
  'license': 'MIT',
  'version': '0.0.1',
  'url': ''
};

module.exports = ACOS_PCEX;
