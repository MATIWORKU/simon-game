var patternList = [];
var userChoosenPattern = [];

var level = 0;
var isStarted = false;


$("div.btn").click(function (){

    var userChoosenColor = this.id;
    userChoosenPattern.push(userChoosenColor);


    playAudio(userChoosenColor);
    showAnimation(userChoosenColor);


    checkAnswer(userChoosenPattern.length - 1);
});



$(document).on("keydown", function (){
    if(!isStarted){
        isStarted = true;
        randomPattern();
    }
});



function playAudio(color){
    switch(color){
        case "green":
            var green = new Audio("./sounds/" + color + ".mp3");
            green.play();
        break;
        case "red":
            var red = new Audio("./sounds/" + color + ".mp3");
            red.play();
        break;
        case "yellow":
            var yellow = new Audio("./sounds/" + color + ".mp3");
            yellow.play();
        break;
        case "blue":
            var blue = new Audio("./sounds/" + color + ".mp3");
            blue.play();
        break;
        default:
            var wrong = new Audio("./sounds/wrong.mp3");
            wrong.play();
    }
    // or simply can be done like this
    // var audio = new Audio('./sounds'+ color + '.mp3');
    // audio.play();
}



function showAnimation(color){
    $("#" + color).addClass("pressed");

    setTimeout(function (){
        $("#" + color).removeClass("pressed");
    },150);
}



function randomPattern(){

    userChoosenPattern = [];

    var divColors = ["green", "red", "yellow", "blue"];
    var randomNum = Math.floor(Math.random() * 4);
    var randomColor = divColors[randomNum];

    patternList.push(randomColor);

    // to show a random pattern
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);

    //to add audio to the button
    playAudio(randomColor);

    level++;

    $("h1").text("Level "+ level);  
}   



function checkAnswer(currentLevel){

    if(patternList[currentLevel] === userChoosenPattern[currentLevel]){

        if(userChoosenPattern.length === patternList.length){
            setTimeout(function (){
                randomPattern();
            }, 1000);
            
        }
    }else{

        playAudio("wrong");
        $("h1").text("Game Over, Press Any Key to Restart.");
        $("body").addClass("game-over");

        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }   
}


function startOver(){
    patternList = [];
    level = 0;
    isStarted = false;
}