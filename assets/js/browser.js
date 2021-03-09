
function _isIE() { return browser.name === 'IE'; }
function _isEdge() { return browser.name === 'Edge'; }
function _isMicrosoft() { return _isIE() || _isEdge(); }
function _isFirefox() { return browser.name === 'Firefox'; }
function _isChrome() { return browser.name === 'Chrome'; }
function _isSafari() { return browser.name === 'Safari'; }
function _isAndroid() { return /Android/i.test(navigator.userAgent); }
function _isBlackBerry() { return /BlackBerry/i.test(navigator.userAgent); }
function _isWindowsMobile() { return /IEMobile/i.test(navigator.userAgent); }
function _isIOS() { return /iPhone|iPad|iPod/i.test(navigator.userAgent); }
function _isMobile() { return (this.isAndroid || this.isBlackBerry || this.isWindowsMobile || this.isIOS); }
let browser = {};
const unsupportedBrowsers = {
  Chrome: 79,
  Firefox: 60,
  IE: 11,
  Edge: 15,
  Opera: 50,
  Safari: 8
};
_detectBrowser()
function _detectBrowser() {
  _this = this
  _this.browser = (function () {
    const ua = navigator.userAgent
    let tem
    let M =
      ua.match(
        /(opera|chrome|safari|firefox|msie|gecko|trident(?=\/))\/?\s*(\d+)/i
      ) || [];

    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return { name: 'IE', version: tem[1] || '' };
    }

    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) {
        return { name: tem[1].replace('OPR', 'Opera'), version: tem[2] };
      }
    }

    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
      M.splice(1, 1, tem[1]);
    }
    return { name: M[0], version: M[1] };
  })();
}
if (_browserCheckRouteException() && !isSupported()) {
  console.log('BROWSER UNSUPPORTED')
  window.location.href = "./../html/unsupported-browser.html";
} else {
  console.log('BROWSER SUPPORTED')
}

// returns TRUE if a route exception for the browser check is found.
function _browserCheckRouteException() {
  var routeExceptions = [
    '/unsupported-browser',
  ];

  return !routeExceptions.filter(function (route) {
    if (window.location.href.indexOf(route) > -1) {
      return true;
    }
  }).length;
}

function isSupported() {
  if (unsupportedBrowsers.hasOwnProperty(_this.browser.name)) {
    if (+_this.browser.version > unsupportedBrowsers[_this.browser.name]) {
      return true;
    }
  }
  return false;
}
