//WE ARE BUILDING A TIMER USING PROCEDURAL PROGRAMMING
//2 SET SOF GLOBAL VARIABLES: HOUSRS, MINUTES, SECONDS
//... AND RETURN VALUE FOR *setInterval()* function
//4 KEY FUNCTIONS: EVENT HANDLERS FOR START, PAUSE, STOP 
//...AND EXECUTION FUNCTION CALLED IN A LOOP DURING THE COUNTDOWN 


//initialize button state

document.getElementById("btn-pause").disabled = true;
document.getElementById("btn-stop").disabled = true;

//define global variables
//store values of hour minute and second
var timer = null;   //store the returnd value of timer
var h = 0;
var m = 0;
var s = 0;


function start_counting(){
    //get the time input or set a default value which is 0
    h =+ document.getElementById("inputh").value || h;
    m =+ document.getElementById("inputm").value || m;
    s =+ document.getElementById("inputs").value || s;

    //check for invalid input
    if(
        (h == 0 && m == 0 && s == 0) ||
        (h < 0 || m < 0|| s < 0)
    ){
        alert("This time entered is illegal");
        return;
    }

    //start the timer
    timer = setInterval(counting, 1000)

    //change the state of the buttons and input fields to prohibit users
    //... from re-entering numbers

    document.getElementById("btn-start").disabled = true;
    document.getElementById("btn-pause").disabled = false;
    document.getElementById("btn-stop").disabled = false;
    document.getElementById("inputh").disabled = true;
    document.getElementById("inputm").disabled = true;
    document.getElementById("inputs").disabled = true;

}

function pause_counting(){
    //change the stae of buttons ans input fields to allow users to 
    //... re-enter numbers
    document.getElementById("btn-start").disabled = false;
    document.getElementById("btn-pause").disabled = true;
    document.getElementById("btn-stop").disabled = false;
    document.getElementById("inputh").disabled = false;
    document.getElementById("inputm").disabled = false;
    document.getElementById("inputs").disabled = false;


    //pause the timer
    clearInterval(timer);
}

function end_counting(){
    //change the stae of buttons ans input fields to allow users to 
    //... re-enter numbers
    document.getElementById("btn-start").disabled = false;
    document.getElementById("btn-pause").disabled = true;
    document.getElementById("btn-stop").disabled = true;
    document.getElementById("inputh").disabled = false;
    document.getElementById("inputm").disabled = false;
    document.getElementById("inputs").disabled = false;

    // stop the timer
    clearInterval(timer);

    // reset the time variables
    h = 0;
    m = 0;
    s = 0;
    document.getElementById("currentTime").innerHTML = "Timer stopped";

}

function counting(){
    //check if the second is 0
    if (s == 0){
        //check if minute is 0 when second is 0
        if (m == 0){
            //the entered time has already been checked for validity
            //... as in h,m & s wont all be 0 at the same time
            h--; //decrement the hour value
            m, s = 59;
        }else{
            m --; //decrement the minute when not 0
            s = 59;
        }
    }else{
        s--; //decrement the second when not 0
    }

    //display current time
    document.getElementById("currentTime").innerHTML = "current time: " + h + " h " + m + " m " + s + " s";
    document.getElementById("inputh").value = h;
    document.getElementById("inputm").value = m;
    document.getElementById("inputs").value = s;

    //check for cound town finish
    if (s ==0){ //check if second is 0
        if(m ==0){  //when s is 0 check if m is 0
            if (h ==0){ //when s and m are 0 check if h is 0
                //when h is 0 stop timer
                end_counting();
                //execute popup int eh next event loop to prevent it from blocking DOM rendering
                setTimeout(function(){
                    alert("The time is up!");},0);
                    return;
            }
        }
    }
}


//restricting the input range of the housrs minutes and seconds
var inputh = document.getElementById("inputh");
inputh.addEventListener("input", function(){
    inputh.value = parseInt(inputh.value || 0);
    if (inputh.value > 24) inputh.value = 24;
    if (inputh.value < 0) inputh.value = 0;
});

var inputm = document.getElementById("inputm");
inputm.addEventListener("input", function(){
    inputh.value = parseInt(inputm.value || 0);
    if (inputm.value > 59) inputm.value = 59;
    if (inputm.value < 0) inputm.value = 0;
});

var inputs = document.getElementById("inputs");
inputs.addEventListener("input", function(){
    inputs.value = parseInt(inputs.value || 0);
    if (inputs.value > 59) inputs.value = 59;
    if (inputs.value < 0) inputs.value = 0;
});


//optimizing the format of the hours minutes and seconds

h = h.toString();
m = m.toString();
s = s.toString();

if (h.match(/^\d$/)) {  //If the hour is a single digit, add 0 in the front
    h = "0" + h;
}
if (m.match(/^\d$/)) { // If the minute is a single digit, add 0 in the front
    m = "0" + m;
}
if (s.match(/^\d$/)) { // If the second is a single digit, add 0 in the front
    s = "0" + s;
}