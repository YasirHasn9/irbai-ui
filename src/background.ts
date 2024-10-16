// The background script is essential for managing tasks that need to run in the background, such as handling messages from content scripts and responding to extension events (e.g., installation).
// Simply this file gonna work as a middleman between
// the content and popup and within itself as well as the passing messages, tab control and chrome storage -- awesome

// This is the lifecycle of the extension - like the time is is installed or the time it listened to some event
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension is installed")
    chrome.contextMenus.create({
        id: "sendSelectedJobInfo",
        title: "send selected job info",
        contexts: ['selection']
    })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "sendSelectedJobInfo" && tab?.id) {
        chrome.tabs.sendMessage(tab.id, { action: "GET_SELECTED_JOB_INFO" })
    }
})

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg.type === "SCRAPED_JOB_DATA") {
        handleJobScrape(msg.data).then(res => sendResponse(res))
        return true
    }
})

// Basically, here we are gonna handle the messages from content
async function handleJobScrape(data: any) {
    chrome.storage.local.set({ jobData: data })

    // return something to the sender 
    return { success: true, message: "Job data processed and stored successfully" }
}



// /*
// message depends on whatever object the chrome.runtime.sendMessage({object}) is sending from the content.ts
// message = {
//     type: "String",
//     data: (Whatever the the data is going to be (maybe the scraped data))
// }
// */


// /*
// sender_or_tab =
// {
//     documentId: "",
//     id: "",
//     documentLifeCycle: "",
//     framedId: 0 -> number,
//     origin: "The base url for that website",
//     url: "the whole url of the webpage",
//     tab: {
//         active: boolean,
//         audible: boolean,
//         autoDiscardable: boolean,
//         discarded: bool,
//         favIconUrl: "has the website icon",
//         groupId: number,
//         height: number,
//         highlighted: bool,
//         id: number,
//         incognito: bool,
//         index: number,
//         lastAccessed: number (maybe indicates a date),
//         mutedInfo: {
//             muted: bool
//             },
//         pinned: bool,
//         selected: bool,
//         status: string(I think it is enum with fixed values),
//         title: string (I think this is the name of the website),
//         url: "the whole url",
//         width: number -> maybe this is the size of the webpage,
// }
// */

































