// this is a for a container of the main content
const contentDisplay = document.querySelector('.results-container');
// this is for a main container

// the next section exists to read enter input from a bunch of input tags

document.querySelector('.search-input').onkeydown = function(e) {
  if (e.keyCode == 13) {
    document.querySelector('.pagination-input').value = 1;
    addContent();
  }
};
document.querySelector('.previous-button').onclick = function(e) {
  const val = document.querySelector('.pagination-input').value;
  addContent();
  if (val < 1) val = 1; // minimum is 1
  else val = Math.floor(val); // only integers allowed
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

// this section is for changing tabs
const searchButton = document.querySelector('.search-button');
const favoritesButton = document.querySelector('.favorites-button');
const searchSection = document.querySelector('.search-tab-container');
const favoritesSection = document.querySelector('.favorites-tab-container');
searchButton.addEventListener('click', function a() {
  searchButton.classList.add('btn-selected');
  favoritesButton.classList.remove('btn-selected');

  favoritesSection.classList.add('hide-section');
  searchSection.classList.remove('hide-section');
});
favoritesButton.addEventListener('click', function a() {
  searchButton.classList.remove('btn-selected');
  favoritesButton.classList.add('btn-selected');

  favoritesSection.classList.remove('hide-section');
  searchSection.classList.add('hide-section');
});


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
             class="account-link" target="_blank">see account</a>
             <button class="repos-button" onClick="showRepos(this.value,
               this.id)"
             id="${dataArr[i].login}"
             value="${dataArr[i].repos_url}"
             >
             See Repositories</button>
             </div>
             <div class="popup" id="pop${dataArr[i].id}">

             </div>
       </div>
        `;
    showRepos = async (repos, login) => {
      const popUp = document.querySelector(`#pop${dataArr[i].id}`);
      const URL = `${repos}`;
      const response = await fetch(URL).then((response) =>
        response.json()).then((data) => data);
      console.log(response);

      popUp.innerHTML = ``;
      console.log(popUp);
      popUp.classList.add('show');
      popUp.innerHTML += `<h3 class="popup-headline">
             repositories of ${login}</h3>
             <img class="pop-close-btn" id="id${dataArr[i].id}"
             src="./media/close.png" alt=""
             style="width:20px;height:20px">
             `;
      for (let i = 0; i < response.length; i++) {
        popUp.innerHTML+= `
          <div class="repos-item">
          <div class="repos-headline">
          <h4>${response[i].name}</h4>
          <p class="repos-date"> created ${response[i].created_at}</p>
          </div>
          <div class="repos-text-box">
          <p> main language: 
          ${response[i].language ? response[i].language: ''}<p>
          <a href="${response[i].html_url}" target="_blank">see repository</a>
          </div>
          </div>
       `;
      }
      if (response.length == 30) {
        popUp.innerHTML+= `<a href="https://github.com/${login}?tab=repositories">see all</a>`;
      }
      console.log(popUp.classList);
      const closeBtn = document.querySelector(`#id${dataArr[i].id}`);
      closeBtn.addEventListener('click', function() {
        popUp.classList.remove('show');
      });
    };
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

  return response;
};

const testBtn = document.querySelector('#test-button');
const testInput = document.querySelector('#test-input');
testBtn.addEventListener('click', function() {
  const localData = [];
  localData[0] = testInput.value;
  const storedTestData = JSON.parse(localStorage.getItem('testValue'));
  storedTestData.push(testInput.value);
  localStorage.setItem('testValue', JSON.stringify(storedTestData));
  // localStorage.setItem('testValue', JSON.stringify(localData));
});
