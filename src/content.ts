// From here we send messages to the background 


// for now we are gonna assume the jobData is
const jobData = {
    title: "Software engineer",
    description: "Responsible to do a lot of things with shitty pay",
    requirements: ["React", "Js", "has no life"]
}

chrome.runtime.sendMessage({ type: "Scrape_Job", data: jobData }).then((res) => {

    console.log("Response from the background", res)
})