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

    .nav-tabs > li.active > a, .nav-tabs > li.active > a:hover, .nav-tabs > li.active > a:focus {
        color: #fff !important;
        cursor: default;
        background-color: #2196F3 !important;;
        border: 1px solid #2196F3 !important;;
        border-bottom-color: transparent;
    }

    .collection_0 {
        z-index: -500 !important;
        left: -99999px !important;
        top: -99999px !important;
    }

</style>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<?PHP

?>
<body oncontextmenu="return false;" style="overflow: hidden;font-family:font-family: monospace;">

<section id="play" ng-app="pokemon" ng-controller="play" style="position: relative;">
    <!--GAME-->
    <canvas style="position: absolute;top: 40px"
            width="{{bounds().width}}"
            height="{{bounds().height}}"
            id="game">
    </canvas>

    <!--MENU-->
    <?php include 'playmenu.php' ?>

    <!--TEXTS-->
    <?php include 'playtexts.php' ?>

    <div style="display: none" class="g-signin2" data-onsuccess="onSignIn"></div>

</section>

<?php include_once($path . '/js.php') ?>

<script src="js/controller/play.js?v=<?php echo $version ?>"></script>
<script src="js/controller/pokemon.js?v=<?php echo $version ?>"></script>
<script src="js/joy.min.js?v=<?php echo $version ?>"></script>
<script>
    function onSignIn(googleUser) {
        PROFILE = googleUser.getBasicProfile();
        ACTIONS.GAME.PLAY(PROFILE);
    }

    LASTMOVEMENT = undefined;
    TOUCHER = undefined;
    var dynamic = nipplejs.create({
        zone: document.getElementById('play'),
        color: 'white'
    });
    dynamic.on('added', function (evt, nipple) {
        nipple.on('start move end dir plain', function (evt) {
            if (evt.target.direction)
                if (evt.target.direction.angle) {
                    LASTMOVEMENT = evt.target.direction.angle.toUpperCase();
                    if (!ACTIONS.GAME.ISBLOCK())
                        eval(`ACTIONS.PLAYER.MOVE_${evt.target.direction.angle.toUpperCase()}();`);
                    if (!TOUCHER) {
                        TOUCHER = setInterval(function () {
                            if (LASTMOVEMENT) {
                                if (!ACTIONS.GAME.ISBLOCK())
                                    eval(`ACTIONS.PLAYER.MOVE_${LASTMOVEMENT}();`);
                            }
                        }, 10);
                    }
                }
        });
    }).on('removed', function (evt, nipple) {
        clearInterval(TOUCHER);
        TOUCHER = undefined;
        nipple.off('start move end dir plain', function () {
        });
    });

    // var conn = new WebSocket('ws://localhost:9090');
    // conn.onopen = function (e) {
    //     console.log("Connection established!");
    // };
    //
    // conn.onmessage = function (e) {
    //     console.log(e.data);
    // };
</script>
</body>

</html>
