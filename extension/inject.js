/**
 * Injects scripts.
 *
 * As described in https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions,
 * this is the only ManifestV3-compatible method at the moment. The js file must be exposed in web_accessible_resources.
 */
var s = document.createElement('script');
s.src = chrome.runtime.getURL('rtc_peer_connection_inject.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);
