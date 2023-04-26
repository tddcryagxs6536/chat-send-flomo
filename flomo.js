// ==UserScript==
// @name         OpenAI Button
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a button to openai.com
// @author       Your Name
// @match        https://chat.openai.com/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // Create button element
    var button = document.createElement('button');
    button.innerHTML = 'Send to flomo';

    // Set button styles
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.zIndex = 9999;

    // Add button to page
    document.body.appendChild(button);

    // Add click event listener
    button.addEventListener('click', function() {
        // Create modal dialog
        var dialog = document.createElement('div');
        dialog.style.position = 'fixed';
        dialog.style.top = '50%';
        dialog.style.left = '50%';
        dialog.style.transform = 'translate(-50%, -50%)';
        dialog.style.width = '400px';
        dialog.style.height = '200px';
        dialog.style.border = '1px solid #ccc';
        dialog.style.borderRadius = '4px';
        dialog.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
        dialog.style.backgroundColor = '#fff';
        dialog.style.zIndex = 10000;

        // Create select element
        var select = document.createElement('select');
        select.style.margin = '20px';

        // Add options to select element
        const markdownDivs = document.querySelectorAll('div.markdown');
        const extractedData = [];
        var options = [];
        markdownDivs.forEach(div => {
            const divContent = div.textContent;
            extractedData.push(divContent);
            options.push({text:divContent.toString().slice(0,16),value:divContent.toString()})
        });

        console.log(extractedData);
        options.forEach(function(option) {
            var optionElem = document.createElement('option');
            optionElem.text = option.text;
            optionElem.value = option.value;
            select.appendChild(optionElem);
        });

        // Add select element to dialog
        dialog.appendChild(select);

        // Create button element
        var okButton = document.createElement('button');
        okButton.innerHTML = 'OK';
        okButton.style.margin = '20px';
// 设置按钮的背景色
        okButton.style.position = "absolute";
        okButton.style.bottom = "10px";
        okButton.style.right = "10px";
        okButton.style.border = "2px solid #000";
        okButton.style.borderRadius = "5px";
        okButton.style.backgroundColor = "#fff";
        okButton.style.padding = "5px 10px";
        okButton.style.backgroundColor = '#ccc';

        var cancelButton = document.createElement('button');
        cancelButton.innerText = 'Cancel';
        cancelButton.style.margin = '20px';
        cancelButton.style.position = 'fixed';
        cancelButton.style.left = '10px';
        cancelButton.style.bottom = '10px';
        cancelButton.style.backgroundColor = 'red';
        cancelButton.style.border = '2px solid black';
        cancelButton.style.borderRadius = '5px';
        cancelButton.style.padding = '5px 10px';
        cancelButton.style.color = 'white';
        cancelButton.style.fontSize = '16px';
        cancelButton.style.fontWeight = 'bold';
        cancelButton.style.zIndex = '9999';


        // Add button click event listener
        okButton.addEventListener('click', function() {
            // Get selected option
            var selectedOption = select.text;
            var selectedOptionContext = "#chatgpt "+select.value.length<=5000?select.value:select.value.slice(0,4999);

            // Send data to flomo API
            var url ="请替换此url";
            var data = JSON.stringify({content: selectedOptionContext});
        var headers = {'Content-type': 'application/json'};
        GM_xmlhttpRequest({
            method: 'POST',
            url: url,
            headers: headers,
            data: data,
            onload: function(response) {
                // Close dialog
                dialog.parentNode.removeChild(dialog);
                // Display success message
                alert('Message sent to flomo!');
            },
            onerror: function(response) {
                // Display error message
                alert('Error sending message to flomo: ' + response.statusText);
            }
        });
    });
        cancelButton.addEventListener('click', function() {
              dialog.parentNode.removeChild(dialog);
        });

    // Add button element to dialog
    dialog.appendChild(okButton);
    dialog.appendChild(cancelButton);
    // Add dialog to page
    document.body.appendChild(dialog);
});
})();