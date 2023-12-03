var searchQuery;
var fuseOptions = {
    shouldSort: true,
    includeMatches: true,
    threshold: 0.0,
    tokenize: true,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        {name: "title", weight: 0.8},
        {name: "contents", weight: 0.5},
        {name: "tags", weight: 0.3},
        {name: "categories", weight: 0.3}
    ]
};

document.addEventListener("DOMContentLoaded", init);

function init() {
    searchQuery = param("s")
    if (searchQuery) {
        gId("search-query").innerHTML = searchQuery;
        gId('search-input').value = searchQuery;
        executeSearch(searchQuery);
    } else {
        gId('search-results').innerHTML += "<p>Please enter a word or phrase</p><form class=\"menu__item__search\" role=\"search\" method=\"get\" action=\"/search\"><label for=\"search-input-content\"><input id=\"search-input-content\" type=\"search\" autofocus=\"\" placeholder=\"SEARCH…\" name=\"s\" aria-label=\"SEARCH…\"></label></form>";
    }
}

function gId(id) {
    return document.getElementById(id);
}

function param(name) {
    return decodeURIComponent((location.search.split(name + '=')[1] || '').split('&')[0]).replace(/\+/g, ' ');
}

function executeSearch() {
    var url = "/index.json";
    var xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            renderResults(JSON.parse(xhr.responseText));
        }
    }
    xhr.open("GET", url)
    xhr.send();
}

function renderResults(pages) {
    var fuse = new Fuse(pages, fuseOptions);
    var result = fuse.search(searchQuery);

    if (result.length > 0) {
        populateResults(result);
    } else {
        gId('search-results').innerHTML = ("<p>No matches found</p>");
    }
}

function populateResults(result) {
    var templateDefinition = gId('search-result-template').innerHTML;
    for(var key in result){
        var value = result[key];

        var snippet = value.item.contents;
        var snippetParts = snippet.split('\n');
        if(snippetParts.length > 1){
            snippet = snippetParts[0];
        }
        if(snippet.length > 200){
            snippet = snippet.substr(0, 200) + "...";
        }

        gId('search-results').innerHTML += render(templateDefinition, {
            key: key,
            title: value.item.title,
            link: value.item.permalink,
            tags: value.item.tags,
            categories: value.item.categories,
            snippet: snippet
        });
    }
}

function render(templateString, data) {
    var conditionalMatches, conditionalPattern, copy;
    conditionalPattern = /\${\s*isset ([a-zA-Z]*) \s*}(.*)\${\s*end\s*}/g;
    
    copy = templateString;
    while ((conditionalMatches = conditionalPattern.exec(templateString)) !== null) {
        if (data[conditionalMatches[1]]) {
            copy = copy.replace(conditionalMatches[0], conditionalMatches[2]);
        } else {
            copy = copy.replace(conditionalMatches[0], '');
        }
    }
    templateString = copy;
    
    var key, find, re;
    for (key in data) {
        find = '\\$\\{\\s*' + key + '\\s*\\}';
        re = new RegExp(find, 'g');
        templateString = templateString.replace(re, data[key]);
    }
    return templateString;
}