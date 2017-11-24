function handleResponse(message) {
  console.log(`Message from the background script:  ${message.response}`);
}
function handleError(error) {
  console.log(`Error: ${error}`);
}

function notifyBackgroundPage(counter, tab) {
  var sending = browser.runtime.sendMessage({
    cybercounter: counter,
    tab: tab
  });
  sending.then(handleResponse, handleError);  
}

function updateCounter(message) {
  var text = document.body.innerText;
  var cyber = (text.match(/cyber/gi) || []).length;

  notifyBackgroundPage(cyber, message.tab);
}

browser.runtime.onMessage.addListener(updateCounter);
updateCounter();