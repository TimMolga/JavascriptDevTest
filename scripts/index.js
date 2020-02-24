const nameValuePairList = [];

function PopulateNameValuePairList(pair) {
    const findList = document.getElementById('nameValuePairList');
    return findList.add(new Option(pair, pair));
}

//add a key value pair to the list
function AddPair() {
    const pair = document.getElementById('nameValuePairInput');
    const pairValue = document.getElementById('nameValuePairInput').value;
    const error = document.getElementById('errorMessage');
    const validateInput = /^\s*[\w]+=[\w]+\s*$/;
    const validationResult = validateInput.exec(pairValue);

    if (validationResult !== null) {
        const formattedInput = pairValue.trim();
        nameValuePairList.push(formattedInput);
        PopulateNameValuePairList(formattedInput);
        error.textContent = ''
    } else {
        error.textContent =
            'Invalid key value pair.'
    }
    pair.value = '';
}

//sort the list by name
function SortName() {
    const findList = document.getElementById('nameValuePairList');
    for (let length = findList.options.length - 1; length >= 0; length--) {
        findList.options[length] = null;
    }
    const sortedList = nameValuePairList.sort();
    return sortedList.map(pair => findList.add(new Option(pair)));
}

//sort the list by value
function SortValue() {
    const findList = document.getElementById('nameValuePairList');
    for (let length = findList.options.length - 1; length >= 0; length--) {
        findList.options[length] = null;
    }
    const sortedList = nameValuePairList
        .map(pair => ({ full: pair, key: pair.match(/=.*$/)[0] }))
        .sort((left, right) => left.key.localeCompare(right.key))
        .map(pair => pair.full);
    return sortedList.map(pair => findList.add(new Option(pair)));
}

//delete the key value pair from the list box
function DeletePair() {
    const pair = document.getElementById('nameValuePairList');
    for (
        let selectedIndex = pair.options.length - 1; selectedIndex >= 0; selectedIndex--
    ) {
        if (pair.options[selectedIndex].selected) {
            pair.remove(selectedIndex);
            nameValuePairList.splice(selectedIndex, 1);
        }
    }
}

//show the XML in specific format
function ShowXML() {
    const xmlContent = document.getElementById('xmlArea');
    xmlContent.textContent = '';
    const pairs = nameValuePairList.map(pair => pair.split('='));
    const splitPairs = pairs.map(
        pair =>
        '\u00A0<KeyValue>\r\n\u00A0\u00A0<Key>' +
        pair[0] +
        '</Key>\r\n' +
        '\u00A0\u00A0<Value>' +
        pair[1] +
        '</Value>\r\n\u00A0</KeyValue>\r\n'
    );
    const html = '<KeyValues>\r\n' + splitPairs.join('') + '</KeyValues>';
    xmlContent.textContent = html;
}

//set the size value of the key value pair list
function SetListSize() {
    return nameValuePairList.length > 0 && nameValuePairList.length <= 1 ? 2 : nameValuePairList.length;
}