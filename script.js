var _Searcher_ = _Searcher_ || {};
function _cb_findItemsByKeywords(root) {
	_Searcher_._cb_findItemsByKeywords(root);
}
(function() {
    _Searcher_.elements = {};
    _Searcher_.elements.inputSearch = document.getElementById("input-search");
    _Searcher_.elements.resultsWrapper = document.getElementById("results-wrapper");
    _Searcher_.elements.ebayScript = document.getElementById("ebay_search_tag");
    _Searcher_.elements.ebayCheckbox = document.getElementById("ebay-checkbox");
    _Searcher_.elements.craigsListCheckbox = document.getElementById("craigs-list-checkbox");
    _Searcher_.elements.amazonCheckbox = document.getElementById("amazon-checkbox");
    _Searcher_.elements.etsyCheckbox = document.getElementById("etsy-checkbox");
})();
(function() {
    _Searcher_.consts = {};
    _Searcher_.consts.ebay = {};
    _Searcher_.consts.ebay.KEYWORDS = "findItemsByKeywords";
    _Searcher_.consts.ebay.RESULT_AMOUNT = "200";
    _Searcher_.consts.ebay.SERVICE_VERSION = "1.0.0";
    _Searcher_.consts.ebay.endPoint = "http://svcs.ebay.com/services/search/FindingService/v1";
    _Searcher_.consts.ebay.operation = "?OPERATION-NAME=";
    _Searcher_.consts.ebay.version = "&SERVICE-VERSION=";
    _Searcher_.consts.ebay.security = "&SECURITY-APPNAME=KyleUhan-GetInfo-PRD-838ccaf50-1c06a23a";
    _Searcher_.consts.ebay.id = "&GLOBAL-ID=EBAY-US";
    _Searcher_.consts.ebay.responseType = "&RESPONSE-DATA-FORMAT=JSON";
    _Searcher_.consts.ebay.callback = "&callback=_cb_findItemsByKeywords";
    _Searcher_.consts.ebay.rest = "&REST-PAYLOAD";
    _Searcher_.consts.ebay.keyWordStarter = "&keywords=";
    _Searcher_.consts.ebay.pagination = "&paginationInput.entriesPerPage=";
})();
(function() {
    var search = _Searcher_.elements.inputSearch;
    var resultsWrapper = _Searcher_.elements.resultsWrapper;
    search.disabled = false;
    search.addEventListener("keyup", handleSearchType);
    var beginEbaySearch = null;

    function handleSearchType(e) {
        clearTimeout(beginEbaySearch);
        if (e.target.value && e.target.value !== "" && e.target.value.length > 0) {
            resultsWrapper.innerText = "Searching ...";
            if (_Searcher_.elements.ebayCheckbox.checked) {
                beginEbaySearch = setTimeout(activateEbaySearch, 1200);
            }
        } else {
            resultsWrapper.innerText = "";
        }

        function activateEbaySearch() {
            var s = document.createElement('script');
            s.id = "ebay_search_tag";
            var url = [];
            url.push(_Searcher_.consts.ebay.endPoint);
            url.push(_Searcher_.consts.ebay.operation);
            url.push(_Searcher_.consts.ebay.KEYWORDS);
            url.push(_Searcher_.consts.ebay.version);
            url.push(_Searcher_.consts.ebay.SERVICE_VERSION);
            url.push(_Searcher_.consts.ebay.security);
            url.push(_Searcher_.consts.ebay.id);
            url.push(_Searcher_.consts.ebay.responseType);
            url.push(_Searcher_.consts.ebay.callback);
            url.push(_Searcher_.consts.ebay.rest);
            url.push(_Searcher_.consts.ebay.keyWordStarter);
            url.push(e.target.value);
            url.push(_Searcher_.consts.ebay.pagination);
            url.push(_Searcher_.consts.ebay.RESULT_AMOUNT);
            s.src = url.join("");
            s.async = true;
            document.body.appendChild(s);
        }
    }
})();
(function() {
    _Searcher_._cb_findItemsByKeywords = ebayKeyWordSearch;
    var resultsWrapper = _Searcher_.elements.resultsWrapper;

    function ebayKeyWordSearch(root) {
        removeScriptTag();
        buildResults(root);
    }

    function buildResults(data) {
        resultsWrapper.innerText = "";
        var items = data && data.findItemsByKeywordsResponse && data.findItemsByKeywordsResponse[0].searchResult && data.findItemsByKeywordsResponse[0].searchResult[0].item ? data.findItemsByKeywordsResponse[0].searchResult[0].item : null;
        if (items) {
            for (var i = 0, len = items.length; i < len; i++) {
                resultsWrapper.appendChild(_Searcher_.buildDisplayListItem(items[i]));
            }
        } else {
            resultsWrapper.innerText = "No results!";
        }
    }

    function removeScriptTag() {
        var script = _Searcher_.elements.ebayScript;
        if (script) {
            script.parentNode.removeChild(script);
        }
    }
})();
(function() {
    _Searcher_.buildDisplayListItem = buildDisplayListItem;

    function buildDisplayListItem(data) {
        var wrapper = document.createElement("div");
        var link = document.createElement("a");
        var img = document.createElement("img");
        var title = document.createElement("div");
        var priceInfo = data.sellingStatus[0].sellingState[0] === "Active" ? data.sellingStatus[0].currentPrice[0].__value__ : "SOLD";
        wrapper.className = "list-item-wrapper";
        link.href = data.viewItemURL[0];
        link.title = data.viewItemURL[0];
        link.target = "_blank";
        img.src = data.galleryURL[0];
        img.alt = data.title[0];
        img.title = data.title[0];
        img.height = "50";
        img.width = "50";
        title.appendChild(document.createTextNode("(ebay) $" + priceInfo + " - " + data.title[0]));
        link.appendChild(img);
        link.appendChild(title);
        wrapper.appendChild(link);
        return wrapper;
    }
})();