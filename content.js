;(function(undefined) {

  /**
   * artoo chrome injection
   * =======================
   *
   * This chrome content script injects artoo in every relevant page when the
   * artoo's extension is activated.
   */

  function injectArtoo() {

    // Creating script element
    var script = document.createElement('script'),
        body = document.getElementsByTagName('body')[0];

    script.src = chrome.extension.getURL('artoo.chrome.js');
    script.type = 'text/javascript';
    script.id = 'artoo_injected_script';
    script.setAttribute('chrome', 'true');

    // Appending to body
    body.appendChild(script);
  }

  function injectExtractor() {

    // Creating script element
    var script = document.createElement('script'),
        body = document.getElementsByTagName('body')[0];

    script.src = chrome.extension.getURL('extractor.js');
    script.type = 'text/javascript';
    script.id = 'extractor_injected';
    script.setAttribute('chrome', 'true');

    // Appending to body
    body.appendChild(script);
  }

  // Requesting variables from background page
  // chrome.runtime.sendMessage({variable: 'enabled'}, function(response) {

  //   // If artoo is enabled, we inject the script
  //   if (response.enabled)
  //     injectScript();
  // });

  injectArtoo();

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if(request.message === "clicked_browser_action") {
        console.log('let\'s go!');
        injectExtractor();
      }
    }
  );

  // Listening to page's messages
  window.addEventListener('message', function(e) {
    // console.log('received', e);
  }, false);
}).call(this);
