// this is a for a container of the main content
const contentDisplay = document.querySelector('.results-container');
// this is for a main container

// the next section exists to read enter input from a bunch of input tags
document.querySelector('#result-button')
    .addEventListener('click', function() {
      addContent();
    });
document.querySelector('.search-input').onkeydown = function(e) {
  if (e.keyCode == 13) {
    document.querySelector('.pagination-input').value = 1;
    addContent();
  }
};
document.querySelector('.previous-button').onclick = function(e) {
  document.querySelector('.pagination-input').value -= 1;
  addContent();
};
document.querySelector('.page-num-input').onkeydown = function(e) {
  if (e.keyCode == 13) {
    addContent();
  }
};
document.querySelector('.next-button').onclick = function(e) {
  const num = parseInt(1);
  const num2 = parseInt(document.querySelector('.pagination-input').value);
  document.querySelector('.pagination-input').value = num2 + num;
  addContent();
};
document.querySelector('.pagination-input').onkeydown = function(e) {
  if (e.keyCode == 13) {
    addContent();
  }
};
document.querySelector('.sorter-select').onchange = function() {
  addContent();
};
document.querySelector('.order-select').onchange = function() {
  addContent();
};


// this section renders results of search
addContent =async () => {
  contentDisplay.innerHTML = ``;
  const dataArr =await gitFetchRequest().then((data)=>data.items);
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

// this section is for sending a fetch request to Github API
gitFetchRequest = async () => {
  const query = document.querySelector('.search-input').value;
  const itemAmount = document.querySelector('.page-num-input').value;
  const queryPage = document.querySelector('.pagination-input').value;
  const sorterSelected = document.querySelector('#sorter-select').value;
  const orderSelected = document.querySelector('#order-select').value;

  const URL = `https://api.github.com/search/users?q=${query}&sort=${sorterSelected}&order=${orderSelected}&per_page=${itemAmount}&page=${queryPage}`;
  const response = await fetch(URL).then((response) =>
    response.json()).then((data) => data);
  console.log(response);
  console.log(queryPage);
  console.log(sorterSelected);
  return response;
};

