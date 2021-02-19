#!/usr/bin/env node
let cmds = process.argv.slice(2);
let fs = require("fs");

function wcat(cmds) {
  let allText = "";
  let options = cmds.filter((el) => el.startsWith("-"));

  let files = cmds.filter((el) => !el.startsWith("-"));

  for (x in files) {
    if (!fs.existsSync(files[x])) {
      console.log(files[x] + " does not exist");
      return;
    }
  }

  for (x in files) {
    allText += fs.readFileSync(files[x]);
  }
  allText = allText.split("\n");

  if (options.includes("-s")) {
    allText = allText.map((el, i) => {
      if (el === "" && allText[i - 1] === "") {
        return null;
      } else return el;
    });

    allText = allText.filter((el) => el != null);
  }

  if (options.includes("-n") && options.includes("-b")) {
    if (options.indexOf("-n") < options.indexOf("-b")) {
      addAllNum(allText);
    } else {
      addNonEmptyNum(allText);
    }
  } else {
    if (options.includes("-n")) {
      addAllNum(allText);
    }
    if (options.includes("-b")) {
      addNonEmptyNum(allText);
    }
  }

  console.log(allText.join("\n"));
}

wcat(cmds);

function addNonEmptyNum(allText) {
  let lineNumber = 1;
  for (x in allText) {
    if (allText[x] === "") {
      allText[x] = allText[x];
    } else {
      allText[x] = lineNumber + " " + allText[x];
      lineNumber++;
    }
  }
}


function addAllNum(allText) {
  let lineNumber = 1;
  for (x in allText) {
    allText[x] = lineNumber + " " + allText[x];
    lineNumber++;
  }
}
