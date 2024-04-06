import React, { Component } from 'react';

class KommunicateChat extends Component {
    constructor(props) {
        super(props);
        // this.state = {  };
    }
  componentDidMount() {
    (function(d, m){
        var kommunicateSettings = {"appId":"2015fa0ae0f51cd03336597ac31591520","popupWidget":true,"automaticChatOpenOnNavigation":true};
        var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
        window.kommunicate = m; m._globals = kommunicateSettings;

        kommunicateSettings.onInit = function() {
            var css = ".mck-running-on{color: white} .mck-powered-by{display: none}"; // Add your custom CSS here
            window.Kommunicate.customizeWidgetCss(css); 
        };
      })(document, window.kommunicate || {});
    }
    render() {
        return (
            <div></div>
        );
        }
    }

export default KommunicateChat;