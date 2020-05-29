<!DOCTYPE html>
<html>
<?php $path = 'layout/'; ?>
<?php include_once($path . '/head.php') ?>

<body class="theme-indigo">
<!-- Page Loader -->
<?php include_once($path . '/loader.php') ?>
<!-- #END# Page Loader -->
<!-- Overlay For Sidebars -->
<div class="overlay"></div>
<!-- #END# Overlay For Sidebars -->
<!-- Search Bar -->


<style>
    section.content {
        margin: 0 !important;
        -moz-transition: 0.5s;
        -o-transition: 0.5s;
        -webkit-transition: 0.5s;
        transition: 0.5s;
    }
</style>

<section class="content" id="personalitycontroller" ng-app="pokemon" ng-controller="personality">

    <!-- Form  -->
    <div class="modal fade" id="personality_form" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lgx" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="largeModalLabel">Personalidad - <b
                                style="color: darkred">{{form.name}}</b></h4>
                    <div class="header-dropdown m-r--5 " loading="personality">
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
                    <div class="row clearfix" ng-repeat="(key,value) in form[form.name]">
                        <h3 class="bg-indigo"
                            style="padding: 5px;text-transform: capitalize;border-radius: 20px;text-align: center;">
                            {{key}}</h3>
                        <div class="col-sm-5" ng-repeat="(keyx,valuex) in value track by $index">
                            <div class="form-group form-float">
                                <div class="form-line focused">
                                    <input type="text" ng-model="form[form.name][key][keyx]" class="form-control">
                                </div>
                                <button style="float: left" type="button" class="btn bg-red btn-link waves-effect"
                                        ng-click="form[form.name][key].splice($index,1)">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                        <button type="button" class="btn bg-green btn-link waves-effect"
                                ng-click="form[form.name][key].push('Texto aquí')">
                            Agregar
                        </button>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-link waves-effect" ng-click="save()">Guardar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="block-header">
            <h2>Personalidades</h2>

        </div>
        <!-- Widgets -->
        <div class="row clearfix">

            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="header">
                        <button type="button" ng-click="refresh()"
                                class="btn btn-primary btn-circle-lg waves-effect waves-circle waves-float">
                            <i class="material-icons">refresh</i>
                        </button>
                        <div class="header-dropdown m-r--5 " loading="personality" style="display: none">
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
                                <th>NAME</th>
                                <th>.</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr ng-repeat="(key, personality) in list | filter:search">
                                <td>{{personality.name}}</td>
                                <th>
                                    <button type="button" ng-click="edit(personality)"
                                            class="btn btn-default waves-effect">
                                        <i class="material-icons">edit</i>
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

<script src="js/controller/personality.js"></script>
</body>

</html>
