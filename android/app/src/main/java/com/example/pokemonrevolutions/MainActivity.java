package com.example.pokemonrevolutions;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.browser.customtabs.CustomTabsIntent;

import android.content.Context;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.view.Display;
import android.view.View;
import android.view.WindowManager;
import android.webkit.CookieManager;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends AppCompatActivity {

    WebView PokemonRevolution;
    String url;
    @RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN_MR1)
    @Override
    protected void onCreate(Bundle savedInstanceState) {


        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        getWindow().setFlags(
                WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED,
                WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED);

//        String url = "http://10.0.0.3.xip.io:8080/pokemon/app/admin/home.php";
//        CustomTabsIntent.Builder builder = new CustomTabsIntent.Builder();
//        builder.enableUrlBarHiding();
//        builder.setShowTitle(false);
//        CustomTabsIntent customTabsIntent = builder.build();
//
//        customTabsIntent.launchUrl(this, Uri.parse(url));


        PokemonRevolution = findViewById(R.id.PokemonRevolution);
        if (android.os.Build.VERSION.SDK_INT >= 21) {
            CookieManager.getInstance().setAcceptThirdPartyCookies(PokemonRevolution, true);
        } else {
            CookieManager.getInstance().setAcceptCookie(true);
        }

        WebSettings settings = PokemonRevolution.getSettings();
        settings.setJavaScriptEnabled(true);
        PokemonRevolution.setWebChromeClient(new WebChromeClient());
        settings.setUserAgentString("example_android_app");
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAppCacheEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        settings.setDomStorageEnabled(true);
        settings.setSupportMultipleWindows(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        //settings.setSupportZoom(false);
        PokemonRevolution.loadUrl("http://mangalos.com");
//        PokemonRevolution.setInitialScale(getScale(576, 384));
        PokemonRevolution.setWebViewClient(new WebViewClient()
        {
            // overcome the ontouchstart registration bug !
            @Override
            public void onPageFinished(WebView view, String url)
            {
                super.onPageFinished(view, url);
                final WebView myWebView = (WebView) findViewById(R.id.PokemonRevolution);
                PokemonRevolution.scrollTo(1, 0);
                PokemonRevolution.scrollTo(0, 0);
            }
        });

    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            hideSystemUI();
        }
    }

    private int getScale(int desiredWidth, int desiredHeight){
        Display display = ((WindowManager) getSystemService(Context.WINDOW_SERVICE)).getDefaultDisplay();
        DisplayMetrics metrics = new DisplayMetrics();
        display.getMetrics(metrics);
        int height = metrics.heightPixels;
        int width = metrics.widthPixels;
        Double heightRatio = new Double(height)/new Double(desiredHeight);
        Double widthRatio = new Double(width)/new Double(desiredWidth);
        Double chosen = Math.min(heightRatio, widthRatio);
        return (int)(chosen * 100D);
    }

    private void hideSystemUI() {
        // Enables regular immersive mode.
        // For "lean back" mode, remove SYSTEM_UI_FLAG_IMMERSIVE.
        // Or for "sticky immersive," replace it with SYSTEM_UI_FLAG_IMMERSIVE_STICKY
        View decorView = getWindow().getDecorView();
        decorView.setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_IMMERSIVE
                        // Set the content to appear under the system bars so that the
                        // content doesn't resize when the system bars hide and show.
                        | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                        // Hide the nav bar and status bar
                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_FULLSCREEN);
    }

    // Shows the system bars by removing all the flags
// except for the ones that make the content appear under the system bars.
    private void showSystemUI() {
        View decorView = getWindow().getDecorView();
        decorView.setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
    }
}
