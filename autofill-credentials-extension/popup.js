document.getElementById('fillFormButton').addEventListener('click', async function () {

    console.log('===============clicked=2====================');

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log("tab", tab);

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: fillForm
    });

});




function fillForm() {
    console.log('==============fillForm======================');
    var form = document.querySelectorAll("form")[1];
    console.log("bb", form);
    if (form) {
        form.elements.username.value = "your_username";
        form.elements.password.value = "your_password";
    }

}

// function fillForm() {
//     console.log('==============fillForm======================');

//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.tabs.executeScript(tabs[0].id, {
//             code: `
//           // Your JavaScript code here
//           var form = document.querySelector("form");
//           if (form) {
//             form.elements.username.value = "your_username";
//             form.elements.password.value = "your_password";
//           }
//         `
//         });
//     });
// }