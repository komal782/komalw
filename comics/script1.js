var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
ctx.font = "12px Helvetica";

var node = document.getElementById('test');


//rectangle variables
var stx = 10;
var sty = 10;
var w = 230;
var h = 260;
var num = 6;

var effects = ['nausea', 'vomit', 'eyes', 'swelling', 'bruised', 'bleeding', 'headaches', 'flu', 'allergic', 'blistering', 'dialysis', 'work', 'relationships', 'catheter', 'family', 'aches', 'insomnia', 'fatigue', 'friends'];


//testCaseIndex = 0;
// the title screen, where the doctor chooses patient and stuff
console.log(localStorage);
function docimg() {
  var doc = document.getElementById('doctor');
  if (doc.options[doc.selectedIndex].value === null) {
    localStorage.setItem('doc', 'opt1');
  }
  else {
    localStorage.setItem('doc', doc.options[doc.selectedIndex].value);
  }
  var doctor = doc.options[doc.selectedIndex].value;

  //localStorage.setItem('doc', doc.options[doc.selectedIndex].value);
  var el = document.getElementById("docimg");
  el.src = "people/" + doctor + "notalk.png";

  console.log(doc.options[doc.selectedIndex].value);
}

function titlePage() {
  
  //localStorage.clear();
  var gen = document.getElementById('gender');
  if (gen.options[gen.selectedIndex].value === null) {
    localStorage.setItem('gender', 'male');
  }
  else {
    localStorage.setItem('gender', gen.options[gen.selectedIndex].value);
  }
  var gender= gen.options[gen.selectedIndex].value;

  var hai = document.getElementById('hair');
  if (hai.options[hai.selectedIndex].value === null) {
    localStorage.setItem('hair', 'black');
  }
  else {
    localStorage.setItem('hair', hai.options[hai.selectedIndex].value);
  }
  var hair = hai.options[hai.selectedIndex].value;

  var elem = document.getElementById("patimg");

  elem.src = "people/" + gender + "-" + hair + ".png";
  console.log(gen.options[gen.selectedIndex].value, hai.options[hai.selectedIndex].value)


}

function showimg() {
  var n = document.getElementById('pimg');
  n.src = "people/" + localStorage.getItem('gender') + "-" + localStorage.getItem('hair') + ".png";
  var m = document.getElementById('dimg');
  m.src = "people/" + localStorage.getItem('doc') + "notalk.png";
}

//create the boxes, starting x and y coordinates and the width and height, and how many boxes (length of bubble array)
//and array, first index is the box, the second is starting x and y positions and the height and width
//change this so that the boxes are about a page long, create a new canvas (4 rows fit on one page atm)
var box = {};
function boxes(stx, sty, w, h, num) {
  ctx.beginPath();

  //if there is only 3 boxes to fill
  if (num <= 3) {
    for (var i = 0; i < num; i++) {
      if(name in box == false){
        box[i] = {};
      }
      ctx.rect(stx+(i*w)+(i*10), sty, w, h);
      box[i] = {strtx: stx+(i*w)+(i*10), strty: sty, width: w, height: h};
    }
  }

  //if there are more to fill
  else if (num > 3){
    var count = 0;
    var hcount = 1;
    var j = 0;
    var row = 0;
    var canum = 2;

    while (num > 0) { 

      if (num < 3) {
        var n = num;
        for (var i = 0; i < n; i++) {
          if(name in box == false){
            box[count] = {};
          }
          ctx.rect(stx+(i*w)+(i*10), sty, w, h);
          box[count] = {strtx: stx+(i*w)+(i*10), strty: sty, width: w, height: h};
          count = count +1;
          num = num - 1;
        }
      }

      else if (num >= 3){
        for (var i = 0; i < 3; i++) {
          if(name in box == false){
            box[count] = {};
          }
          ctx.rect(stx+(i*w)+(i*10), sty, w, h);
          box[count] = {strtx: stx+(i*w)+(i*10), strty: sty, width: w, height: h};
          count = count +1;
          num = num - 1;
        }
      }
      //go to next row
      row = row +1;
      sty = sty+(hcount*h)+(hcount*10);

    }

  }
  

  ctx.closePath();
  // the outline
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'black';
  ctx.stroke();
  
  // the fill color
  ctx.fillStyle = "white";
  ctx.fill();

  return box;
}

 
// the outline
ctx.lineWidth = 5;
ctx.strokeStyle = 'black';
ctx.stroke();
 
// the fill color
ctx.fillStyle = "white";
ctx.fill();

//setInterval(
//function () {
    //var text = testCases[testCaseIndex]
    var text = node.textContent;
    
   // ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    var fontHeight = getTextHeight(text, ctx.font);
    //component(ctx, ctx.measureText(text).width, fontHeight, "lightgrey", 10, 10, 5, text);
    
    //testCaseIndex = (testCaseIndex + 1) % testCases.length;
//}, 2000)


/*function component(ctx, width, height, color, x, y, radius, text)
{
  var maxWidth = 150;
  var r = radius;
  var w = (width > maxWidth ? maxWidth : width) + 40;
  var h = ((width > maxWidth ? Math.ceil(width / maxWidth) : 1) * height) + 40;
  var pi2 = Math.PI * 2;
  var ap = w - 32;
  var aw = 20;
  var ah = 10;


  // Speechbubble create start
  
  ctx.beginPath();
  ctx.arc(r, r, r, pi2 * 0.5, pi2 * 0.75);
  ctx.arc(w - r, r, r, pi2 * 0.75, pi2);
  ctx.arc(w - r, h - r, r, 0, pi2 * 0.25);
  ctx.lineTo(w - ap, h);
  ctx.lineTo(w - ap - (aw / 2), h + ah);
  ctx.lineTo(w - ap - aw, h);
  ctx.arc(r, h - r, r, pi2 * 0.25, pi2 * 0.5);
  ctx.fillStyle = color;
  ctx.fill();

} */

// Function to get the height of the text
function getTextHeight(txt, font)
{
  var el = document.createElement('div'), height;
  el.style.cssText = "position:fixed; padding:0; left:-9999px; top:-9999px; font:" + font;
  el.textContent = txt;

  document.body.appendChild(el);
  height = parseInt(getComputedStyle(el).getPropertyValue('height'), 10);
  document.body.removeChild(el);

  return height;
}


//adds the pictures and the text onto the canvas
function addComic() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById('overlay').innerHTML = "";
  //get the text data
  var texts = document.getElementById("ta").value;
  var texts1 = document.getElementById("tas").value;
  var texts2 = document.getElementById("tam").value;
  var tst0 = texts.split(/\n\s*\n/);
  var tst1 = texts1.split(/\n\s*\n/);
  var tst2 = texts2.split(/\n\s*\n/);
  
  var tst = [];
  if (document.getElementById("ttle").value != "") {
    tst.push("0title0");
  }
  if (document.getElementById("ta").value != "") {
    for (var i=0; i < tst0.length; i++) {
      tst.push(tst0[i]);
    }
  }
  if(document.getElementById("tas").value != "") {
    tst.push("sdeff");
    for (var i=0; i < tst1.length; i++) {
      tst.push(tst1[i]);
   }
  }
  if (document.getElementById("tam").value != "") {
    if (document.getElementById("anyelse").value != "") {
      tst.push("0else0");
    }
    for (var i=0; i < tst2.length; i++) {
      tst.push(tst2[i]);
    }
  } 
  tst.push("0end0");

  var str = null;
  var testCases = [];
  for (var i =0; i < tst.length; i++) {
    str = tst[i];
    testCases.push(str.split(/\r?\n/));
  }
  var box = boxes(stx, sty, w, h, testCases.length)
  console.log(box);
  addback(box, testCases.length, testCases);
  console.log(testCases);

  var pposition = 3;
  var dposition = 3;
  var pheight = 0;
  var pwidth = 0;
  var dheight = 0;
  var dwidth = 0;

  var xstart = 0;
  var ystart = 0;

  document.getElementById('ta').style.borderColor = "";
  for (var i = 0; i < testCases.length; i++) {
    if (testCases[i].length > 2) {
      alert("Please only enter one dialogue for doctor and patient per panel");
      document.getElementById('ta').style.borderColor = "red";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      document.getElementById('overlay').innerHTML = "";
      break;
    }
    for (var j = 0; j < testCases[i].length; j++){

      if (testCases[i][j] === "0title0") {
        addTitle(box, testCases, i, j, document.getElementById("ttle").value);
       // testCases[i][j] = document.getElementById("ttle").value;
      }

      else if (testCases[i][j] === "sdeff") {
        //testCases[i][j] = "Side Effects";
        addTitle(box, testCases, i, j, "Side Effects");
      }

      else if (testCases[i][j] === "0else0") {
        //testCases[i][j] = document.getElementById("anyelse").value;
        addTitle(box, testCases, i, j, document.getElementById("anyelse").value);
      }

      else if (testCases[i][j] === "0end0") {
        //testCases[i][j] = "The End";
        addTitle(box, testCases, i, j, "The End");
      }

      else if (testCases[i][j].charAt(0) === "-") {
          console.log(dheight,dwidth);
          newdiv = addTextDoc(box, testCases, i, j, dheight, dwidth);

          pheight = newdiv.offsetHeight;
          pwidth = newdiv.offsetWidth;
      }
    
      else if (testCases[i][j].charAt(0) === "=") {
          newdiv2 = addTextPat(box, testCases, i, j, pheight, pwidth);
          
          dheight = newdiv2.offsetHeight;
          dwidth = newdiv2.offsetWidth;
      }
        //for just the doctor talking (narration style) with only the person
      else {
          addTextNarr(box, testCases, i, j);
      }
      
    }
    pposition += 210;
    dposition += 210;
    pheight = 0;
    dheight = 0;
  }

}

function addTextDoc(box, testCases, i, j, pheight, pwidth) {
  var newdiv = document.createElement("div");
  
  var para = document.createElement("p");
  var node = document.createTextNode(testCases[i][j].slice(1));
  para.appendChild(node);
  para.setAttribute("id", "outputp");
  para.style = "margin: 0; text-align: center"
  newdiv.appendChild(para);
  if (node.length === 1 || node.length === 0) {
   newdiv.className = "draggable"; 
  }
  else {
    newdiv.className = "bubble bottom" + " draggable";
  }

  newdiv.style = "position: absolute; top:" + box[i]['strty'] + "px; left:" + box[i]['strtx'] + "px;";
  
  var element = document.getElementById("overlay");
  element.appendChild(newdiv);

  if (pwidth + newdiv.offsetWidth <= box[i]['width'] - 8) {
    endp = box[i]['strtx'] + box[i]['width'];
    newpos = endp - newdiv.offsetWidth - 9;
    newdiv.style = "position: absolute; top:" + box[i]['strty'] + "px;" + "left:" + box[i]['strtx'] + "px;";
  }
  else {
    endp = box[i]['strtx'] + box[i]['width'];
    newpos = endp - newdiv.offsetWidth - 9;
    newhet = box[i]['strty'] + pheight;
    newdiv.style = "position: absolute; top:" + newhet + "px;" + "left:" + box[i]['strtx'] + "px;";
  }

  if (testCases[i].length === 1) {
    addPic(box[i]['strtx'], box[i]['strty'], box[i]['width'], box[i]['height'], true, null, true);
  }
  else {
    addPic(box[i]['strtx'], box[i]['strty'], box[i]['width'], box[i]['height'], true, null, false, null, true);
  }

  return newdiv;
}

function addTextPat(box, testCases, i, j, pheight, pwidth) {
  var newdiv = document.createElement("div");

  var para = document.createElement("p");
  var node = document.createTextNode(testCases[i][j].slice(1));
  para.appendChild(node);
  para.setAttribute("id", "outputd");
  para.style = "margin: 0; text-align: center"
  newdiv.appendChild(para);
  if (node.length === 1 || node.length === 0) {
    newdiv.className = "draggable"; 
   }
   else {
     newdiv.className = "bubble left-bottom" + " draggable";
   }

  var element = document.getElementById("overlay");
  element.appendChild(newdiv);

  //find the new postition of the doctor bubble when the first bubble has been added
  //if they are small enough to fit in the same line
  if (pwidth + newdiv.offsetWidth <= box[i]['width'] - 8) {
    endp = box[i]['strtx'] + box[i]['width'];
    newpos = endp - newdiv.offsetWidth - 9;
    newdiv.style = "position: absolute; top:" + box[i]['strty'] + "px;" + "left:" + newpos + "px;";
  }
  //otherwise on a new line
  else {
    endp = box[i]['strtx'] + box[i]['width'];
    newpos = endp - newdiv.offsetWidth - 9;
    newhet = box[i]['strty'] + pheight;
    newdiv.style = "position: absolute; top:" + newhet + "px;" + "left:" + newpos + "px;";
  }
  if (testCases[i].length === 1) {
    addPic(box[i]['strtx'], box[i]['strty'], box[i]['width'], box[i]['height'], false, null, false, null, true);
    addPic(box[i]['strtx'], box[i]['strty'], box[i]['width'], box[i]['height'], true, null, false, null, false);
  }
  else if (testCases[i].length === 2) {
    addPic(box[i]['strtx'], box[i]['strty'], box[i]['width'], box[i]['height'], false, null, false, null, true);
    addPic(box[i]['strtx'], box[i]['strty'], box[i]['width'], box[i]['height'], true, null, false, null, true);
  }
  //do an if statement to see if the array is length 1 or 2, if it is 1 then make the doctor not talking (only patient is talking), other wise the doctor talks

  return newdiv;
}

function addTextNarr(box, testCases, i, j) {
  var newdiv = document.createElement("div");

  var para = document.createElement("p");
  var node = document.createTextNode(testCases[i][j].slice(0));
  para.appendChild(node);
  para.style = "margin: 0; text-align: center; width:" + box[i]['width'] + "px;";
  newdiv.appendChild(para);
  
  var element = document.getElementById("overlay");
  element.appendChild(newdiv);
  newdiv.className = "narr";
  newdiv.style = "position: absolute; top:" + box[i]['strty'] + "px; left:" + box[i]['strtx'] + "px;";

  addPic(box[i]['strtx'], box[i]['strty'], box[i]['width'], box[i]['height'], false, testCases[i][j], false ,newdiv.offsetHeight);
}


//parameters (startx, starty, width, height, whether its the doctor or not (T or F), the line that is being spoken <-- all of the panels
function addPic(x, y, w, h, doc, sent, alone, nd, talk) {

  //console.log(localStorage.getItem('gender'),localStorage.getItem('hair'))
  var doctor = localStorage.getItem('doc');
  var gender = localStorage.getItem('gender');
  var hair = localStorage.getItem('hair')
  if ( doc ) {
    if (alone) {
      var picdiv = document.createElement("div");
      var elem = document.createElement("img");
      elem.src = "people/" + doctor + "close.png"; 

      picdiv.setAttribute("id", "img");
      picdiv.appendChild(elem);
      elem.style = "height: 300px;";
      var element = document.getElementById("overlay");
      element.appendChild(picdiv);
      var ele = document.getElementById("canvas-wrap");
          ele.appendChild(element);
    
      var pd = document.getElementById("img");
      var left = x + 5;
      var t = y;
      //hard coded the height (will make all images the same hight and width)
      var top = t - 40;
      picdiv.style = "position: absolute; top:" + top + "px; left:" + left + "px;";
    }
    else {

    var picdiv = document.createElement("div");
    var elem = document.createElement("img");
    if (talk) {
      elem.src = "people/" + doctor + ".png";
    }
    else {
      elem.src = "people/" + doctor + "notalk.png";
    }
  
    picdiv.setAttribute("id", "img");
    picdiv.appendChild(elem);
    var element = document.getElementById("overlay");
    element.appendChild(picdiv);
    var ele = document.getElementById("canvas-wrap");
        ele.appendChild(element);
  
    var pd = document.getElementById("img");
    var left = x + 5;
    var t = y + h;
    //hard coded the height (will make all images the same hight and width)
    var top = t - 180;
    picdiv.style = "position: absolute; top:" + top + "px; left:" + left + "px;";
    }
  }
  
  else { //width 60px
    //see if doc is talking, if not then add the doc not talking
    var picdiv = document.createElement("div");
    var elem = document.createElement("img");
    //get the image from the user input
    //var imgpath = "people/" + gender + "-" + hair ".png";
    if (talk) {
      elem.src = "people/" + gender + "-" + hair + "-talk.png";
    }
    else {
      elem.src = "people/" + gender + "-" + hair + ".png";
    }
    

    if (sent != null) {
      //go through the string that was sent
      //find "keywords" (eg, vomit)
      //show the picture that shows that sentence the best
      var words = sent.split(" ");
      console.log(words);
      for (var i =0; i < words.length; i++) {
        if( effects.includes(words[i])) {
          var eff = effects.indexOf(words[i]);
          elem.src = "people/" + gender + "-" + hair + "-" + effects[eff] + ".png"; //*****************************************/
        }
      }

      picdiv.setAttribute("id", "img"+effects[eff]);
      picdiv.appendChild(elem);

      var element = document.getElementById("overlay");
      element.appendChild(picdiv);
      var ele = document.getElementById("canvas-wrap");
      ele.appendChild(element);

      if (effects[eff] === 'family' || effects[eff] === 'friends') {
        var top = y + nd;
        var u = x + (w/2);
        var left = u - 95;
        picdiv.style = "position: absolute; top:" + top + "px; left:" + left + "px;";
      }
      else if (effects[eff] === 'work') {
        elem.style = "height: 145px";
        var t = y + h;
        var top = t - 145;
        var u = x + (w/2);
        var left = u - 105;
        picdiv.style = "position: absolute; top:" + top + "px; left:" + left + "px;";
      }
      else if(effects[eff] === 'insomnia'){
        elem.style = "height:" + h + "px; width: " + w + "px;";
        picdiv.style = "position: absolute; top:" + y + "px; left:" + x + "px;";
      }
      else if (effects[eff] === 'dialysis') {
        elem.style = "height: 255px";
        var top = y + 10;
        var left = x + 20;
        picdiv.style = "position: absolute; top:" + top + "px; left:" + left + "px;";
      }
      else {
      //get pos if nd (newdiv) and then add the pic according to that 
      var top = y + nd;
      var u = x + (w/2);
      var left = u - 75;
      picdiv.style = "position: absolute; top:" + top + "px; left:" + left + "px;";
      }

    }
    else {
      picdiv.setAttribute("id", "img");
      picdiv.appendChild(elem);
      var element = document.getElementById("overlay");
      element.appendChild(picdiv);
      var ele = document.getElementById("canvas-wrap");
          ele.appendChild(element);
    
      var pd = document.getElementById("img");
      var u = x + w;
      var left = u - 110;
      var t = y + h;
      //hard coded the height (will make all images the same hight and width)
      var top = t - 180;
      picdiv.style = "position: absolute; top:" + top + "px; left:" + left + "px;";
    }
    //add a way so that when its just the doctor it is a zoom in on just the face and not the whole body
    //add different styles for the different side effects
  }
}

function addback(b, len, tc) {
  for (var i = 0; i < len; i++) {
    var picdiv = document.createElement("div");
    var elem = document.createElement("img");

    if (tc[i][0].charAt(0) === "=" || tc[i][0].charAt(0) === "-") {
      elem.src = "background/background.png";
    }
    else if (tc[i][0] === "0title0" || tc[i][0] === "sdeff" || tc[i][0] === "0else0" || tc[i][0] === "0end0") {
      elem.src = "background/titlebackground.png";
    }
    else {
      elem.src = "background/roombackground.png";
    }
    
    picdiv.appendChild(elem);
    elem.style = "height:" + b[i]['height'] + "px ; width: " + b[i]['width'] + "px;";


    var element = document.getElementById("overlay");
    element.appendChild(picdiv);
    var ele = document.getElementById("canvas-wrap");
    ele.appendChild(element);


    picdiv.style = "position: absolute; top:" + b[i]['strty'] + "px; left:" + b[i]['strtx'] + "px;";
  }
}


function addTitle(b, tc, i, j, value) {

  var newdiv = document.createElement("div");

  var para = document.createElement("p");
  var node = document.createTextNode(value);
  para.appendChild(node);
  para.style = "margin: 0; text-align: center; width:" + b[i]['width'] + "px;";
  newdiv.appendChild(para);
  
  var element = document.getElementById("overlay");
  element.appendChild(newdiv);

  var h = newdiv.offsetHeight;
  var mid = b[i]['height']/2;
  var pos = mid - h;
  var sp = b[i]['strty'] + pos;

  newdiv.style = "position: absolute; top:" + sp + "px; left:" + b[i]['strtx'] + "px; font-size: 24px; font-weight: bold;";
}

function delText() {
  //document.getElementById("ta").value = ""; 
  location.reload();
}



    //create a pdf and add a new page for every new canvas that is there 
function genPDF()
    {
     html2canvas(document.getElementById('canvas-wrap'),{
     onrendered:function(canvas){
  
            var img = canvas.toDataURL("image/png");
            var doc = new jsPDF();
           doc.deletePage(1); 
           //doc.addPage(null, document.getElementById('overlay').offsetHeight);
           doc.addPage();
           doc.addImage(img,'PNG',10,5);
           doc.save('test.pdf');
           //crop the image and then add that crop onto the pdf, continue this until the end of the div
     }
  
     });
}

    //test function to copy
    function copy() {
      /* Get the text field */
      var copyText = document.getElementById("ta");
    
      /* Select the text field */
      copyText.select();
    
      /* Copy the text inside the text field */
      document.execCommand("copy");
  
    }

    //function clr() {
      //localStorage.clear();
   // }



//************************************************************************************************************************************* */
function deletesaved() {
  var elem = document.getElementById("saves");
  var node = document.createTextNode("Select the ones you want to delete, then click delete");
  elem.appendChild(node);

  var els = document.querySelectorAll('.loadbutton');

  for (var i = 0; i < els.length; i++) {
    var el = document.getElementById('load' + i);
    var bttn = document.createElement("button");
    var nde = document.createTextNode("X");
    bttn.appendChild(nde);
    el.appendChild(bttn);
    bttn.className = "del";
  }

  $(".loadbutton").click(function(){
    var id = $(this).attr('id');
  })

}

var loadvalue;
function savedfiles() {
      // Get the modal
      var modal = document.getElementById('savedlist');
      // When the user clicks the button, open the modal 
      modal.style.display = "block";
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = "none";
          }
      }
      var keys = Object.keys(localStorage);
      console.log(keys);
      var elem = document.getElementById("saves");
      // put the saves in a list for  user to access in load screen
      for (var i = 0; i < keys.length; i++ ) {
        if (keys[i] != 'doc' && keys[i] != 'gender' && keys[i] != 'hair' && elem.innerHTML.indexOf(keys[i]) === -1) {
          var newdiv = document.createElement("div");
          var para = document.createElement("button");
          var node = document.createTextNode(keys[i]);
          para.appendChild(node);
          newdiv.appendChild(para);
          elem.appendChild(newdiv);
          newdiv.id = "load" + i;
          para.className = 'loadbutton';
          para.id = keys[i];
        }
      }
}

function closemodal() {
  var modal = document.getElementById('savedlist');
  modal.style.display = "none";
}

;(function($) {
  $.fn.toJSON = function() {
      var $elements = {};
      var $form = $(this);
      $form.find('input, select, textarea').each(function(){
        var name = $(this).attr('name')
        var type = $(this).attr('type')
        if(name){
          var $value;
          if(type == 'radio'){
            $value = $('input[name='+name+']:checked', $form).val()
          } else if(type == 'checkbox'){
            $value = $(this).is(':checked')
          } else {
            $value = $(this).val()
          }
          $elements[$(this).attr('name')] = $value
        }
      });
      return JSON.stringify( $elements )
  };
  $.fn.fromJSON = function(json_string) {
      var $form = $(this)
      var data = JSON.parse(json_string)
      $.each(data, function(key, value) {
        var $elem = $('[name="'+key+'"]', $form)
        var type = $elem.first().attr('type')
        if(type == 'radio'){
          $('[name="'+key+'"][value="'+value+'"]').prop('checked', true)
        } else if(type == 'checkbox' && (value == true || value == 'true')){
          $('[name="'+key+'"]').prop('checked', true)
        } else {
          $elem.val(value)
        }
      })
  };
}( jQuery ));

//
// DEMO CODE
// 
$(document).ready(function(){
 $("#_save").on('click', function(){
   console.log("Saving form data...")
   alert("Your comic was saved!")
   var data = $("form#myForm").toJSON()
   //console.log(data);
   localStorage[$('#ttle').val()] = data;
   return false;
 })

 $("#_load").on('click', function(){
 savedfiles();
 $(".loadbutton").click(function(){
  var id = $(this).attr('id'); // $(this) refers to button that was clicked
  loadvalue = id;
  console.log(loadvalue);
  if(localStorage[loadvalue]){
    console.log("Loading form data...")
    console.log(JSON.parse(localStorage[loadvalue]))
    $("form#myForm").fromJSON(localStorage[loadvalue])
    closemodal();
    addComic();
  } else {
    console.log("Error: Save some data first")
  }
  
  return false;
})
 })

});