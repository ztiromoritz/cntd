jQuery(function(){
    var w = 500, h = 250;

    (function(cntd){
        //Hero 'Class'

        var top_incarnation, bottom_incarnation;

        var Hero = function(sprite1,sprite2, name){
            var data1 = {
                images: [sprite1],
                frames: {width:30, height:30},
                animations: {run:[0,2,"run",3], die:[3,6,"die",1]}
            };
            var spriteSheet1 = new SpriteSheet( data1 );

            var data2 = {
                images: [sprite2],
                frames: {width:30, height:30},
                animations: {run:[0,2,"run",4], die:[3,6,"die",1]}
            };
            var spriteSheet2 = new SpriteSheet( data2 );

            top_incarnation =new BitmapAnimation(spriteSheet1);
            bottom_incarnation = new BitmapAnimation(spriteSheet2);

            top_incarnation.snapToPixel = true;
            bottom_incarnation.snapToPixel = true;

            top_incarnation.gotoAndPlay('run');
            bottom_incarnation.gotoAndPlay('run');

            this.name = name;
            this.reset();
            self.expl = true;
        };

        Hero.prototype.reset = function (savepoint) {
            var x = savepoint || (w/3);
            this.velocity = {x:0,y:0};
            this.setX(x);
            this.setY(h/2);
            this.canJump = true;
            this.dieing = false;
        };

        Hero.prototype.tick = function() {
            this.velocity.y += 2;
            if(this.velocity.x < 10)
                this.velocity.x += 1;

            var   collisionY = null,
                collisionX = null,
                collideables = cntd.CurrentGame.getCollideables(),
                traps = cntd.CurrentGame.getTraps();

            var moveBy = {x:0, y:this.velocity.y};
            if( calculateCollision(top_incarnation,'y', traps, moveBy) ) {
                this.die();
            }

            moveBy = {x:this.velocity.x, y:0};
            if(calculateCollision(top_incarnation,'x', traps, moveBy)){
                this.die();
            }

            moveBy = {x:0, y:this.velocity.y};
            collisionY = calculateCollision(top_incarnation,'y', collideables, moveBy);
            top_incarnation.y += moveBy.y;
            bottom_incarnation.y = top_incarnation.y;

            if( !collisionY ){
                this.onGround = false;
            } else{
                if(moveBy.y >= 0){
                    this.onGround = true;
                }
                this.velocity.y = 0;
            }

            moveBy = {x:this.velocity.x, y:0};
            collisionX = calculateCollision(top_incarnation, 'x', collideables, moveBy);

            top_incarnation.x += moveBy.x;
            bottom_incarnation.x = top_incarnation.x;
            if(collisionX)
            {
                this.velocity.x = 0;
            }
        };

        Hero.prototype.jump = function() {
            if ( this.onGround && this.canJump ) {
                this.velocity.y = -20;
                this.onGround = false;
                sound.play('jump');
            }
        };

        Hero.prototype.die = function(){
            if(this.dieing)
                return;
            this.dieing = true;

            this.velocity.x = 0;
            this.canJump = false;
            var savepoint = cntd.CurrentGame.getLastSavepoint(this.getX());

            if(self.expl){
                sound.play('explosion');
                self.expl = false;
            }

            top_incarnation.gotoAndPlay('die');
            bottom_incarnation.gotoAndPlay('die');
            setTimeout(function (){
                cntd.CurrentGame.reset( savepoint );
                top_incarnation.gotoAndPlay('run');
                bottom_incarnation.gotoAndPlay('run');
                self.expl = true;

            },1700);

        };



        Hero.prototype.setX = function(x){
            top_incarnation.x = x;
            bottom_incarnation.x = x;
        };

        Hero.prototype.setY = function(y){
            top_incarnation.y = y;
            bottom_incarnation.y = y;
        };

        Hero.prototype.getX = function(){
            return top_incarnation.x;
        };

        Hero.prototype.getY = function(){
            return top_incarnation.y;
        };

        Hero.prototype.getTopIncarnation = function(){
            return top_incarnation;
        };

        Hero.prototype.getBottomIncarnation = function(){
            return bottom_incarnation;
        };




        cntd.Hero = Hero;
    })(cntd);


    (function(cntd){
        var
            PLATFORM_IMAGE = 'assets/platform.png',
            PLATFORM2_IMAGE = 'assets/platform2.png',
            BOX_IMAGE = 'assets/box.png',
            TRAP_IMAGE = 'assets/trap.png',
            BOX_BOTTOM_IMAGE = 'assets/box_bottom.png',
            TRAP_BOTTOM_IMAGE = 'assets/trap_bottom.png',
            HERO_SPRITE_BOTTOM = "assets/hero_sprite_bottom.png",
            HERO_SPRITE = "assets/hero_sprite.png"
            ;

        var Game = function(){

            cntd.CurrentGame = this;
            var self = this,
                assets = [],
                ticks = 0,
                amy;


            var universe_top = null;
            var universe_bottom = null;
            var ground_top = null;
            var ground_bottom = null;
            var paralaxBackgroundBottom = null;

            var tickables = [];
            var collidables = [];
            var resetables = [];
            var savepoints = [];
            var traps = [];
            this.getCollideables = function(){return collidables;};
            this.getTraps = function(){return traps;};

            this.preloadResources = function(){
                self.loadImage(PLATFORM_IMAGE);
                self.loadImage(PLATFORM2_IMAGE);
                self.loadImage(BOX_IMAGE);
                self.loadImage(TRAP_IMAGE);
                self.loadImage(HERO_SPRITE);
                self.loadImage(HERO_SPRITE_BOTTOM);
                self.loadImage(BOX_BOTTOM_IMAGE);
                self.loadImage(TRAP_BOTTOM_IMAGE);
            };

            var requestedAssets = 0, loadedAsstes = 0;
            this.loadImage = function(src){
                var img = new Image();
                img.onload = self.onLoadedAsset;
                img.src = src;
                assets[src] = img;
                ++requestedAssets;
            };

            this.onLoadedAsset = function( e ) {
                ++loadedAsstes;
                if(loadedAsstes == requestedAssets){
                    self.initializeGame();
                }
            };



            this.initializeGame = function(){

                amy = new cntd.Hero(assets[HERO_SPRITE],assets[HERO_SPRITE_BOTTOM],'Amy');

                universe_top = self.createUniverse('cntd_top',
                    { 'box' : assets[BOX_IMAGE], 'trap': assets[TRAP_IMAGE]}
                );
                universe_bottom = self.createUniverse('cntd_bottom',
                    { 'box' : assets[BOX_BOTTOM_IMAGE], 'trap': assets[TRAP_BOTTOM_IMAGE]}
                );

                paralaxBackgroundBottom = self.createStars(20000,4000);
                universe_bottom.getWorld().addChild(paralaxBackgroundBottom);

                universe_top.getWorld().addChild(amy.getTopIncarnation());
                universe_bottom.getWorld().addChild(amy.getBottomIncarnation());

                tickables.push(amy);
                resetables.push(amy);

                ground_top = self.createGround(universe_top,assets[PLATFORM_IMAGE]);
                tickables.push(ground_top);
                resetables.push(ground_top);

                ground_bottom = self.createGround(universe_bottom,assets[PLATFORM2_IMAGE])
                tickables.push(ground_bottom);
                resetables.push(ground_bottom);

                tickables.push(universe_top);
                resetables.push(universe_top);

                tickables.push(universe_bottom);
                resetables.push(universe_bottom);



                cntd.buildLevels(universe_top, universe_bottom, savepoints);
                savepoints = _.sortBy(savepoints,function(num){return num;});

                jQuery(document).keydown(
                    function(e){

                        if(e.which === 82){ //R
                            self.reset();
                        }else if(e.which == 32){ //SPACE
                            amy.jump();
                        }
                    }
                );



                Ticker.setFPS(30);
                Ticker.addListener(self.tick);

                this.reset();
            };

            this.tick = function(e) {
                ticks++;
                var n = tickables.length;
                while(n--) {
                    tickables[n].tick();
                }
                universe_top.update();
                universe_bottom.update();

                //paralx
                paralaxBackgroundBottom.x = (amy.getX() * 0.9 )-(w/.3);

                var fin = true;
                if(amy.getX() > 26000 ){
                    if(fin){
                        fin = false;
                        jQuery('.fin').fadeIn();
                    }

                }

            };

            this.reset = function(savepoint) {
                var n = resetables.length;
                while(n--){
                    resetables[n].reset(savepoint);
                    universe_top.update();
                    universe_bottom.update();
                }
            };

            this.getLastSavepoint = function(x){
                console.log("getLastSavePoint "+x);


                console.log(savepoints);

                var last = 0;
                for(var i = 0; i< savepoints.length;i++){
                    if(savepoints[i] < x ){
                        last = savepoints[i];
                    }else{
                        break;
                    }
                }
                console.log(last);
                return last;
            };

            this.createUniverse = function(id, universeAssets){
                var canvas, stage, world;
                var _universeAssets = universeAssets;
                canvas = jQuery('#'+id)[0];
                canvas.width = 500;
                canvas.height = 250;
                stage = new Stage(canvas);
                world = new Container();
                stage.addChild(world);

                return {
                    getStage : function() {return stage;},
                    getCanvas : function(){return canvas;},
                    getWorld : function() {return world;},

                    addElement : function(x,y, asset ) {
                        x = Math.round(x);
                        y = Math.round(y);
                        var element = new Bitmap( asset );
                        element.name = asset.src;
                        element.x = x;
                        element.y = y;
                        element.snapToPixel = true;
                        world.addChild(element);
                        //collidables.push(element);
                        return element;
                    },


                    addBox : function(x,y){
                        var element = this.addElement(x,y, _universeAssets['box']);
                        collidables.push(element);
                        return element;
                    },

                    addTrap : function(x,y){
                        var element = this.addElement(x,y, _universeAssets['trap']);
                        collidables.push(element);
                        traps.push(element);
                        return element;
                    },

                    tick : function(){
                        if ( amy.getX() > w*.3 ) {
                            world.x = -amy.getX() + w*.3;
                        }

                        if ( amy.getY() < h*.3 ) {
                            world.y = -amy.getY() + h*.3;
                        }
                        if ( amy.getY() > h*.6 ) {
                            world.y = 0 + Math.max(0,( amy.getY() - h+60 ));
                        }


                    },

                    update : function(){
                        stage.update();
                    },

                    reset : function(savepoint){
                        var x = savepoint || 0;
                        world.x = 0;
                        world.y = 0;
                    }

                };
            };

            self.preloadResources();

            this.createGround = function(universe, asset) {
                var element1 = universe.addElement(0,h - asset.height, asset);
                var element2 = universe.addElement(asset.width,h - asset.height, asset);
                collidables.push(element1);
                collidables.push(element2);
                var next = 0;
                var elements = [element1,element2];
                return {
                    tick: function () {
                        var a = elements[next];
                        var b = elements[(next) ? 0 : 1];
                        if (a.localToGlobal(a.image.width, 0).x < -10) {
                            a.x = b.x + a.image.width;
                            next = (next) ? 0 : 1;
                        }

                    },

                    reset : function(savepoint){
                        var x = savepoint || 0;
                        elements[0].x = x-w/3;
                        elements[0].y = h - asset.height;
                        elements[1].x = x-w/3 + asset.width;
                        elements[1].y = h - asset.height;
                        next = 0;
                    }
                };
            };

            this.createStars = function( width, count){
                var stars = new Container();
                for (var i = 0;i<count;i++){
                    var x = Math.floor(Math.random() * width) + 1;
                    var y = Math.floor(Math.random() * 500) + -249;

                    var g = new Graphics();
                    g.beginFill(Graphics.getRGB(273,223,68));
                    g.drawCircle(0,0,1);
                    var shape = new Shape(g);
                    shape.snapToPixel = true;
                    shape.x = x;
                    shape.y = y;
                    stars.addChild(shape)
                }
                return stars;
            }

        };
        cntd.Game = Game;
    })(cntd);


    jQuery(document).keydown(
        function(e){
            if(e.which == 13){ //SPACE
                jQuery('.menu').fadeOut();
                new cntd.Game();
            }
        }
    );




    ///new ;





});


