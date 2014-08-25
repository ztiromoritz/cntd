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

        savepoints.push(3000);
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
            universe_top.addBox(n+1000, 170);
        })(5000);

        savepoints.push(6300);

        (function (n) {
            universe_top.addTrap(n, 170);
            universe_bottom.addTrap(n+200, 170);
            universe_top.addTrap(n + 400, 170);
            universe_bottom.addTrap(n + 200, 170);
        })(7000);


        savepoints.push(7600);

        (function(n) {
            universe_top.addTrap(n+20, 170);
            universe_bottom.addBox(n, 130);
        })(8000);

        savepoints.push(8300);

        (function(n) {

            universe_bottom.addBox(n, 130);
            universe_bottom.addBox(n+40, 130);

            universe_bottom.addBox(n+160, 90);
            universe_bottom.addBox(n+200, 90);

            universe_bottom.addBox(n+320, 50);
            universe_bottom.addBox(n+360, 50);
            var wall = 480;
            universe_bottom.addTrap(n+wall-40, 170);
            universe_bottom.addBox(n+wall, 170);
            universe_bottom.addBox(n+wall, 130);
            universe_bottom.addBox(n+wall, 90);
            universe_bottom.addBox(n+wall, 50);
            universe_bottom.addBox(n+wall, 10);
            universe_bottom.addBox(n+wall, -30);
        })(9000);


        (function(n) {

            universe_top.addBox(n, 130);
            universe_top.addBox(n+40, 130);

            universe_top.addBox(n+160, 90);
            universe_top.addBox(n+200, 90);

            universe_top.addBox(n+320, 50);
            universe_top.addBox(n+360, 50);
            var wall = 480;
            universe_top.addTrap(n+wall-40, 170);
            universe_top.addBox(n+wall, 170);
            universe_top.addBox(n+wall, 130);
            universe_top.addBox(n+wall, 90);
            universe_top.addBox(n+wall, 50);
            universe_top.addBox(n+wall, 10);
            universe_top.addBox(n+wall, -30);
        })(11000);

        (function(n) {

            universe_top.addBox(n, 130);
            universe_top.addBox(n+40, 130);

            universe_top.addBox(n+160, 90);
            universe_top.addBox(n+200, 90);

            universe_top.addBox(n+320, 50);
            universe_top.addBox(n+360, 50);
            var wall = 480;
            universe_bottom.addTrap(n+wall-40, 170);
            universe_bottom.addBox(n+wall, 170);
            universe_bottom.addBox(n+wall, 130);
            universe_bottom.addBox(n+wall, 90);
            universe_bottom.addBox(n+wall, 50);
            universe_bottom.addBox(n+wall, 10);
            universe_bottom.addBox(n+wall, -30);
        })(13000);

        savepoints.push(14000);

        (function(n) {

            universe_top.addBox(n, 130);
            universe_top.addBox(n+40, 130);

            universe_bottom.addBox(n+160, 90);
            universe_bottom.addBox(n+200, 90);

            universe_top.addBox(n+320, 50);
            universe_top.addBox(n+360, 50);
            var wall = 480;
            universe_top.addTrap(n+wall-40, 170);
            universe_top.addBox(n+wall, 170);
            universe_top.addBox(n+wall, 130);
            universe_top.addBox(n+wall, 90);
            universe_top.addBox(n+wall, 50);
            universe_top.addBox(n+wall, 10);
            universe_top.addBox(n+wall, -30);


            universe_bottom.addTrap(n+wall-40, 170);
            universe_bottom.addBox(n+wall, 170);
            universe_bottom.addBox(n+wall, 130);
            universe_bottom.addBox(n+wall, 90);
            universe_bottom.addBox(n+wall, 50);
            universe_bottom.addBox(n+wall, 10);
            universe_bottom.addBox(n+wall, -30);
        })(15000);

        savepoints.push(16000);

        (function(n) {

            universe_top.addBox(n, 130);
            universe_top.addBox(n+40, 130);

            universe_bottom.addBox(n+160, 90);
            universe_bottom.addBox(n+200, 90);

            universe_top.addBox(n+400, 90);
            universe_top.addBox(n+440, 90);

            universe_bottom.addBox(n+600, 90);
            universe_bottom.addBox(n+640, 90);

            var wall = 720;
            universe_top.addTrap(n+wall, 170);
            universe_top.addTrap(n+wall, 130);
            universe_top.addTrap(n+wall, 90);
            universe_top.addTrap(n+wall, 50);
        })(17000);

        savepoints.push(18000);

        (function(n) {
            universe_bottom.addBox(n-80,170);
            universe_bottom.addBox(n-120,170);
            universe_bottom.addTrap(n+160, 170);
            universe_bottom.addTrap(n+160, 130);
            universe_bottom.addTrap(n+160, 90);

            universe_top.addBox(n, 130);
            universe_top.addBox(n+40, 130);
            universe_top.addBox(n+2*40, 130);
            universe_top.addBox(n+3*40, 130);
            universe_top.addBox(n+4*40, 130);
        })(19000);

        savepoints.push(19500);
        (function(n) {

            universe_bottom.addTrap(n+160, 170);
            universe_bottom.addTrap(n+160, 50);

            universe_top.addTrap(n+440, 170);
            universe_top.addTrap(n+440, 50);

            universe_bottom.addTrap(n+680, 170);
            universe_bottom.addTrap(n+720, 50);

            universe_top.addTrap(n+900, 170);
            universe_top.addTrap(n+860, 50);

            universe_bottom.addTrap(n+1160, 170);
            universe_bottom.addTrap(n+1160, 50);

            universe_top.addTrap(n+1440, 170);
            universe_top.addTrap(n+1440, 50);


        })(20000);

        savepoints.push(22000);
        (function(n) {
            //universe_top.addTrap(n + 360, 130);
            universe_top.addTrap(n + 440, 130);
            universe_top.addTrap(n + 740, 170);
            universe_top.addTrap(n + 740, 130);

            for(var i = 0 ; i<5; i++)
                universe_top.addBox(n + 540 + (i*40), 130);

            universe_bottom.addTrap(n+1160, 170);
            universe_bottom.addTrap(n+1160, 50);

            universe_top.addTrap(n+1440, 170);
            universe_top.addTrap(n+1440, 50);
        })(23000);









    };
});