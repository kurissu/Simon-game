var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStart = false;

function playSound(name){
    var soundFile = 'sounds/' + name +'.mp3';
    console.log(soundFile);
    var audio= new Audio(soundFile);
    audio.muted = false;
    audio.play();
}

function nextSequence(){

    userClickedPattern = []

    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColor[randomNumber]
    gamePattern.push(randomChosenColor)
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
    
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
    
            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
            nextSequence();
            }, 1000);
    
        }
    
        } else {
            console.log("wrong");
            playSound("wrong");
            $("body").addClass("game-over");

            setTimeout(() => {
                $("body").removeClass("game-over")
            }, 200);

            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();
        }

}

function startOver(){
    level = 0;
    gamePattern = [];
    gameStart = false;
}
console.log(gamePattern);
$( ".btn" ).on( "click", function() {
    console.log( $(this).attr("id") );
    var userChosenColor = $(this).attr("id");
    $("#" + userChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(userChosenColor)
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
  });

$( "body" ).on("keydown",function() {
    if(!gameStart){
        $("#level-title").text("Level "+ level)
        nextSequence();
        gameStart = true;
    }
});

