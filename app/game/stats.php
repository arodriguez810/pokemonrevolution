<!DOCTYPE html>
<html>
<?php $path = 'layout/'; ?>
<?php include_once($path . '/head.php') ?>

<body class="theme-teal">
<!-- Page Loader -->
<?php include_once($path . '/loader.php') ?>
<!-- #END# Page Loader -->
<!-- Overlay For Sidebars -->
<div class="overlay"></div>
<!-- #END# Overlay For Sidebars -->
<!-- Search Bar -->

<!-- #END# Search Bar -->
<!-- Top Bar -->
<?php include_once($path . '/navbar.php') ?>
<!-- #Top Bar -->

<?php include_once($path . '/sidebar.php') ?>
<style>
    .info-box .icon i {
        color: #fff;
        font-size: 33px;
        line-height: 40px;
    }
</style>

<section class="content" id="playercontroller" ng-app="pokemon" ng-controller="player">

    <div class="container-fluid">
        <div class="block-header">
            <h2>Raking</h2>

        </div>
        <!-- Widgets -->
        <div class="row clearfix">
            <div class="row clearfix">
                <div class="col-lg-1" ng-repeat="(key, count) in counts">
                    <div ng-click="currentStatCalc(count)" style="height: 60px;"
                         class="info-box bg-{{count.color}} hover-expand-effect">
                        <div class="icon" style="text-align: center">
                            <i class="material-icons">{{count.icon}}</i>
                            <div class="text" style="font-size: 15px;margin: 2px">{{count.name}}</div>
                        </div>
                        <div class="content">

                            <div style="text-align: center;width: 100%" class="number count-to" data-from="0"
                                 data-to="{{countFilter(count.rules)}}"
                                 data-speed="1000" data-fresh-interval="20">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">

                    <div class="body table-responsive">
                        <div class="col-sm-2" ng-repeat="(ke,cate) in filters">
                            <button style="width: 230px" ng-click="selectFilter(cate)" type="button"
                                    class="btn btn-lg bg-{{filterStyle(cate)}} waves-effect">
                                {{cate.name}}
                            </button>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group form-float">
                                <div class="form-line">
                                    <input type="text" ng-model="search" class="form-control">
                                    <label class="form-label">Buscar</label>
                                </div>
                            </div>
                            <div class="bg-{{currentStat.color}}"
                                 style="font-size: 32px;text-align: center;padding: 2px;">
                                <label>{{currentStat.name}}</label><label>{{asc?'Ascendant':'Descendant'}}</label>
                            </div>
                        </div>

                        <div ng-repeat="(key, player) in listFilter() | filter:search"
                             style="float: left;text-align: center;border: 2px teal solid;min-height: 300px">
                            <div style="text-transform: capitalize">
                                <div style="position: relative">
                                    <label style="font-size: 24px; width: 100%" class="bg-green">{{player.name}}, Rank:
                                        {{player.top}} </label>
                                    <br>
                                    <div style="position: relative">
                                        <label style="font-size: 24px; width: 100%"
                                               class="bg-{{_colors[catarray.indexOf(player.tier)+1]}}">
                                            Tier: {{player.tier}}
                                        </label>
                                    </div>
                                    <img src="data/players/{{player.name}}/images/face.png"/>
                                </div>
                                <div style="position: relative">
                                    <label style="font-size: 24px; width: 100%" class="bg-light-green">Power:
                                        {{player.power||0}}, Rating: {{player.rating||0}}</label>
                                </div>
                                <div style="margin: 10px;padding: 20px">
                                    <div ng-repeat="(key,pokemon) in player.pokemons" style="float: left">
                                        <img src="{{pokemon.imageUrl}}">
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</section>

<?php include_once($path . '/js.php') ?>

<script src="js/controller/pokemon.js"></script>
<script src="js/controller/stat.js"></script>
<script>

</script>
</body>

</html>
