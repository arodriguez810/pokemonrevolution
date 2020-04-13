<!DOCTYPE html>
<html>
<?php $path = 'layout/'; ?>
<?php include_once($path . '/head.php') ?>

<body class="theme-light-green">
<!-- Page Loader -->
<?php include_once($path . '/loader.php') ?>
<!-- #END# Page Loader -->
<!-- Overlay For Sidebars -->
<div class="overlay"></div>
<!-- #END# Overlay For Sidebars -->
<!-- Search Bar -->

<!-- #END# Search Bar -->
<!-- Top Bar -->
<!-- #Top Bar -->
<style>
    #play {

    }

    body {
        background-color: black;
    }

    canvas {
        width: 100%;
    }

</style>
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>
    // document.addEventListener('touchstart', handleTouchStart, false);
    // document.addEventListener('touchmove', handleTouchMove, false);
    // var xDown = null;
    // var yDown = null;
    //
    // function getTouches(evt) {
    //     return evt.touches ||             // browser API
    //         evt.originalEvent.touches; // jQuery
    //
    // }
    //
    // function handleTouchStart(evt) {
    //     const firstTouch = getTouches(evt)[0];
    //     xDown = firstTouch.clientX;
    //     yDown = firstTouch.clientY;
    //
    // };
    //
    // function handleTouchMove(evt) {
    //     if (!xDown || !yDown) {
    //         return;
    //     }
    //     var xUp = evt.touches[0].clientX;
    //     var yUp = evt.touches[0].clientY;
    //     var xDiff = xDown - xUp;
    //     var yDiff = yDown - yUp;
    //     if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
    //         if (xDiff > 0) {
    //             console.log('left');
    //         } else {
    //             console.log('right');
    //         }
    //     } else {
    //         if (yDiff > 0) {
    //             console.log('up');
    //         } else {
    //             console.log('down');
    //         }
    //     }
    //     /* reset values */
    //     xDown = null;
    //     yDown = null;
    // };
    //
    // window.addEventListener('scroll', function noScroll() {
    //     window.scrollTo(0, 0);
    // });
    FIRSTMAP = `<?PHP echo $_GET["map"];?>`;
    PLAYER = `<?PHP echo $_GET["player"];?>`;
</script>
<?PHP

?>
<body oncontextmenu="return false;" style="overflow: hidden">
<section id="play" ng-app="pokemon" ng-controller="play" style="position: relative">
    <canvas style="position: absolute"
            width="{{bounds().width}}"
            height="{{bounds().height}}"
            id="game">
    </canvas>
    <div style="position: absolute;display: none" id="texts">

        <div class="DialogWindow" style="min-height: 172px;min-width: 600px">

            <div class="DialogTitle">
                <img style="float: right" src="data/characters_file/{{dialogHero.name}}/face.png"
                     onclick="ACTIONS.MESSAGE.REPLAY()">
                <label style="font-size: 18px;color: #673AB7">{{dialogHero.name}}</label>:
                <span style="font-size: 18px;">
                    {{dialogText}}
                </span>
                <div style="margin-top: 45px">
                    <button style="margin-right: 10px" ng-click="value.click()"
                            class="btn bg-{{_colors[$index]}} btn-large"
                            ng-repeat="(key,value) in dialogButtons">
                        <img
                                style="width: 32px;height: 32px;background-image: url('../resources/system/IconSet.png');background-position: -{{icon(value.icon).x}}px -{{icon(value.icon).y}}px;"
                                ng-show="value.icon"> {{value.text}}
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div style="position: absolute;display: none" id="notify" onclick="$('#notify').hide(200)">
        <div class="DialogWindow" style="min-width: 300px" onclick="$('#notify').hide(200)">
            <div class="DialogTitle" style="text-align: center;margin-bottom: 0px" onclick="$('#notify').hide(200)">
                <span style="font-size: 18px;" onclick="$('#notify').hide(200)">
                    {{notificationText}}
                </span>
            </div>
        </div>
    </div>

</section>

<?php include_once($path . '/js.php') ?>

<script src="js/controller/play.js"></script>
</body>

</html>
