// This code the service worker in the Manifest V3
// It operates independently
// It listens for event and messages from the content
// Handle the background tasks for the extension -  simply this file gonna work as a middleman between
// the content and popup and within itself as well as the passing messages, tab control and chrome storage -- awesome

// 1. listen when the extension is installed 
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension is installed")
})

// 2. Listen to the messages from content and the popup 
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    console.log("Before handling")
    if (message.type === "Scrape_Job") {
        console.log("Received job scrape request")

        handleJobScrape(message.data).then(res => sendResponse(res))
        return true // indicate that we will response asynchronously

    }

    console.log("After handling")

    return false
})

async function handleJobScrape(data: any) {
    console.log("This is from the handle job scrape  function: ", data)

    // to store smt in the chrome storage 
    // chrome.storage.local.set({ jobData: data })

    // return something to the sender 
    return { success: true, message: "Job data processed and stored successfully" }
}
