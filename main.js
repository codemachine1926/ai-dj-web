x_wrist_l = 0;
y_wrist_l = 0;

x_wrist_r = 0;
y_wrist_r = 0;
song = "";
score_l = 0;
score_r = 0;


function setup() {
    canvas = createCanvas(500, 400);
    canvas.position(400,156);

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelloaded);
    posenet.on('pose', gotresult);
}

function gotresult(results) {
    if (results.length > 0) {
        console.log(results);

        score_l = results[0].pose.keypoints[9].score;
        console.log(score_l);

        x_wrist_l = results[0].pose.leftWrist.x;
        y_wrist_l = results[0].pose.leftWrist.y;

        console.log("x of left wrist is = " + x_wrist_l + "  y of left wrist is = " + y_wrist_l);

        x_wrist_r = results[0].pose.rightWrist.x;
        y_wrist_r = results[0].pose.rightWrist.y;

        console.log("x of right wrist is = " + x_wrist_r + "  y of right wrist is = " + y_wrist_r);

        score_r = results[0].pose.keypoints[10].score;
        console.log(score_r);
    }

}

function modelloaded() {
    console.log("model is loaded");
}

function draw() {
    image(video, 0, 0, 500, 400);

    if (score_l > 0.2) {
        circle(x_wrist_l, y_wrist_l, 15);
        fill("red");
        dec_num = Number(y_wrist_l);
        who_num = floor(dec_num);

        volume = who_num / 500;
        document.getElementById("div_v").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
    if (score_r > 0.2) {
        circle(x_wrist_r, y_wrist_r, 15);
        if (y_wrist_r > 0 && y_wrist_r <= 100) {
            song.rate(2.5);
            document.getElementById("div_s").innerHTML = "Speed = 2.5X";
        }
        else if (y_wrist_r > 100 && y_wrist_r <= 200) {
            song.rate(2);
            document.getElementById("div_s").innerHTML = "Speed = 2X";
        }
        else if (y_wrist_r > 200 && y_wrist_r <= 300) {
            song.rate(1);
            document.getElementById("div_s").innerHTML = "Speed = 1X";
        }
        else if(y_wrist_r > 300 && y_wrist_r <= 400) {
            song.rate(0.5);
            document.getElementById("div_s").innerHTML = "Speed = 0.5X";
        }
    }

}

function preload() {
    song = loadSound("music.mp3");
}

function play() {
    song.play();


    song.rate(1);
}