// I want to store the user selection for later use.
let selectedText = ''

// listen for text selection
document.addEventListener('selectionchange', () => {
  selectedText = window.getSelection()?.toString().trim() || ''
})

// I want to retrieves the html of selected text
function getSelectionHTML() {
  const selection = window.getSelection()
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)
    const clonedSelection = range.cloneContents()
    const div = document.createElement('div')
    div.appendChild(clonedSelection)
    return div.innerHTML
  }
  return ''
}

// I want to send the data to background
function sendScarpedData(data: any) {
  chrome.runtime.sendMessage({ type: "SCRAPED_JOB_DATA", data })
}


// listen for messages from the background script
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === "GET_SELECTED_JOB_INFO") {
    const selectedHTML = getSelectionHTML()
    sendScarpedData({
      text: selectedText,
      html: selectedHTML
    })
    sendResponse({ success: true })
  }
})

// add a context menu item 
chrome.runtime.sendMessage({ type: "ADD_CONTEXT_MENU" })