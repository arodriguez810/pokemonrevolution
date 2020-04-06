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

    #game {
        border: #0D47A1 solid 1px;
    }

    canvas {
        width: 100%;
    }
</style>
<script>
    window.addEventListener('scroll', function noScroll() {
        window.scrollTo(0, 0);
    });
    FIRSTMAP = `<?PHP echo $_GET["map"];?>`;
    PLAYER = `<?PHP echo $_GET["player"];?>`;
</script>
<?PHP

?>
<body oncontextmenu="return false;" style="overflow: hidden">
<section id="play" ng-app="pokemon" ng-controller="play">
    <canvas
            width="{{bounds().width}}"
            height="{{bounds().height}}"
            id="game">
    </canvas>
</section>

<?php include_once($path . '/js.php') ?>
<script src="js/controller/play.js"></script>
</body>

</html>
