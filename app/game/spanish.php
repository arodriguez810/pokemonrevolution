<!DOCTYPE html>
<html>
<?php $path = 'layout/'; ?>
<?php include_once($path . '/head.php') ?>

<body class="theme-yellow">
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

<section class="content" id="spanishcontroller" ng-app="pokemon" ng-controller="spanish">

    <!-- Form  -->
    <div class="modal fade" id="spanish_form" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lgx" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="largeModalLabel">Spanish</h4>
                    <div class="header-dropdown m-r--5 " loading="spanish">
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
                    <div class="row clearfix" ng-repeat="(key,value) in form">
                        <div class="col-sm-4" ng-repeat="(keyx,valuex) in value track by $index">
                            <div class="form-group form-float">
                                <div class="form-line focused">
                                    <input type="text" ng-model="form[key][keyx]" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-link waves-effect" ng-click="save()">Guardar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <!-- Widgets -->
        <div class="row clearfix">

            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="header bg-yellow"
                         style="box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);border: none;position: fixed;top: 0;right: 0;z-index: 12;width: 100%;">
                        <button type="button" ng-click="refresh()"
                                class="btn btn-primary btn-circle-lg waves-effect waves-circle waves-float">
                            <i class="material-icons">refresh</i>
                        </button>
                        <button style="float: right" type="button"
                                class="btn bg-green waves-effect" ng-click="save()">Guardar Todo
                        </button>
                        <div class="header-dropdown m-r--5 " loading="spanish" style="display: none">
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
                        <div class="row clearfix" ng-repeat="(key,value) in list">
                            <div class="col-sm-4" ng-repeat="(keyx,valuex) in value track by $index">
                                <div class="form-group form-float">
                                    <div class="form-line focused">
                                        <input type="text" ng-model="list[key][keyx]" class="form-control">
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

<script src="js/controller/spanish.js"></script>
</body>

</html>
