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


    body {
        background-image: url('../resources/titles/<?php echo TitleImg(); ?>.png');
        background-size: cover;
    }

    canvas {
        width: 100%;
    }

</style>
<meta name="viewport" content="width=device-width, initial-scale=1">
<?PHP

?>
<body oncontextmenu="return false;" style="overflow: hidden" onload="autoNotify()" onclick="autoNotify()">
<audio id="sound" src="../resources/audio/pokemon/title.ogg" style="display: none"></audio>
<section id="play" ng-app="pokemon" ng-controller="home">
    <center>
        <div class="card" style="width: 70%;margin-top: 10%;opacity: 0.8">
            <div class="body">
                <form id="sign_in" method="POST" novalidate="novalidate">
                    <h3>Mangalos Todos!</h3>
                    <div class="input-group">
                        <div class="g-signin2" data-ux_mode="redirect" data-onsuccess="onSignIn"
                             data-theme="dark"></div>
                    </div>
                </form>
            </div>
        </div>
    </center>
</section>
<?php include_once($path . '/js.php') ?>

<script src="js/controller/home.js"></script>
<script>

    function autoNotify() {
        var popupsound = document.getElementById("sound");
        popupsound.play(); //play the audio file
    }
</script>
<script>
    function onSignIn(googleUser) {
        PROFILE = googleUser.getBasicProfile();
        HOME_.PLAYERPROFILE(PROFILE.getId()).then(function (profile) {
            if (!profile.avatar) {
                location.href = "face.php";
            } else {
                location.href = "play.php";
            }
        });
    }
</script>
</body>

</html>
