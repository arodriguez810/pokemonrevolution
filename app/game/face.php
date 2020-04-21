<!DOCTYPE html>
<html>
<?php $path = 'layout/'; ?>
<?php include_once($path . '/head.php') ?>
<body class="theme-red">
<!-- Page Loader -->
<?php include_once($path . '/loader.php') ?>
<!-- #END# Page Loader -->
<!-- Overlay For Sidebars -->
<div class="overlay"></div>
<!-- #END# Overlay For Sidebars -->
<style>
    .avatar_table td {
        border: black solid 1px;
    }

    .selected {
        border: red 2px solid !important;
    }

    .nav-tabs > li {
        position: relative;
        top: 0px;
        left: -2px;
    }

    h1, .h1, h2, .h2, h3, .h3 {
        margin-top: 9px;
        margin-bottom: 6px;
    }

</style>

<section id="charactercontroller" ng-app="pokemon" ng-controller="character" style="overflow: hidden">
    <img ng-repeat="(key,value) in COLORS"
         src="{{value}}" title="1"
         id="grd_{{gradientID(value)}}_r"
         style="float: left; position: absolute;top: -999999px">
    <div class="container-fluid">
        <div class="block-header">
            <h3 style="text-align: center"><span style="color: red">{{form.data.name}}</span> Crea tu flow unico para la
                aventura!</h3>
        </div>

        <div class="col-xs-3">
            <canvas id="canvas_face" width="144"
                    height="144"></canvas>

            <canvas id="canvas_sv" width="576" style="display: none"
                    height="384"></canvas>

            <canvas id="canvas_tvd" width="144" style="display: none"
                    height="48"></canvas>

            <select style="width: 146px" class="form-control show-tick" ng-model="form.data.gender">
                <option selected value="Female">Chica</option>
                <option value="Male">Chico</option>
            </select>
            <input ng-disabled="prop.mode==='edit'" style="width: 146px" id="charactername" placeholder="Nombre"
                   type="text" ng-model="form.data.name"
                   class="form-control">
        </div>
        <div class="col-xs-9">

            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation">
                    <a href="#parte" data-toggle="tab">
                        <i class="material-icons">face</i> Parte
                    </a>
                </li>
                <li role="presentation" class="active">
                    <a href="#profile_with_icon_title" data-toggle="tab">
                        <i class="material-icons">developer_board</i> Diseño
                    </a>
                </li>
                <li role="presentation">
                    <a href="#messages_with_icon_title" data-toggle="tab">
                        <i class="material-icons">color_lens</i> Colores
                    </a>
                </li>
                <li>
                    <button ng-click="randomName()" type="button"
                            class="btn btn-red bg-red waves-effect">
                        A lo loco!
                    </button>
                </li>

            </ul>
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane fade" id="parte"
                     style="height: 150px;overflow: scroll">

                    <div ng-show="form.data.gender==='Male'"
                         ng-repeat="(key, category) in {FrontHair:{},RearHair1:{},Eyebrows:{},Mouth:{},Face:{},Eyes:{},Nose:{},AccA:{},Clothing2:{},Cloak1:{},Glasses:{},AccB:{},Ears:{},BeastEars:{},FacialMark:{},Beard:{}}">
                        <button ng-click="selectCategory(key)" style="width: 103px; float: left;margin: 3px"
                                type="button"
                                ng-show="(['Body'].indexOf(key)===-1 && key.indexOf('2')===-1) || key==='Clothing2'"
                                class="btn bg-{{selection.category==key?'red':'default'}} waves-effect">
                            {{LAN.t(key)}}
                        </button>
                    </div>

                    <div ng-show="form.data.gender==='Female'"
                         ng-repeat="(key, category) in {FrontHair:{},RearHair1:{},Eyebrows:{},Mouth:{},Face:{},Eyes:{},Nose:{},AccA:{},Clothing2:{},Cloak1:{},Glasses:{},AccB:{},Ears:{},BeastEars:{},FacialMark:{}}">
                        <button ng-click="selectCategory(key)" style="width: 103px; float: left;margin: 3px"
                                type="button"
                                ng-show="(['Body'].indexOf(key)===-1 && key.indexOf('2')===-1) || key==='Clothing2'"
                                class="btn bg-{{selection.category==key?'red':'default'}} waves-effect">
                            {{LAN.t(key)}}
                        </button>
                    </div>
                    <div ng-repeat="(key, category) in {Tail:{},Wing:{}}">
                        <button ng-click="selectCategory(key)" style="width: 103px;float: left;margin: 3px"
                                type="button"
                                class="btn bg-{{selection.category==key?'blue':'default'}} waves-effect">
                            {{LAN.t(key)}}
                        </button>
                    </div>
                </div>
                <div role="tabpanel" class="tab-pane fade  in active" id="profile_with_icon_title"
                     style="height: 150px;overflow: scroll">
                    <img ng-show="form.data.avatar.required.indexOf(selection.category)===-1"
                         ng-click="selectItem('p00')" title="p00"
                         style="border: {{form.data.avatar.prop[selection.category]=='p00'?'red':'black'}} 2px solid"
                         width="48" height="48" src="../resources/na.png">


                    <img ng-repeat="(key, image) in AVATARDB[form.data.gender].icon[selection.category.replace('1','').replace('2','')]"
                         ng-click="selectItem(key)" title="{{key}}"
                         style="border: {{form.data.avatar.prop[selection.category]==key?'red':'black'}} 2px solid"
                         width="48" height="48" src="{{image['c1']['url']}}">
                </div>
                <div role="tabpanel" class="tab-pane fade" id="messages_with_icon_title"
                     style="height: 150px;overflow: scroll">
                    <button
                            ng-click="selectColor(key)"
                            class="btn bg-{{selection.color==key?'red':'default'}} waves-effect"
                            ng-repeat="(key, value) in AVATARDB[form.data.gender].SV[selection.category][form.data.avatar.prop[selection.category]]"
                            style="width: 80px" type="button">
                        {{value.layer.replace("c","Color ")}}
                    </button>
                    <button
                            ng-click="selectColor(key)"
                            class="btn bg-{{selection.color==key?'red':'default'}} waves-effect"
                            ng-show="!AVATARDB[form.data.gender].SV[selection.category][form.data.avatar.prop[selection.category]][key]"
                            ng-repeat="(key, value) in AVATARDB[form.data.gender].FG[selection.category][form.data.avatar.prop[selection.category]]"
                            style="width: 80px" type="button">
                        {{value.layer.replace("c","Color ")}}
                    </button>
                    <div id="gradients">
                        <img
                                src="../resources/na.png" title="0"
                                width="20px"
                                height="20px"
                                id="grd_0"
                                ng-click="layerIDSet(0)"
                                class="{{(layerID(value)==0)?'selected':''}}"
                                style="float: left; position: relative;border: 2px solid;">
                        <img
                                onload="loadedg()"
                                ng-repeat="(key,value) in COLORS"
                                src="{{value}}" title="1"
                                width="20px"
                                height="20px"
                                id="grd_{{gradientID(value)}}"
                                ng-click="layerIDSet(gradientID(value))"
                                class="{{(layerID(value)==gradientID(value))?'selected':''}}"
                                style="float: left; position: relative;border: 2px solid;">

                        <img ng-repeat="(key,value) in COLORS"
                             src="{{value}}" title="1"
                             id="grd_{{gradientID(value)}}_r"
                             style="float: left; position: absolute;top: -999999px">
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xs-12">
            <div class="col-xs-3">
                <button style="float: right;font-size: 18px;width: 135px" type="button"
                        class="btn  bg-primary" ng-click="save()">
                    <center>
                        <div style="height: 48px;width: 48px;overflow: hidden;">
                            <canvas id="canvas_tv" width="144"
                                    height="192"></canvas>
                        </div>
                    </center>
                    JUGAR
                </button>
            </div>
            <div class="col-xs-9">
                <h3>Diseños y colores para cada parte!</h3>
                <b>Asegurate de usar los 3 tabs, selecciona cada parte aplicale un diseño y luego un color.</b>
            </div>
        </div>
    </div>
    <!-- Form  -->
    <div style="display: none" class="g-signin2" data-onsuccess="onSignIn"></div>
</section>

<?php include_once($path . '/js.php') ?>
<script src="js/controller/avatares.js"></script>
<script src="js/controller/face.js"></script>
<script src="js/controller/pokemon.js"></script>
<script>
    function onSignIn(googleUser) {
        PROFILE = googleUser.getBasicProfile();
        SESSION();
    }
</script>
</body>

</html>
