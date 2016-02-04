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
            offsetTop: $("#playground").offset().top
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
    
    function init() {
        //initiate rendering loop
        window.requestAnimationFrame(render);
        
        //get mouse inputs
        handleMouseInputs();
    }
    
    init();
    
})(jQuery);