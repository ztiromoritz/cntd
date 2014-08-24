/**
 * Created by mo on 24.08.2014.
 */

(function(window){

    /*
    //MAIN LOOP
    var loop = new Howl({
        urls: ['assets/loop.ogg', 'assets/loop.wav'],
        autoplay: true,
        loop: true,
        volume: 0.3,
        onend: function() {
            console.log('Finished!');
        }
    });
    var play = true;
    //loop.play();
    jQuery('#sound').click(function(){
        if(play){
            play = false;
            loop.stop();
            jQuery('#sound').html('on');
        }else {
            play = true;
            loop.start();
            jQuery('#sound').html('off');
        }
    });
    */






    //SOUNDS
    var sounds ={
        jump: ["square",0.0000,1.0000,0.0000,0.1000,0.0000,0.1080,20.0000,508.0000,2400.0000,0.3560,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.3295,0.0000,0.0000,0.0000,0.0000,0.8390,0.0000,0.0000,0.0000,0.0000],
        explosion: ["noise",0.0000,0.2000,0.0000,0.3540,0.7950,0.4840,20.0000,236.0000,2400.0000,0.1340,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000]
    };

    var samples = jsfxlib.createWaves(sounds);
    window.samples = samples;
})(window);


