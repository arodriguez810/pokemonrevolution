<!DOCTYPE html>
<html>
<?php $path = 'layout/'; ?>

<?php

$version = "1.0.0.52";

function TitleImg()
{
    $time = date("H");
    if ($time < 18) {
        echo "Plain";
    } else {
        echo "Night";
    }
}

?>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta content=" initial-scale=0.899, maximum-scale=0.899, user-scalable=no" name="viewport">
    <title>Pokemon Revolution</title>
    <link rel="icon" href="images/logo/favicon.ico" type="image/x-icon">
    <link href="js/font/material.css?v=<?php echo $version ?>" rel="stylesheet" type="text/css">
    <link href="plugins/bootstrap/css/bootstrap.css?v=<?php echo $version ?>" rel="stylesheet">
    <link href="css/game.css?v=<?php echo $version ?>" rel="stylesheet">
    <link href="plugins/animate-css/animate.css?v=<?php echo $version ?>" rel="stylesheet"/>
    <link href="plugins/sweetalert/sweetalert.css?v=<?php echo $version ?>" rel="stylesheet"/>
    <link href="css/style.css?v=<?php echo $version ?>" rel="stylesheet">
    <link href="css/themes/all-themes.css?v=<?php echo $version ?>" rel="stylesheet"/>
    <meta name="google-signin-scope" content="profile email">
    <meta name="google-signin-client_id"
          content="1002650457102-m57p66ca2bnf2oe830bf1mvlfimscr79.apps.googleusercontent.com">
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <style>
        .swal2-container {
            z-index: 999999999999;
        }
    </style>
    <script>
        LOADEDG = 0;

        function loadedg() {
            LOADEDG++;
        }
    </script>
</head>
<?php include_once($path . '/loader.php') ?>
<div class="overlay"></div>

<body oncontextmenu="return false;"
      style="overflow: hidden;font-family:font-family: monospace;background-color: black">

<section id="play" ng-app="pokemon" ng-controller="play">
    <!--GAME-->
    <div id="main">
        <canvas style="z-index: 1; position: absolute; margin: auto; top: 0px; left: 0px; right: 0px; bottom: 0px; width: {{bounds().width}}px; height: {{bounds().height}}px;"
                width="{{bounds().width}}"
                height="{{bounds().height}}"
                id="game">
        </canvas>
        <canvas style="user-select: auto;touch-action: none;pointer-events:none;z-index: 20; position: absolute; margin: auto; top: 0px; left: 0px; right: 0px; bottom: 0px; width: {{bounds().width}}px; height: {{bounds().height}}px;"
                width="{{bounds().width}}"
                height="{{bounds().height}}"
                id="animations">
        </canvas>

        <img ng-show="BATTLEOBJS.clima"
             style="user-select: auto;touch-action: none;pointer-events:none;z-index: 20; position: absolute; margin: auto; top: 0px; left: 0px; right: 0px; bottom: 0px; width: {{bounds().width}}px; height: {{bounds().height}}px;"
             width="{{bounds().width}}"
             height="{{bounds().height}}"
             src="../resources/clima/{{BATTLEOBJS.clima}}.gif"
             id="clima"/>
    </div>
    <!--MENU-->
    <?php include 'playmenu.php' ?>

    <!--TEXTS-->
    <?php include 'playtexts.php' ?>

    <div style="display: none" class="g-signin2" data-onsuccess="onSignIn"></div>


    <div ng-show="!isBattlening && !menuOpen && menu"
         style="position: absolute;bottom: 10px;right: 10px;text-align: center;z-index: 999;opacity: 0.6;">
        <button ontouchstart="PADMOVE('w')" ontouchend="PADMOVE('q')" type="button"
                class="btn btn-lg bg-green waves-effect"
                style="margin-bottom: 6px;">
            <i class="material-icons">arrow_upward</i>
        </button>
        <br>
        <button ontouchstart="PADMOVE('a')" ontouchend="PADMOVE('q')" type="button"
                class="btn btn-lg bg-red waves-effect">
            <i class="material-icons">arrow_back</i>
        </button>
        <button ontouchstart="PADMOVE('s')" ontouchend="PADMOVE('q')" type="button"
                class="btn btn-lg bg-blue waves-effect">
            <i class="material-icons">arrow_downward</i>
        </button>
        <button ontouchstart="PADMOVE('d')" ontouchend="PADMOVE('q')" type="button"
                class="btn btn-lg bg-amber waves-effect">
            <i class="material-icons">arrow_forward</i>
        </button>

    </div>


</section>

<?php include_once($path . '/js.php') ?>

<script src="js/controller/play.js?v=<?php echo $version ?>"></script>
<script src="js/controller/playvars.js?v=<?php echo $version ?>"></script>
<script src="js/controller/playfunctions.js?v=<?php echo $version ?>"></script>
<script src="js/controller/playactions.js?v=<?php echo $version ?>"></script>
<script src="js/controller/pokemon.js?v=<?php echo $version ?>"></script>
<script src="js/joy.min.js?v=<?php echo $version ?>"></script>
<style>

    #main {
        touch-action: auto !important;
    }

    body {
        font-size: 24px !important;
    }

</style>
<script>
    function onSignIn(googleUser) {
        PROFILE = googleUser.getBasicProfile();
        ACTIONS.GAME.PLAY(PROFILE);
    }


    // var conn = new WebSocket('ws://localhost:9090');
    // conn.onopen = function (e) {
    //     console.log("Connection established!");
    // };
    //
    // conn.onmessage = function (e) {
    //     console.log(e.data);
    // };
</script>
<script>
    $(document).ready(function () {
        document.getElementById("footer").style.width = getComputedStyle(document.getElementById("game")).marginLeft - 3;
        document.getElementById("footer2").style.width = getComputedStyle(document.getElementById("game")).marginLeft - 3;
    });
</script>
</body>

</html>
