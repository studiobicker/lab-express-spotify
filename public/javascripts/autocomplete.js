window.onload = async function() {
  document.getElementById("artist").onkeyup = completeArtistName;

  async function completeArtistName() {
    clearList();

    const searchString = document.getElementById("artist").value;
    const autocompleteItems = document.getElementById("autocomplete-items");
    let artistArray = await getArtistNames(searchString);
    if (artistArray) {
      for (let i = 0; i < artistArray.length; i++) {
        let suggestion = document.createElement("DIV");
        suggestion.innerHTML += artistArray[i].name;
        suggestion.innerHTML += `<input type="hidden" value="${artistArray[i].name}"></div>`;
        suggestion.addEventListener("click", function(e) {
          /*insert the value for the autocomplete text field:*/
          document.getElementById("artist").value = this.getElementsByTagName(
            "input"
          )[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          clearList();
        });
        autocompleteItems.appendChild(suggestion);
      }
    }
  }

  async function getArtistNames(searchString) {
    try {
      const response = await axios.get(
        `/searchartists/?artist=${searchString}`
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  function clearList() {
    document.getElementById("autocomplete-items").innerHTML = "";
  }
};
