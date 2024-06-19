const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");

const url = "https://nap.gamota.com/games/support/list-game";
const requestOptions = {
  method: "GET",
  redirect: "follow"
};

fetch(url, requestOptions)
  .then(response => response.json())
  .then(data => {
    const dom = new JSDOM();
    const document = dom.window.document;

    const selectElement = document.createElement('select');
    selectElement.setAttribute('id', 'game');

    // Check if data is an array
    if (Array.isArray(data.data)) {
      data.data.forEach(game => {
        const option = document.createElement('option');
        option.value = game.gameID;
        option.textContent = game.gameName;
        selectElement.appendChild(option);
      });
    } else {
      console.error('Data is not in the expected format.');
    }

    // Output the HTML of the select element
    console.log(selectElement.outerHTML);
  })
  .catch(error => console.error('Có lỗi xảy ra:', error));
