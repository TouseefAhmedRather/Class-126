song ="";
scoreLeftWrist = 0;
scorerightwrist = 0;
leftWristX = 0;
RightWristY = 0;
leftWristX = 0;
RightWristY =0;
function preload()
{
    song = loadSound("music.mp3");
}
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();

    video = createCapture(Video);
    video.hide();

    PoseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}


function modelLoaded()
{
    console.log('Model is intialized');
}


function draw()
{
    image(video,0,0,600,500);
    fill("#FF000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "volume = " + volume;
    song.setvolume(volume);
    }
    if(scorerightwrist> 0.2)
    {
        if(rightWristY >0 && rightWristY <= 100) 
        { document.getElementById("speed").innerHTML = "Speed = 0.5x"; 
        song.rate(0.5); }

        else if(rightWristY >100 && rightWristY <= 200) 
        { document.getElementById("speed").innerHTML = "Speed = 1x"; 
        song.rate(1); }

        else if(rightWristY >200 && rightWristY <= 300) 
        { document.getElementById("speed").innerHTML = "Speed = 1.5x"; 
        song.rate(1.5); }

        else if(rightWristY >300 && rightWristY <= 400) 
        { document.getElementById("speed").innerHTML = "Speed = 2x"; 
        song.rate(2); }

        else if(rightWristY >400) 
        { document.getElementById("speed").innerHTML = "Speed = 2.5x"; 
        song.rate(2.5); }
    }
}

function play()
{
    song.play();
    song.setvolume(1);
    song.rate(1);
}

function gotposes(results)
{
      if(results.length > 0)
        {
              console.log(results);
              scoreLeftWrist = results[0].pose.keypoints[9].score;
              scorerightWrist = results[0].pose.keypoints[10].score;
              RightWristX = results[0].pose.RightWrist.x;
              RightWristY = results[0].pose.RightWrist.y;

              console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
              leftWristX = results[0].pose.leftWrist.x; 
               leftWristY = results[0].pose.leftWrist.y; 
              console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
        }
}
