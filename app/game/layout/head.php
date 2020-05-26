<?php

$version = "1.0.0.90";

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
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Pokemon Revolution</title>
    <!-- Favicon-->
    <link rel="icon" href="images/logo/favicon.ico" type="image/x-icon">


    <link href="js/font/material.css" rel="stylesheet" type="text/css">

    <!-- Bootstrap Core Css -->
    <link href="plugins/bootstrap/css/bootstrap.css" rel="stylesheet">

    <link href="css/game.css" rel="stylesheet">
    <link href="css/codemirror.css" rel="stylesheet">
    <!-- Animation Css -->
    <link href="plugins/animate-css/animate.css" rel="stylesheet"/>
    <!-- Morris Chart Css-->
    <link href="plugins/morrisjs/morris.css" rel="stylesheet"/>
    <link href="plugins/sweetalert/sweetalert.css" rel="stylesheet"/>
    <!-- Custom Css -->
    <link href="css/style.css" rel="stylesheet">
    <!-- AdminBSB Themes. You can choose a theme from css/themes instead of get all themes -->
    <link href="css/themes/all-themes.css" rel="stylesheet"/>
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
