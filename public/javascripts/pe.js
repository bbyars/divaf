// Default to low-bandwidth version, but allow enhancement.
// Save a cookie indicating whether to enhance or not, so the user
// doesn't have to select on every page.
// Tried enhance.js (http://code.google.com/p/enhancejs/), but
// many browers pass the capability checks in Nigeria, and still
// can't load because of bandwidth resrictions.  Some of this code
// was ripped from enhance.js

window.onload = function() {
    var settings = {
        enhanceLinkText: "View enhanced version (may be slower to load)",
        degradeLinkText: "View trimmed down version (loads faster)",
        enhancedClassName: "enhanced",
        linkId: "enhancementToggle",
        cookieName: "enhanced"
    };

    var html = document.documentElement;

    var classNameSet = function() {
        return html.className == settings.enhancedClassName;
    }

    var cookieSet = function() {
        return readCookie(settings.cookieName) === "true";
    };

    var isEnhanced = function() {
        return classNameSet() || cookieSet();
    };

    var toggle = function() {
        html.className = classNameSet() ? "" : settings.enhancedClassName;
    };

    var linkText = function() {
        return classNameSet() ? settings.degradeLinkText : settings.enhanceLinkText;
    };

    var enhanceFromCookie = function() {
        if (cookieSet()) {
            toggle();
        }
    };

    var createLink = function() {
        var link = document.createElement("a");
        link.href = "#";
        link.id = settings.linkId;
        link.innerHTML = linkText();
        link.onclick = function() {
            toggle();
            link.innerHTML = linkText();

            if (classNameSet()) {
                createCookie(settings.cookieName, "true", 1);
            }
            else {
                eraseCookie(settings.cookieName);
            }
        }
        document.getElementsByTagName("body")[0].appendChild(link);
    };

    // cookie functions from quirksmode.org
    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
                }
        return null;
    }

    function eraseCookie(name) {
        createCookie(name,"",-1);
    }

    enhanceFromCookie();
    createLink();
};

