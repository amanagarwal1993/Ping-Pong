(function($) {
    var pingpong = {
        paddleA: {
            x: 50,
            y: 100,
            width: 20,
            height: 70
        },
        
        paddleB: {
            x: 320,
            y: 100,
            width: 20,
            height: 70
        },
        
        playground: {
            offsetTop: $("#playground").offset().top,
            height: parseInt($("#playground").height()),
            width: parseInt($("#playground").width())
        },
        
        ball: {
            speed: 5,
            x: 150,
            y: 100,
            directionX: 1,
            directionY: 1
        },
        
        scoreA: 0,
        scoreB: 0
    };
    
    function renderPaddles() {
        $("#paddleB").css("top", pingpong.paddleB.y);
        $("#paddleA").css("top", pingpong.paddleA.y);
    };
    
    function handleMouseInputs() {
        //run when mouse moves inside playground
        $("#playground").mouseenter(function() {
            pingpong.isPaused = false;
        });
        
        $("playground").mouseleave(function() {
            pingpong.isPaused = true;
        });
        
        //calculate paddle position using mouse position
        $("#playground").mousemove(function(e) {
            pingpong.paddleB.y = e.pageY - pingpong.playground.offsetTop;
        });
    };
    
     
    function ballHitsTopBottom() {
        var y = pingpong.ball.y + pingpong.ball.speed*pingpong.ball.directionY;
        return y < 0 || y > pingpong.playground.height;
    };
    
    function ballHitsRightWall() {
        return pingpong.ball.x + pingpong.ball.speed * pingpong.ball.directionX > pingpong.playground.width;
    };
    
    function ballHitsLeftWall() {
        return pingpong.ball.x + pingpong.ball.speed * pingpong.ball.directionX < 0;
    };
    
    function playerAWin() {
        pingpong.ball.x = 250;
        pingpong.ball.y = 100;
        pingpong.ball.directionX = -1;
        pingpong.scoreA += 1;
        $("#score-a").text(pingpong.scoreA);
    };
    
    function playerBWin() {
        pingpong.ball.x = 150;
        pingpong.ball.y = 100;
        pingpong.ball.directionX = 1;
        pingpong.scoreB += 1;
        $("#score-b").text(pingpong.scoreB);
    };
    
    function moveBall() {
        var ball = pingpong.ball;
        
        var ballX = ball.x + ball.speed * ball.directionX;
        var ballY = ball.y + ball.speed * ball.directionY;
        
        if (ballX >= pingpong.paddleA.x && ballX < pingpong.paddleA.x + pingpong.paddleA.width) {
            if (ballY <= pingpong.paddleA.y + pingpong.paddleA.height && ballY > pingpong.paddleA.y) {
                ball.directionX = 1;
            }
        };
        
        if (ballX + 20 >= pingpong.paddleB.x && ballX < pingpong.paddleB.x + pingpong.paddleB.width) {
            if (ballY <= pingpong.paddleB.y + pingpong.paddleB.height && ballY > pingpong.paddleB.y) {
                ball.directionX = -1;
            }
        };
        
        if(ballHitsTopBottom()) {
            ball.directionY *= -1;
        };
        
        if(ballHitsLeftWall()) {
            playerBWin();
        };
        
        if(ballHitsRightWall()) {
            playerAWin();
        };
        
        ball.x += ball.speed * ball.directionX;
        ball.y += ball.speed * ball.directionY;
    };
    
    function autoMovePaddleA() {
        var speed = 4;
        var direction = 1;
        
        var paddleY = pingpong.paddleA.y + (pingpong.paddleA.height)/2;
        
        if (paddleY > pingpong.ball.y) {
            direction = -1;
        };
        
        pingpong.paddleA.y += speed * direction;
    }
    
    function renderBall() {
        var ball = pingpong.ball;
        $("#ball").css({
            "left": ball.x + ball.speed * ball.directionX,
            "top": ball.y + ball.speed * ball.directionY
        });
    };
    
    function render() {
        renderBall();
        renderPaddles();
        window.requestAnimationFrame(render);
    };
    
    function gameloop() {
        moveBall();
        autoMovePaddleA();
    };
        
    function init() {
        
        pingpong.timer = setInterval(gameloop, 1000/30);
        
        //initiate rendering loop
        window.requestAnimationFrame(render);
        
        //get mouse inputs
        handleMouseInputs();
    };
    
    init();
    
})(jQuery);