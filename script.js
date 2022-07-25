const contentDisplay = document.querySelector('.results-container');
document.querySelector('#result-button')
    .addEventListener('click', function() {
      addContent();
    });
document.querySelector('.search-input').onkeydown = function(e) {
  if (e.keyCode == 13) {
    addContent();
  }
};

addContent =async () => {
  contentDisplay.innerHTML = ``;
  const dataArr =await gitFetchRequest().then(data=>data.items);
  console.log(dataArr);
  for (let i = 0; i < dataArr.length; i++) {
    contentDisplay.innerHTML += `
       <div class="content-item">
          <img src="${dataArr[i].avatar_url}" class='item-img' alt="">
             <div class="item-text-box">
              <h3 class="item-h">
                ${dataArr[i].login} 
              </h3>
            <a href="${dataArr[i].html_url}"
             class="account-link">see account</a>
             </div>
       </div>
        `;
  };
};

gitFetchRequest = async () => {
  const query = document.querySelector('.search-input').value;
  const itemAmount = document.querySelector('.page-num-input').value;
  const URL = `https://api.github.com/search/users?q=${query}&per_page=${itemAmount}&page2}`;
  const response = await fetch(URL).then((response) =>
    response.json()).then((data) => data);
  console.log(query);
  console.log(itemAmount);
  return response;
};

