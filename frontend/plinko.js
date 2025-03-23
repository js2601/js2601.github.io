//define constants

const ballSize = 8;
const pegSize = 7;
const pegAmt = 11;
const multWidth = 50;
var credits = 1000;
//Init Physics Engine

var Engine = Matter.Engine, Render = Matter.Render, Runner = Matter.Runner, Bodies = Matter.Bodies, Events = Matter.Events, Composite = Matter.Composite, World = Matter.World;

var engine = Engine.create();

var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 1000,
        height: 520,
        wireframes: false,
        background: 'white'
    }
});

Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);

//Plinko Functions

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}


function createMults() {
    for (let i = 0; i<13; i++) {
        var mult = Bodies.rectangle(200+50*i,454,multWidth,30, { isStatic: true, render: {fillStyle: '#75f871', lineWidth: 2, strokeStyle: 'white'}});
        if (Math.abs(6 - i) == 6) mult.label = "collision_12.0";
        else if (Math.abs(6 - i) == 5) mult.label = "collision_6.0"
        else if (Math.abs(6 - i) == 4) mult.label = "collision_2.0"
        else if (Math.abs(6 - i) == 3) mult.label = "collision_1.2"
        else if (Math.abs(6 - i) == 2) mult.label = "collision_1.0"
        else mult.label = "collision_0.5"
        World.add(engine.world, mult);
    }
}


function createPegs(rowNum) {
    for (i = 1; i<rowNum; i++) {
        for (let j = 0; j < i+2; j ++) {
            var peg = Bodies.circle(475+50*j-25*i,15+37*i, pegSize,
                {isStatic: true, render: {fillStyle: 'white', strokeStyle: 'black', lineWidth: 1}});
            World.add(engine.world,peg)
        }
    }
}

function deleteBall(ball,mult) {
    var betVal = ball.label.substring(5,ball.label.length);
    credits = Number(credits) + Number((betVal*mult));
    console.log(credits);
    credits = Number(credits).toFixed(1);
    document.getElementById("credits").innerHTML = `Credits: ${credits}`;
    World.remove(engine.world, ball);
}

function dropBall(){
    let betAmt = document.getElementById("betInput").value;
    if (betAmt > 0 && betAmt <= credits){
    var ball = Bodies.circle(500 + randInt(-25,25), 0, ballSize, {
        render: { fillStyle: 'red'},
        label: "ball_"+ betAmt,
        collisionFilter: {group: -1}
    });
    console.log(ball.label);
    credits -= Number(betAmt);
    credits = Number(credits).toFixed(1);
    console.log(credits);
    document.getElementById("credits").innerHTML = "Credits: " + credits;
    World.add(engine.world, ball);
    }
}


//Ball Detection Function Added By ChatGPT and Critically Modified by Creator with prompt: "using matter.js, add a function to detect when a collision between a ball and collisionTest occurs, return the ball"

Events.on(engine, 'collisionStart', function(event) {
    event.pairs.forEach(pair => {
        if ((pair.bodyA.label.startsWith("collision") && pair.bodyB.label.startsWith("ball")) ||
            (pair.bodyB.label.startsWith("collision") && pair.bodyA.label.startsWith("ball"))) {
            var ball = pair.bodyA.label.startsWith("ball") ? pair.bodyA : pair.bodyB;
            var mult = pair.bodyA.label.startsWith("ball") ? pair.bodyB.label.substring(10,13) : pair.bodyA.label.substring(10,13)
            deleteBall(ball,Number(mult));
        }
    });
});

function draw() {
    const ctx = render.canvas.getContext("2d");
    ctx.font = "15px serif";
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    for (let i = 0; i<13; i++) {
        if (Math.abs(6 - i) == 6) ctx.fillText("12.0", 200 + 50*i, 460);
        else if (Math.abs(6 - i) == 5) ctx.fillText("6.0", 200 + 50*i, 460);
        else if (Math.abs(6 - i) == 4) ctx.fillText("2.0", 200 + 50*i, 460);
        else if (Math.abs(6 - i) == 3) ctx.fillText("1.20", 200 + 50*i, 460);
        else if (Math.abs(6 - i) == 2) ctx.fillText("1.0", 200 + 50*i, 460);
        else ctx.fillText("0.5", 200 + 50*i, 460);
    }
  }

Events.on(render,'afterRender',draw);

document.getElementById("credits").innerHTML = "Credits: " + credits;
createPegs(pegAmt);
createMults();