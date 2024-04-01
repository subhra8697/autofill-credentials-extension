let popupStatusStorageId;


const fillingPassword = async () => {

    try {

        //  use chrome .includes here both sides
        console.log("website url", location.href);
        const emailToFill = "thisisemail@gmail.com"
        const passToFill = "this is password"

        let inputs = Array.from(document.getElementsByTagName("input"));
        const inputsOnlyPass = document.querySelectorAll('input[type="password"]')[0];
        const relatedForm = inputsOnlyPass.closest('form');

        let inputsOnlyEmail;
        const indexOfPassField = inputs.indexOf(inputsOnlyPass);
        if (indexOfPassField > 0) {
            inputsOnlyEmail = inputs[indexOfPassField - 1];
            inputsOnlyEmail.value = emailToFill;
        }
        savingPassword(relatedForm, inputsOnlyEmail.name, inputsOnlyPass.name)

        inputsOnlyPass.value = passToFill;
    } catch (error) {
        console.log("error", error);
    }

    function savingPassword(_form, _emailId, _passId) {

        console.log(_emailId);
        _form.addEventListener("submit", function (e) {
            // e.preventDefault()
            try {

                const userEmail = _form.elements[_emailId].value;
                const userPass = _form.elements[_passId].value;

                // encrypt and save these details in localstorage and then get them in popup
                saveShowSaveCredentialsPopupStatus(popupStatusStorageId, true);



            } catch (error) {
                prompt("eror", error.message)
            }
        });
    }
}



function showHidePopup() {
    const isExist = document.getElementById("save-credential-popup-001")

    isExist.classList.toggle("visible-savecredentialpopup")
}

function addPopupInPage() {
    const isExist = document.getElementById("save-credential-popup-001")

    if (!isExist) {
        const styles = `.open-button {
        visibility:hidden;
        background-color: red;
        color: white;
        padding: 16px 20px;
        border: none;
        cursor: pointer;
        opacity: 0.8;
        position: fixed;
        top: 23px;
        right: 28px;
        width: 280px;
      }
      
      .visible-savecredentialpopup{
        visibility: visible;
      }
      `
        const styleSheet = document.createElement("style")
        styleSheet.innerText = styles
        document.head.appendChild(styleSheet)


        const saveCredmtialPopup = document.createElement("div");
        saveCredmtialPopup.id = "save-credential-popup-001"
        saveCredmtialPopup.className = "open-button";

        saveCredmtialPopup.innerHTML =
            `<form>
            <input type="text" value="this is email">
            <input type="password" value="password">
            <button>Save</button>
            <button>Close</button>
        </form>`
        document.body.appendChild(saveCredmtialPopup);
    }

}


const fetchShowSaveCredentialsPopupStatus = async (_id) => {
    return new Promise((resolve) => {
        chrome.storage.sync.get([_id], (obj) => {
            resolve(obj[_id]);
        });
    });
};


const saveShowSaveCredentialsPopupStatus = (_id, _status) => {
    chrome.storage.sync.set({ [_id]: _status });
};





const main = async () => {
    addPopupInPage()
    fillingPassword()
    popupStatusStorageId = "status" + location.origin;
    const _status = await fetchShowSaveCredentialsPopupStatus(popupStatusStorageId);

    if (_status) {
        showHidePopup()
        saveShowSaveCredentialsPopupStatus(popupStatusStorageId, false)
    }

};


main()