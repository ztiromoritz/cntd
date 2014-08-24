jQuery(function(){

    var w = 500, h = 250;


    var cntd = {};
    (function(cntd){
        //Hero 'Class'

        var top_incarnation, bottom_incarnation;

        var Hero = function(sprite1,sprite2, name){
            this.initialize(sprite1,sprite2,name);
        };


        //Hero.prototype = new Bitmap();

        //Hero.prototype.super_initialize = Hero.prototype.initialize;
        Hero.prototype.initialize = function(sprite1,sprite2, name){


            var data1 = {
                images: [sprite1],
                frames: {width:30, height:30},

                animations: {run:[0,2,"run",3], die:[3,6,"run",1]}
            };
            var spriteSheet1 = new SpriteSheet( data1 );


            var data2 = {
                images: [sprite2],
                frames: {width:30, height:30},

                animations: {run:[0,2,"run",4], die:[3,6,"run",1]}
            };
            var spriteSheet2 = new SpriteSheet( data2 );


             /*
            //this.super_initialize(image);
            top_incarnation = new Sprite(spriteSheet,"run");
            bottom_incarnation = new Sprite(spriteSheet,"run");
            */
            top_incarnation =new BitmapAnimation(spriteSheet1);
           // bottom_incarnation = new BitmapAnimation(spriteSheet);
           /* top_incarnation = new Bitmap(image);

            */
            bottom_incarnation = new BitmapAnimation(spriteSheet2);

            top_incarnation.snapToPixel = true;

            bottom_incarnation.snapToPixel = true;

            top_incarnation.gotoAndPlay('run');
            bottom_incarnation.gotoAndPlay('run');

            this.name = name;
            this.velocity = {x:10,y:0};
            self.expl = true;
        };

        Hero.prototype.tick = function() {
            this.velocity.y += 2;

            var   collisionY = null,
                collisionX = null,
                collideables = cntd.CurrentGame.getCollideables(),
                traps = cntd.CurrentGame.getTraps();

            var moveBy = {x:0, y:this.velocity.y};
            if( calculateCollision(top_incarnation,'y', traps, moveBy) ) {
                console.log('die');
                this.die();
            }

            moveBy = {x:this.velocity.x, y:0};
            if(calculateCollision(top_incarnation,'x', traps, moveBy)){
                console.log('die');
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
        };

        Hero.prototype.jump = function() {
            if ( this.onGround ) {
                this.velocity.y = -20;
                this.onGround = false;
                samples.jump.play();
            }
        };

        Hero.prototype.die = function(){

            if(self.expl){
                samples.explosion.play();
                self.expl = false;
            }

            top_incarnation.gotoAndPlay('die');
            bottom_incarnation.gotoAndPlay('die');
            setTimeout(function (){
                cntd.CurrentGame.reset();
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

        Hero.prototype.reset = function () {
            this.velocity = {x:10,y:0};
            this.setX(w/2);
            this.setY(h/2);
        };


        cntd.Hero = Hero;
    })(cntd);


    (function(cntd){
        var
            PLATFORM_IMAGE = 'assets/platform.png',
            PLATFORM2_IMAGE = 'assets/platform2.png',
            BOX_IMAGE = 'assets/box.png',
            TRAP_IMAGE = 'assets/trap.png',
            HERO_SPRITE_BOTTOM = "assets/hero_sprite_bottom.png",
            HERO_SPRITE = "assets/hero_sprite.png";

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

            var tickables = [];
            var collidables = [];
            var resetables = [];
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
                amy.reset();

                universe_top = self.createUniverse('cntd_top');
                universe_bottom = self.createUniverse('cntd_bottom');

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


                //LevelDesign
                universe_top.addElement(1300, 170, assets[BOX_IMAGE] );
                universe_bottom.addElement(2000, 170, assets[BOX_IMAGE] );

                traps.push(universe_bottom.addElement(2300, 170, assets[TRAP_IMAGE] ));
                traps.push(universe_bottom.addElement(2300, 130, assets[TRAP_IMAGE] ));
                traps.push(universe_bottom.addElement(2300, 90, assets[TRAP_IMAGE] ));
                universe_top.addElement(2160, 130, assets[BOX_IMAGE] );
                universe_top.addElement(2200, 130, assets[BOX_IMAGE] );
                universe_top.addElement(2240, 130, assets[BOX_IMAGE] );
                universe_top.addElement(2280, 130, assets[BOX_IMAGE] );
                universe_top.addElement(2320, 130, assets[BOX_IMAGE] );

                traps.push(universe_top.addElement(3300, 170, assets[TRAP_IMAGE] ));
                universe_bottom.addElement(3280, 130, assets[BOX_IMAGE] );

                jQuery(document).keydown(
                    function(e){
                        console.log(e.which);
                        if(e.which === 82){ //R
                            self.reset();
                        }else if(e.which == 32){ //SPACE
                            amy.jump();
                        }
                    }
                );
                Ticker.setFPS(30);
                Ticker.addListener(self.tick);
            };

            this.tick = function(e) {
                ticks++;
                var n = tickables.length;
                while(n--) {
                    tickables[n].tick();
                }
                universe_top.update();
                universe_bottom.update();
            };

            this.reset = function(e) {
                var n = resetables.length;
                while(n--){
                    resetables[n].reset();
                    universe_top.update();
                    universe_bottom.update();
                }
            };

            this.createUniverse = function(id){
                var canvas, stage, world;
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
                        collidables.push(element);
                        return element;
                    },

                    tick : function(){
                        if ( amy.getX() > w*.3 ) {
                            world.x = -amy.getX() + w*.3;
                        }
                        if ( amy.getY() < h*.3 ) {
                            world.y = -amy.getY() + h*.3;
                        }
                    },

                    update : function(){
                        stage.update();
                    },

                    reset : function(){
                        world.x = 0;
                        world.y = 0;
                    }
                };
            };

            this.createGround = function(universe, asset) {
                var elements = [];
                var next = 0;
                elements.push(
                    universe.addElement(0,h - asset.height, asset));
                elements.push(
                    universe.addElement(asset.width,h - asset.height, asset));

                return {
                    tick: function () {
                        var a = elements[next];
                        var b = elements[(next) ? 0 : 1];
                        if (a.localToGlobal(a.image.width, 0).x < -10) {
                            a.x = b.x + a.image.width;
                            next = (next) ? 0 : 1;
                        }
                    },

                    reset : function(){
                        elements[0].x = 0;
                        elements[0].y = h - asset.height;
                        elements[1].x = asset.width;
                        elements[1].y = h - asset.height;
                        next = 0;
                    }
                };
            };

            self.preloadResources();

        };
        cntd.Game = Game;
    })(cntd);

    new cntd.Game();


});
