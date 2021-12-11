// Database - Extended Details
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action == "extdatabase") {
            var url = "https://raw.githubusercontent.com/ChristopherKlay/StadiaEnhanced/master/include/extdatabase.csv"
            fetch(url)
                .then(response => response.text())
                .then(result => sendResponse(result))
            return true
        }
    })

// Stadia Hunters - Player Stats
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action == "stadiahunters") {
            var url = 'https://us-central1-stadiaachievements-34145.cloudfunctions.net/stadiaEnhanced?id=' + request.id
            fetch(url)
                .then(response => response.text())
                .then(result => sendResponse(result))
            return true
        }
    })

// Discord RPC
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action == "presencedata") {
            var url = "https://raw.githubusercontent.com/ChristopherKlay/StadiaEnhanced/master/include/presence.json"
            fetch(url)
                .then(response => response.text())
                .then(result => sendResponse(JSON.parse(result)))
            return true
        }
    })

chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
    if (request.action == "presence") {
        chrome.tabs.sendMessage(request.tab, request.info, function (response) {
            sendResponse(response)
        })
    }
    return true
})

const WISHLIST = [
    "https://stadia.google.com/store/details/8b7e7f7036e5483eaa8745d46248536crcp1/sku/6760aad6e75b4edc9686c48e8dd38936",
    "https://stadia.google.com/store/details/14b4e92868c9412ca7fd4ea88d733b2arcp1/sku/883dc42e337c4d1c95c08d3585491ee3p",
    "https://stadia.google.com/store/details/ed81a01114044edcacfa52656b259d41rcp1/sku/f0c21370f7e2488f8898ae59220c2e24p",
    "https://stadia.google.com/store/details/2152a1e96d5b47b18a5df7ca9bb0751frcp1/sku/f790e37b6161477188923408085528a1",
    "https://stadia.google.com/store/details/2152a1e96d5b47b18a5df7ca9bb0751frcp1/sku/08bf286364164e14bac41b0040d6331f"
]

// fetch game details
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "resolve-wishlist") {

        chrome.storage.local.get(["enhanced_wishlist"], async function (result) {

            // get wishlist
            const detailedWishlist = []
            for (const url of result.enhanced_wishlist) {
                let details = await fetchGameDetails(url);
                detailedWishlist.push(details)
                console.log(JSON.stringify(details))
            }

            chrome.storage.local.set({"enhanced_wishlist_details": detailedWishlist}, function (result) {
                console.log("Details fetched")
            });

            sendResponse({})
        })

    }
})

async function fetchGameDetails(url) {
    const res = await fetch(url)
    const html = await res.text()

    const page = document.createElement("html")
    page.innerHTML = html

    let titleEl = page.querySelector("div.UG7HXc") // e

    const priceEl = page.querySelector("div.eoQBOd")
    return {
        title: titleEl.textContent,
        price: priceEl.textContentoQBOd
    if (titleEl == null) {
        throw Error("TITLE NOT FOUND")
    }
    }
}
qdfgdgf
// encode URL
function encodeURL(url) {
    return encodeURIComponent(url)
}
