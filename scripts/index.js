//Development Test completed by Timothy Molga

const nameValuePairList = [];

$(".xml").hide();

//populate the value pair list with array
function populateNameValuePairList(pair) {
    const findList = document.getElementById("nameValuePairList");
    return findList.add(new Option(pair, pair));
}

//add a key value pair to the list
function addPair() {
    const pair = document.getElementById("nameValuePairInput");
    const pairValue = document.getElementById("nameValuePairInput").value;
    const error = document.getElementById("errorMessage");
    //validate input to match requirements   
    const validateInput = /^\s*[0-9a-zA-Z]+=[0-9a-zA-Z]+\s*$/;
    const validationResult = validateInput.exec(pairValue);

    //trim the input, format it, and push it to the array and remove error text if applicable, otherwise show error
    if (validationResult !== null) {
        const formatInput = pairValue.trim().split("=");
        const formatInputOne = formatInput[0].charAt(0).toUpperCase() + formatInput[0].substring(1);
        const formatInputTwo = formatInput[1].charAt(0).toUpperCase() + formatInput[1].substring(1);
        const combinedInput = formatInputOne + "=" + formatInputTwo;
        nameValuePairList.push(combinedInput);
        populateNameValuePairList(combinedInput);
        error.textContent = "";
    } else {
        error.textContent = "Invalid key value pair.";
    }
    pair.value = "";
}

//sort the list by name
function sortName() {
    const findList = document.getElementById("nameValuePairList");
    //reset the list
    for (let length = findList.options.length - 1; length >= 0; length--) {
        findList.options[length].remove();
    }
    //sort and repopulate list
    const sortedList = nameValuePairList.sort();
    return sortedList.map(pair => findList.add(new Option(pair)));
}

//sort the list by value
function sortValue() {
    const findList = document.getElementById("nameValuePairList");
    //reset the list
    for (let length = findList.options.length - 1; length >= 0; length--) {
        findList.options[length].remove();
    }
    //sort and repopulate list
    const sortedList = nameValuePairList
        .map(pair => ({ full: pair, key: pair.match(/=.*$/)[0] }))
        .sort((left, right) => left.key.localeCompare(right.key))
        .map(pair => pair.full);
    return sortedList.map(pair => findList.add(new Option(pair)));
}

//delete the key value pair from the list box
function deletePair() {
    const pair = document.getElementById("nameValuePairList");
    //delete selected options from listbox and array
    for (let selectedIndex = pair.options.length - 1; selectedIndex >= 0; selectedIndex--) {
        if (pair.options[selectedIndex].selected) {
            pair.remove(selectedIndex);
            nameValuePairList.splice(selectedIndex, 1);
        }
    }
}

//show the XML in specific format
function showXML() {
    const xmlContent = document.getElementById("xmlArea");
    xmlContent.textContent = "";
    const spc = "\u00A0";
    const nl = "\r\n";
    //split the array pairs and put them into text on the page
    if (nameValuePairList.length > 0) {
        const pairs = nameValuePairList.map(pair => pair.split("="));
        const splitPairs = pairs.map(
            pair =>
            spc + spc + "<KeyValue>" +
            nl + spc + spc + spc +
            "<Key>" + pair[0] + "</Key>" +
            nl + spc + spc + spc +
            "<Value>" + pair[1] + "</Value>" +
            nl + spc + spc +
            "</KeyValue>" + nl
        );
        const html =
            "XML Content" + nl + nl +
            "<KeyValues>" + nl +
            splitPairs.join("") +
            "</KeyValues>";
        xmlContent.textContent = html;
        $(".xml").show();
    } else {
        xmlContent.textContent = "There is no data to display";
        $(".xml").show();
    }
}

//set the size value of the select list
function setListSize() {
    return nameValuePairList.length > 0 && nameValuePairList.length <= 1 ? 2 : nameValuePairList.length;
}