#!/usr/bin/env node

// **this code is only meant for teachers students need to be taught using normal for loop without use of higher order functions**


//1
//taking command-line input from user and removing useless info from array
let cmds = process.argv.slice(2);
let fs = require("fs");

//2
//Main function
function wcat(cmds) {
  let allText = "";

  //3
  //filter options and filenames into 2 different arrays => files and options 

  let options = cmds.filter((el) => el.startsWith("-"));

  let files = cmds.filter((el) => !el.startsWith("-"));

  //4
  //Check if all files required by user exists in the given directory if not stop execution and print "file does not exist".
  for (x in files) {
    if (!fs.existsSync(files[x])) {
      console.log(files[x] + " does not exist");
      return;
    }
  }

  //5
  //Read all files and concat their content in allText variable
  for (x in files) {
    allText += fs.readFileSync(files[x]);
  }

  //6
  //Split the content on line-break
  allText = allText.split("\n");

  //7
  //check if option -s is present
  if (options.includes("-s")) {
    //This code remove extra empty spaces from the splitted array
    //ex=> arr = ['a',"","","",'b'] it will give ['a',"",'b']
    //vs code sometimes uses \r instead of "".
    allText = allText.map((el, i) => {
      if (
        (el === "" && allText[i - 1] === "") ||
        (el === "\r" && allText[i - 1] === "\r")
      ) {
        return null;
      } else return el;
    });

    allText = allText.filter((el) => el != null);
  }

  //8
  //This used to check precedence of 2 non-mutual exclusive options => -n and -b
  if (options.includes("-n") && options.includes("-b")) {
    //10
    //if -n is entered before -b use it or vice versa
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

  //11
  // simply join the array after performing all operations and print it  
  console.log(allText.join("\n"));
}

wcat(cmds);



//9
//Helper Functions

//9-A
//this function adds number to non-empty lines
function addNonEmptyNum(allText) {
  let lineNumber = 1;
  for (x in allText) {
    if (allText[x] === '' || allText[x]==='\r') {
      allText[x] = allText[x];
    } else {
      allText[x] = lineNumber + " " + allText[x];
      lineNumber++;
    }
  }
}


//9-B
//this function adds number to every line
function addAllNum(allText) {
  let lineNumber = 1;
  for (x in allText) {
    allText[x] = lineNumber + " " + allText[x];
    lineNumber++;
  }
}
