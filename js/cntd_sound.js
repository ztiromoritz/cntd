/**
 * Created by mo on 24.08.2014.
 */

(function(window){
    //SOUNDS
    var sounds ={
        jump: ["square",0.0000,1.0000,0.0000,0.1000,0.0000,0.1080,20.0000,508.0000,2400.0000,0.3560,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.3295,0.0000,0.0000,0.0000,0.0000,0.8390,0.0000,0.0000,0.0000,0.0000],
        explosion: ["noise",0.0000,0.2000,0.0000,0.3540,0.7950,0.4840,20.0000,236.0000,2400.0000,0.1340,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000]
    };

    var samples = jsfxlib.createWaves( sounds );
    var sound_enabled = true;

    //MAIN LOOP
    jQuery(function(){
        var getLoop = function(){
            return new Howl({
                urls: ['assets/loop.ogg', 'assets/loop.wav'],
                autoplay: true,
                loop: true,
                volume: 0.3,
                onend: function() {

                }
            });
        };


        var loop = getLoop();

        jQuery('#sound').click(function(){
            if(sound_enabled){

                sound_enabled = false;
                loop.stop();
                jQuery('#sound').html('sound on');
            }else {

                sound_enabled = true;
                loop = getLoop();
                jQuery('#sound').html('sound off');
            }
            jQuery('#cntd').blur();
        });
    });




    window.sound = {
        play: function(name){
            if(sound_enabled)
                samples[name].play();
        }
    };
})(window);


