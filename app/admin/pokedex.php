<!DOCTYPE html>
<html>
<?php $path = 'layout/'; ?>
<?php include_once($path . '/head.php') ?>

<body class="theme-green">
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

<section class="content" id="pokedexcontroller" ng-app="pokemon" ng-controller="pokedex">

    <!-- Form  -->
    <div class="modal fade" id="pokedex_form" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lgx" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="largeModalLabel">Pokedex</h4>
                    <div class="header-dropdown m-r--5 " loading="pokedex">
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
                                    <input id="pokedexname" type="text" ng-model="form.data.name"
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
                                        <h2>Pokemon</h2>

                                    </div>

                                    <div class="body">


                                    </div>
                                </div>
                            </div>
                        </center>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-link waves-effect" data-dismiss="modal">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="block-header">
            <h2>Pokedex</h2>

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

                        <button type="button" ng-click="save()"
                                class="btn bg-green btn-circle-lg waves-effect waves-circle waves-float">
                            <i class="material-icons">save</i>
                        </button>

                        <div class="header-dropdown m-r--5 " loading="pokedex" style="display: none">
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

                        <div ng-repeat="(key, pokemon) in pokedex | filter:search"
                             style="width: 20%;height: 230px;float: left">
                            <center>
                                <div style="height: 155px;">
                                    <button type="button" ng-click="edit(pokemon)"
                                            class="btn btn-default waves-effect">
                                        <i class="material-icons">edit</i>
                                        {{pokemon.keyname}}
                                    </button>
                                    <img class="img-responsive thumbnail"
                                         src='../resources/poekemon/gif/front/{{pokemon.keyname}}.gif?{{cache}}'>

                                </div>


                            </center>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </div>
</section>

<?php include_once($path . '/js.php') ?>

<script src="js/controller/pokedex.js"></script>
</body>

</html>
