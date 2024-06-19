const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("https://nap.gamota.com/games/support/list-game", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));