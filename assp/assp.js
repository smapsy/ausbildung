//Asset Packager
var fs = require('fs')
var path = require('path')


function processFile(file) {
  var args = file
  var endings = [".js", ".js.coffee", ".css", ".css.less", ".jst.eco", ".css.scss"]
  var pfad = path.dirname(args)
  var newEnding = ""
  //console.log(pfad)

  //Datei kann mit oder ohne Endung eingegeben werden

  if (fs.existsSync(args)) {
    newEnding = ""
  } else {

    for (var i = 0; i < endings.length; i++) {
      if (fs.existsSync(args + endings[i])) {
        newEnding = endings[i]
        break
      }
    }
  }

   var trueEnding = path.extname(args + newEnding)

  //Inhalt der Datei Ausgeben, wenn sie existiert

  try {
    var datei = fs.readFileSync(args + newEnding, { encoding: "utf8" })
  }
  catch (err) {
    console.log(args + " nicht vorhanden")
    process.exit(-1)
  }

  switch (trueEnding) {
    case ".less":
      datei = transformLess(datei, pfad)
      break;
    case ".coffee":
      datei = transformCoffee(datei)
      break;
    case ".scss":
      datei = transformScss(datei)
      break;
    case ".eco":
      datei = transformEco(datei, pfad)
      break;
  }

  //Mit RegEx nach require und Pfad suchen  

  var regex1 = /^\s?(?:#=|\/\/=|\*=).(require(?:(?:_self)|(?:_tree))?)(?: (.*))?$/gm
  var match
  var datei2 = datei
  var reqBlock = ""
  var reqTree = ""
  var checkReqSelf = false


  //Switch über die verschiedenen require Arten, und wenn es sich um require handelt, dann die Funktion mit Pfad + Datei und rückgabe and Dateiinhalt Vorhängen.
  //Rekursion sich selbst aufrufende Funktion; Datei 2 um mit exec nicht die Datei aufzurufen, die dann geändert wird

  while ((match = regex1.exec(datei2)) !== null) {
    var require = match[0]
    var requireType = match[1]
    var requireFile = match[2]

    //Pfad zusammensetzen aus pfad und requireFile; falls requireFile nicht vorhanden wegen require_self, leeren string anfügen
    var pfadFolder = path.join(pfad, requireFile ? requireFile : "")
    //console.log(match1, match2)

    switch (requireType) {
      case "require":
        reqBlock = reqBlock + processFile(pfadFolder) + "\n"
        break;
      case "require_self":
        checkReqSelf = true
        reqBlock = reqBlock + datei
        break;
      case "require_tree":
        reqBlock = reqBlock + processFolder(pfadFolder) + "\n"
        break;
    }

  }
  if (checkReqSelf) {
    datei = reqBlock
  } else {
    datei = reqBlock + datei
  }

  return datei
  //return reqBlock
}

function processFolder(folder) {
  var tree = fs.readdirSync(folder, { encoding: "utf8" })
  var folderBlock = ""

  for (var i = 0; i < tree.length; i++) {
    var pfad = path.join(folder, tree[i])

    if (fs.lstatSync(pfad).isDirectory()) {
      folderBlock = folderBlock + processFolder(pfad) + "\n"
    } else {
      folderBlock = folderBlock + processFile(pfad) + "\n"
    }
  }

  return folderBlock
}

function transformLess(file, pfad) {
  return file + "\n" + "//LESS Datei mit Pfad " + pfad
}

function transformCoffee(file) {
  return file + "\n" + "//COFFEE Datei"
}

function transformScss(file) {
  return file + "\n" + "//SCSS Datei"
}

function transformEco(file, pfad) {
  return file + "\n" + "//ECO Datei mit Pfad " + pfad + " und Dateiname "
}

var output = processFile(process.argv[2])
//var output = processFolder(process.argv[2])
//var output = transformLess(process.argv[2])

console.log(output)

// KISS DRY