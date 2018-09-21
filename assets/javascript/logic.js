//options
var totalSeconds = 11;
var time;
var score = 0;
var count = 0;
var subset = 4;
var all = [];
var flip = true;
var gameOver=false;
var qa="";


//simple javascript countup timer
function timer(){

  totalSeconds=11;
  var minutesLabel = document.getElementById("minutes");
  var secondsLabel = document.getElementById("seconds");

  time = setInterval(setTime, 1000);

  function setTime(){

    if(totalSeconds>=0&&!gameOver){

      --totalSeconds;
      secondsLabel.innerHTML = pad(totalSeconds%60);
      minutesLabel.innerHTML = pad(parseInt(totalSeconds/60)); 
      }

    else{
        totalSeconds=0;
        clearInterval(time);       
        secondsLabel.innerHTML =  pad(totalSeconds%60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
      }

    if(totalSeconds===0&&!gameOver){
      
      document.getElementById("score").innerHTML = 'Score: '+score+' / '+count;
      alert("Time's up! The correct choice will be displayed right now. The next question will be displayed 3 seconds after you press 'Ok'.")
      document.getElementById("choices").className = 'animate';
      document.body.removeEventListener('click', clickHandler, false);
      clearInterval(time);
      window.setTimeout(timer,3000);
      window.setTimeout(play, 3000);
      window.setTimeout(assignImage, 3000);
      
    }

  }

  function pad(val){
    var valString = val + "";
    if(valString.length < 2){
      return "0" + valString;
    } else {
      return valString;
    }
  }

}

//simple javascript array shuffle
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

//lets use event delegation instead of setting up event listenters
function clickHandler(e){

    e = e || window.event;
    var target = e.target || e.srcElement;

    //disregard all click events to elements that do not have a class choice
    if (!target.className.match(/choice/)){
        return e;
    }
    if (target.className.match(/green/)){
      score++;
    }

    //show score
    document.getElementById("score").innerHTML = 'Score: '+score+' / '+count; 
        
    //aniamte
    document.getElementById("choices").className = 'animate';

    //remove event listeners
    document.body.removeEventListener('click', clickHandler, false);

    if(count===20){
      gameOver=true;
      $("#flag").hide(); 
      $("#choices").hide(); 
      $("#question").hide(); 
      $("#gameOver").show(); 
    }

    clearInterval(time);
    window.setTimeout(play, 1500);
    window.setTimeout(timer, 1500);


   

}


var sample = '{"capitals": [{"name": "Santiago","alt": "Chile"},{"name": "Lima","alt": "Peru"},{"name": "Quito","alt": "Ecuador"},{"name": "Bogota","alt": "Colombia"},{"name": "Warsaw","alt": "Poland"},{"name": "Berlin","alt": "Germany"},{"name": "Madrid","alt": "Spain"},{"name": "London","alt": "England"},{"name": "Paris","alt": "France"},{"name": "Rome","alt": "Italy"},{"name": "Nairobi","alt": "Kenya"}, {"name": "Minsk","alt": "Belarus"}, {"name": "Amman","alt": "Jordan"}, {"name": "Kuala Lumpur","alt": "Malaysia"}, {"name": "Oslo","alt": "Norway"}, {"name": "Helsinki","alt": "Finland"}, {"name": "Copenhagen","alt": "Denmark"}, {"name": "Reykjavik","alt": "Iceland"}, {"name": "Montevideo","alt": "Uruguay"}, {"name": "Damascus","alt": "Syria"} ]}';
var obj=JSON.parse(sample);
var questions = shuffle(all.slice(0));
var title;
var choices;
var countryFlags=[

  {'country':'Chile', 'flag':'assets/images/chile.png'},
  {'country':'Belarus', 'flag':'assets/images/belarus.png'},
  {'country':'Colombia', 'flag':'assets/images/colombia.jpg'},
  {'country':'Denmark', 'flag':'assets/images/denmark.png'},
  {'country':'Denmark', 'flag':'assets/images/denmark.png'},
  {'country':'Ecuador', 'flag':'assets/images/ecuador.png'},
  {'country':'Finland', 'flag':'assets/images/finland.png'},
  {'country':'France', 'flag':'assets/images/france.png'},
  {'country':'Germany', 'flag':'assets/images/germany.png'},
  {'country':'Iceland', 'flag':'assets/images/iceland.png'},
  {'country':'Italy', 'flag':'assets/images/italy.jpg'},
  {'country':'Jordan', 'flag':'assets/images/jordan.png'},
  {'country':'Kenya', 'flag':'assets/images/kenya.png'},
  {'country':'Malaysia', 'flag':'assets/images/malaysia.png'},
  {'country':'Norway', 'flag':'assets/images/norway.png'},
  {'country':'Peru', 'flag':'assets/images/peru.jpg'},
  {'country':'Poland', 'flag':'assets/images/poland.png'},
  {'country':'Spain', 'flag':'assets/images/spain.png'},
  {'country':'Syria', 'flag':'assets/images/syria.jpg'},
  {'country':'England', 'flag':'assets/images/uk.png'},
  {'country':'Uruguay', 'flag':'assets/images/uruguay.png'},

]

function start(){
//parse it
sample = '{"capitals": [{"name": "Santiago","alt": "Chile"},{"name": "Lima","alt": "Peru"},{"name": "Quito","alt": "Ecuador"},{"name": "Bogota","alt": "Colombia"},{"name": "Warsaw","alt": "Poland"},{"name": "Berlin","alt": "Germany"},{"name": "Madrid","alt": "Spain"},{"name": "London","alt": "England"},{"name": "Paris","alt": "France"},{"name": "Rome","alt": "Italy"},{"name": "Nairobi","alt": "Kenya"}, {"name": "Minsk","alt": "Belarus"}, {"name": "Amman","alt": "Jordan"}, {"name": "Kuala Lumpur","alt": "Malaysia"}, {"name": "Oslo","alt": "Norway"}, {"name": "Helsinki","alt": "Finland"}, {"name": "Copenhagen","alt": "Denmark"}, {"name": "Reykjavik","alt": "Iceland"}, {"name": "Montevideo","alt": "Uruguay"}, {"name": "Damascus","alt": "Syria"} ]}';

obj = JSON.parse(sample);

//retrieve from object
for (var key in obj) {
  title = key;
  choices = obj[key];
  for (var k in choices){ 
    if(flip){
      all.push(choices[k].name);
    } else {
      all.push(choices[k].alt);
    }
//code to make flags appear
  }
}

//clone all array and shuffle questions
questions = shuffle(all.slice(0));

//append the title and score 
document.getElementById("title").innerHTML = "Prepare to answer "+questions.length+' questions. You have 1.5 seconds to read the question, and 10 seconds to answer it. Good luck!';
document.getElementById("score").innerHTML = 'Score: '+score+' / '+count; 


//start the timer and the game
$("#gameOver").hide();
$("#flag").show();
$("#question").show();
$("#choices").show();

}

start();
timer();
play();

function assignImage(){

  for(var i=0;i<countryFlags.length;i++){

    if(countryFlags[i].country===qa){

      $("#flag").attr("src", countryFlags[i].flag);
    }

  }
}

function play(){

  if(questions.length>0 && totalSeconds>0){

    count++;

    //clear class
    document.getElementById("choices").className = '';

    //grab a question and show it on screen
    var question = questions.pop();

    //setup event delegation
    document.body.addEventListener('click',clickHandler,false);

    //answer of the questions
    if(flip){
      qa = choices.filter(function(f){ return f.name == question })[0].alt;
    } else {
      qa = choices.filter(function(f){ return f.alt == question })[0].name;
    }

    document.getElementById("question").innerHTML = "What's the capital of "+qa+"?";

    assignImage();
    //always shuffle posible answers and then slice accoding to subset (# of choice u want)
    var rchoices = shuffle(all).slice(0,subset);

    //if choices array does not have the current question, add it into random position!
    if(rchoices.indexOf(question)== -1){
      rchoices[parseInt(Math.floor(Math.random() * rchoices.length))] = question;
    }

    var answers='';

    rchoices.forEach(function(i){
      if(i == question){
        var domobj = '<div class="choice green">'+i+'</div>';
      } else {
        var domobj = '<div class="choice red">'+i+'</div>';
      }
      answers += domobj;
    });

    //render the possible answers to the screen
    document.getElementById("choices").innerHTML = answers;

  } 
  
  else {
    //end of game, stop timer
    clearInterval(time);
    //document.getElementById("choices").innerHTML = '<div id="end">The End. Press any key to start again.</div>';
    $("#choices").hide();
    $("#flag").hide();
    $("#question").text("");

    //document.getElementById("question").innerHTML = '';
    
    document.onkeyup = function (event) {

      if(gameOver){
      console.log("key has been pressed");
      all=[];
      totalSeconds = 11;
      score = 0;
      count = 0;
      subset = 4;
      flip = true;
      gameOver=false;
      sample = '{"capitals": [{"name": "Santiago","alt": "Chile"},{"name": "Lima","alt": "Peru"},{"name": "Quito","alt": "Ecuador"},{"name": "Bogota","alt": "Colombia"},{"name": "Warsaw","alt": "Poland"},{"name": "Berlin","alt": "Germany"},{"name": "Madrid","alt": "Spain"},{"name": "London","alt": "England"},{"name": "Paris","alt": "France"},{"name": "Rome","alt": "Italy"},{"name": "Nairobi","alt": "Kenya"}, {"name": "Minsk","alt": "Belarus"}, {"name": "Amman","alt": "Jordan"}, {"name": "Kuala Lumpur","alt": "Malaysia"}, {"name": "Oslo","alt": "Norway"}, {"name": "Helsinki","alt": "Finnland"}, {"name": "Copenhagen","alt": "Denmark"}, {"name": "Reykjavik","alt": "Iceland"}, {"name": "Montevideo","alt": "Uruguay"}, {"name": "Damascus","alt": "Syria"} ]}';
      
      //document.getElementById("choices").className = '';
      //question = questions.pop();

      //start the timer and the game
      $("#choices").show();
      $("#flag").show();
      $("#gameOver").hide();

      start();
      timer();
      play();}


    }

  }

}