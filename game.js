const buttonColors = ["magenta", "green", "yellow", "blue"]
let gamePattern = []
let userClickedPattern = []
var started = false;
var level = 0;


$(document).keypress(function () {

        if (!started) {
            
            nextSequence();
            started = true;
        }
    });


$(".box").click(function (event) {

    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    
    animatePress(userChosenColor);

    checkPattern(userClickedPattern.length - 1);
})


function checkPattern(lastChoice){
    if (userClickedPattern[lastChoice] === gamePattern[lastChoice]){
        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
                nextSequence()
            }, 1000);
        }
    }
    else{
        gameOver()
    }
}


function gameOver() {
    playSound("wrong")
    $("h1").text("Game Over! Press Any Key to Restart.").addClass("altered-text")
    $("body").css("background-color","yellow")
    $(".box").addClass("pressed")
    setTimeout(function(){
        $("body").css("background-color","rgb(57, 42, 75)")
        $("h1").removeClass("altered-text")
        $(".box").removeClass("pressed")
    },300)
    startOver()
    console.log("game over")
}

function playSound(color) {
    var audio = new Audio("./sounds/" + color + ".mp3")
    audio.play()
}


function nextSequence() {
    userClickedPattern = [];
    level++
    $("h1").text("Level "+ level);
    var number = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[number]
    setTimeout(function (){
        gamePattern.push(randomChosenColor);
        animatePress(randomChosenColor)
        playSound(randomChosenColor);
    }, 300);
}

function startOver() {
    level = 0 ;
    gamePattern = [];
    started=false;
}


function animatePress(color) {
    $("#"+color).addClass("pressed")
    $("#"+color).fadeOut(100).fadeIn(100);
    setTimeout(function(){
        $("#"+color).removeClass("pressed")
    },200)
}