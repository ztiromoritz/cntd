jQuery(function(){
    cntd.buildLevels = function (universe_top,universe_bottom, savepoints){


        (function(n){
            universe_top.addBox(n,170);
            universe_bottom.addBox(n,170);
            for(var i =0; i<9; i++ ) {
                universe_top.addBox(n + (i * 40), 130);
                universe_bottom.addBox(n + (i * 40), 130);
            }
        })(1000);


        (function(n){
            universe_top.addBox(n,170);
            universe_bottom.addBox(n+13*40,90);
            for(var i =0; i<20; i++ ) {

                universe_top.addBox(n + (i * 40), 130);
                //universe_bottom.addBox(n + (i * 40), 130);
            }
        })(2000);

        (function (n) {
            universe_top.addBox(n, 170);
            universe_bottom.addBox(n, 170);
            universe_top.addTrap(n + 200, 170);
            universe_bottom.addTrap(n + 200, 170);
        })(4000);



        (function(n){
            universe_top.addBox(n,170);
            universe_bottom.addTrap(n+17*40,90);
            for(var i =0; i<23; i++ ) {

                universe_top.addBox(n + (i * 40), 130);
                //universe_bottom.addBox(n + (i * 40), 130);
            }
        })(5000);


        (function (n){
            universe_top.addBox(n, 170);
        })(6000);


        (function(n) {
            universe_bottom.addBox(n-80,170);
            universe_bottom.addTrap(n+140, 170);
            universe_bottom.addTrap(n+140, 130);
            universe_bottom.addTrap(n+140, 90);

            universe_top.addBox(n, 130);
            universe_top.addBox(n+40, 130);
            universe_top.addBox(n+2*40, 130);
            universe_top.addBox(n+3*40, 130);
            universe_top.addBox(n+4*40, 130);
        })(7000);

        (function(n) {
            universe_top.addTrap(n+20, 170);
            universe_bottom.addBox(n, 130);
        })(8000);


    };
});