<!DOCTYPE html>
<html>
<?php $path = 'layout/'; ?>
<?php include_once($path . '/head.php') ?>

<body class="theme-brown">
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

</style>

<section class="content" id="playercontroller" ng-app="pokemon" ng-controller="player">

    <!-- Form  -->
    <div class="modal fade" id="player_form" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lgx" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="largeModalLabel">Jugador</h4>
                    <div class="header-dropdown m-r--5 " loading="player">
                        Cargando datos...
                        <div class="preloader pl-size-x2">
                            <div class="spinner-layer">
                                <div class="circle-clipper left">
                                    <div class="circle"></div>
                                </div>
                                <div class="circle-clipper right">
                                    <div class="circle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="row clearfix">
                        <div class="col-sm-2">
                            <div class="form-group form-float">
                                <div class="form-line focused">
                                    <input id="playername" type="text" ng-model="form.data.name"
                                           class="form-control">
                                    <label class="form-label">Nombre </label>
                                </div>
                            </div>
                        </div>
                        <!--                        <div class="col-sm-2">-->
                        <!--                                                    <div class="form-group form-float ">-->
                        <!--                                                        <select class="form-control show-tick" ng-model="form.data.personality">-->
                        <!--                                                            <option ng-repeat="(key,value) in personalities">{{value}}</option>-->
                        <!--                                                        </select>-->
                        <!--                                                    </div>-->
                        <!--                                                </div>-->
                        <!--                        <div class="col-sm-6">-->
                        <!--                            <div class="form-group form-float ">-->
                        <!--                                <div class="form-line">-->
                        <!--                                    <textarea rows="1" ng-model="form.data.biography" class="form-control"></textarea>-->
                        <!--                                    <label class="form-label">Biografía</label>-->
                        <!--                                </div>-->
                        <!--                            </div>-->
                        <!--                        </div>-->
                    </div>


                    <div class="row clearfix">
                        <center>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="card">
                                    <div class="header">
                                        <h2>Jugador</h2>

                                    </div>

                                    <div class="body">


                                    </div>
                                </div>
                            </div>
                        </center>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-link waves-effect" ng-click="save()">Guardar</button>
                    <button type="button" class="btn btn-link waves-effect" ng-click="clear()" data-dismiss="modal">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="block-header">
            <h2>Jugadores</h2>

        </div>
        <!-- Widgets -->
        <div class="row clearfix">

            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="header">
                        <button type="button" ng-click="new()"
                                class="btn btn-primary btn-circle-lg waves-effect waves-circle waves-float">
                            <i class="material-icons">add</i>
                        </button>
                        <button type="button" ng-click="refresh()"
                                class="btn btn-primary btn-circle-lg waves-effect waves-circle waves-float">
                            <i class="material-icons">refresh</i>
                        </button>
                        <div class="header-dropdown m-r--5 " loading="player" style="display: none">
                            Cargando datos...
                            <div class="preloader pl-size-x2">
                                <div class="spinner-layer">
                                    <div class="circle-clipper left">
                                        <div class="circle"></div>
                                    </div>
                                    <div class="circle-clipper right">
                                        <div class="circle"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="body table-responsive">
                        <div class="col-sm-12">
                            <div class="form-group form-float">
                                <div class="form-line">
                                    <input type="text" ng-model="search" class="form-control">
                                    <label class="form-label">Buscar</label>
                                </div>
                            </div>
                        </div>
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th>Player</th>
                                <th>Equipo</th>
                                <th>Bóveda</th>
                                <th>Habilidades</th>
                                <th>.</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr ng-repeat="(key, player) in list | filter:search">
                                <td style="text-transform: capitalize">
                                    <div style="position: relative">
                                        <label>{{player.name}} - {{player.tier}}</label>
                                        <br>
                                        <img src="data/players/{{player.name}}/images/face.png"/>
                                        <img style="position: absolute;clip: rect(0, 64px, 64px, 0);"
                                             src="data/players/{{player.name}}/images/sv.png"/>
                                        <img style="margin-top: 70px;position: absolute;clip: rect(0, 48px, 48px, 0);"
                                             src="data/players/{{player.name}}/images/tv.png"/>
                                    </div>
                                </td>
                                <td>
                                    <div style="margin: 10px;padding: 20px">
                                        <div ng-repeat="(key,pokemon) in player.pokemons" style="float: left">
                                            <img src="{{pokemon.imageUrl}}">

                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div style="margin: 10px;padding: 20px">
                                        <div ng-repeat="(key,pokemon) in player.bobeda" style="float: left">
                                            <img src="{{pokemon.imageUrl}}">
                                        </div>
                                    </div>

                                </td>
                                <td>
                                    {{player.logros.join(", ")}}
                                </td>

                                <th>
                                    <button type="button" ng-click="delete(player)"
                                            class="btn btn-default waves-effect">
                                        <i class="material-icons">delete</i>
                                    </button>
                                </th>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</section>

<?php include_once($path . '/js.php') ?>

<script src="js/controller/player.js"></script>
</body>

</html>
