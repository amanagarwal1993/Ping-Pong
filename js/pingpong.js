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
            height: parseInt($("#playground").height());
            width: parseInt($("#playground").width());
        },
        
        ball: {
            speed: 5,
            x: 150,
            y: 100,
            directionX: 1,
            directionY: 1
        }
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
    
    function render() {
        renderPaddles();
        //requestAnimationFrame basically makes a recursive loop.
        window.requestAnimationFrame(render);
    };
    
    function gameloop() {
        moveBall();
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
    }
    
    function init() {
        //initiate rendering loop
        window.requestAnimationFrame(render);
        
        //get mouse inputs
        handleMouseInputs();
    }
    
    init();
    
})(jQuery);