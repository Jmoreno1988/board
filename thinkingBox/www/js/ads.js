/*
(function() {
  'use strict';
  var admobData = {};
  // Determine platform
  if (/(android)/i.test(navigator.userAgent)) {
    admobData = {
        //banner: 'ca-app-pub-1817269486258695/6892783564'
        banner: 'ca-app-pub-7498305642510333/6304583206'
    };
  } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobData = {
        banner: 'ca-app-pub-7498305642510333/6304583206'
    };
  } else {
      
    admobData = {
        banner: 'ca-app-pub-7498305642510333/6304583206'
    };
  }
  function setBanner() {
    if (AdMob) {
        console.log(123)
        AdMob.createBanner({
            adId : admobData.banner,
            position : AdMob.AD_POSITION.BOTTOM_CENTER,
            autoShow : true
        });
    }
  }
  document.addEventListener('deviceready', setBanner, false);
}());
*/

var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) { 
    admobid = { // for Android
        banner: 'ca-app-pub-7498305642510333/8492812085'
    };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
        banner: 'ca-app-pub-7498305642510333/8492812085'
    };
} else {
    admobid = { // for Windows Phone
        banner: 'ca-app-pub-7498305642510333/8492812085'
    };
}

if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
    document.addEventListener('deviceready', initApp, false);
} else {
    initApp();
}

function initApp() {
    if (! AdMob ) { alert( 'admob plugin not ready' ); return; }

    AdMob.createBanner( {
        adId: admobid.banner, 
        isTesting: false, // Production in false!!!
        overlap: false, 
        offsetTopBar: false, 
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        bgColor: 'black',
        autoShow: true
    } );
    
    AdMob.prepareInterstitial({
        adId: admobid.interstitial,
        autoShow: false
    });

}
