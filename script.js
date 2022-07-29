// this is a for a container of the main content
const contentDisplay = document.querySelector('.results-container');
// this is for a main container

const storageData = JSON.parse(localStorage.getItem('favsArr')) || [];
const favsContentBox = document.querySelector('.favs-content-box');
console.log(storageData)
;
// the next section exists to read enter input from a bunch of input tags

document.querySelector('.search-input').onkeydown = function(e) {
  if (e.keyCode == 13) {
    document.querySelector('.pagination-input').value = 1;
    addContent(storageData);
  }
};
document.querySelector('.previous-button').onclick = function(e) {
  if (document.querySelector('.pagination-input').value == 1) {
    return;
  } else {
    document.querySelector('.pagination-input').value -= 1;
    addContent(storageData);
  }
};
document.querySelector('.page-num-input').onkeydown = function(e) {
  if (e.keyCode == 13) {
    addContent(storageData);
  }
};
document.querySelector('.next-button').onclick = function(e) {
  const num = parseInt(1);
  const num2 = parseInt(document.querySelector('.pagination-input').value);
  document.querySelector('.pagination-input').value = num2 + num;
  addContent(storageData);
};
document.querySelector('.pagination-input').onkeydown = function(e) {
  if (e.keyCode == 13) {
    addContent(storageData);
  }
};
document.querySelector('.sorter-select').onchange = function() {
  addContent(storageData);
};
document.querySelector('.order-select').onchange = function() {
  addContent(storageData);
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

addContent =async (storageData) => {
  contentDisplay.innerHTML = ``;
  const dataArr =await gitFetchRequest().then((data)=>data.items);
  console.log(dataArr.length);

  if (dataArr.length == 0) {
    contentDisplay.innerHTML += `<p class="no-entry">no user found<p>`;
  }
  localStorageFunction = (id, login) => {
    if (localStorage.getItem('favsArr') == null) {
      const selectedObject = dataArr.find((o) => o.id == id);
      const localData = [];
      localData[0] = selectedObject;
      localStorage.setItem('favsArr', JSON.stringify(localData));
      const calledButton = document.querySelector(`#${login}`);
      calledButton.disabled = true;
      calledButton.innerHTML = 'in favorites';
    } else {
      const selectedObject = dataArr.find((o) => o.id == id);
      const storedTestData = JSON.parse(localStorage.getItem('favsArr'));
      storedTestData.push(selectedObject);
      localStorage.setItem('favsArr', JSON.stringify(storedTestData));
      const calledButton = document.querySelector(`#${login}`);
      calledButton.disabled = true;
      calledButton.innerHTML = 'in favorites';
    }


    // // const localData = [];
    // localData[0] = selectedObject;
    // const storedTestData = JSON.parse(localStorage.getItem('testValue'));
    // storedTestData.push(selectedObject);
    // localStorage.setItem('favsArr', JSON.stringify(storedTestData));
  };
  for (let i = 0; i < dataArr.length; i++) {
    contentDisplay.innerHTML += `
       <div class="content-item" id="d${dataArr[i].id}">
          <img src="${dataArr[i].avatar_url}" class='item-img' alt="">
             <div class="item-text-box">
              <h3 class="item-h">
                ${dataArr[i].login} 
              </h3>
            <a href="${dataArr[i].html_url}"
             class="account-link" target="_blank">see account</a>
             <button class="repos-button button
             item-button" onClick="showRepos(this.value,
               this.id)"
             id="${dataArr[i].login}"
             value="${dataArr[i].repos_url}"
             >
             See Repositories</button>
             ${storageData.find((o) => o.id == dataArr[i].id) ?
               `<button class="favorites-button button item-button" disabled>
                in favorites 
               </button>` :
               `<button class="favorites-button button item-button"
               id="m${dataArr[i].id}" 
               onClick="localStorageFunction(this.value, this.id)"
               value="${dataArr[i].id}">
               add to favorites
               </button>`}
                       
             
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
        popUp.innerHTML+= `<a class="repos-link" href="https://github.com/${login}?tab=repositories">see all</a>`;
      }
      if (response.length == 0) {
        popUp.innerHTML+= `<p class="no-entry">no repositories found<p>`;
      }
      console.log(popUp.classList);
      const closeBtn = document.querySelector(`#id${dataArr[i].id}`);
      closeBtn.addEventListener('click', function() {
        popUp.classList.remove('show');
      });
    };
  };
};
for (let i = 0; i < storageData.length; i++) {
  favsContentBox.innerHTML += `
  <div class="fav-item"><img src="${storageData[i].avatar_url}"
   alt="" class="item-img fav-avatar">
   <img src="./media/close.png" alt="" class="favs-close-btn"
    id="${storageData[i].login}" onClick="removeItem(this.id)">
   <div class="fav-item-text-box ">
   <h3>${storageData[i].login}</h3>
   <a href="${storageData[i].html_url}"> see account</a>
    <button class="repos-button button
             item-button" onClick="showRepos(this.value,
               this.id)"
             id="${storageData[i].login}"
             value="${storageData[i].repos_url}"
             >see repos</button>

    </div>
        <div class="popup" id="pop${storageData[i].id}">

        </div>
 
   </div>`;
  removeItem = (id) => {
    const item = storageData.findIndex((o) => o.login == id);
    storageData.splice(item, 1);
    const localStorageData = JSON.parse(localStorage.getItem('favsArr'));
    localStorageData.splice(item, 1);
    localStorage.setItem('favsArr', JSON.stringify(localStorageData));
    console.log(localStorageData);
    favsContentBox.innerHTML = ``;
    for (let i = 0; i < storageData.length; i++) {
      favsContentBox.innerHTML += `
  <div class="fav-item"><img src="${storageData[i].avatar_url}"
   alt="" class="item-img fav-avatar">
   <img src="./media/close.png" alt="" class="favs-close-btn"
    id="${storageData[i].login}" onClick="removeItem(this.id)">
   <div class="fav-item-text-box ">
   <h3>${storageData[i].login}</h3>
   <a href="${storageData[i].html_url}"> see account</a>
    <button class="repos-button button
             item-button" onClick="showRepos(this.value,
               this.id)"
             id="${storageData[i].login}"
             value="${storageData[i].repos_url}"
             >see repos</button>

    </div>
        <div class="popup" id="pop${storageData[i].id}">

        </div>
 
   </div>`;
    }
  };
  showRepos = async (repos, login) => {
    const popUp = document.querySelector(`#pop${storageData[i].id}`);
    const URL = `${repos}`;
    const response = await fetch(URL).then((response) =>
      response.json()).then((data) => data);
    console.log(response);

    popUp.innerHTML = ``;
    console.log(popUp);
    popUp.classList.add('show');
    popUp.innerHTML += `<h3 class="popup-headline">
             repositories of ${login}</h3>
             <img class="pop-close-btn" id="id${storageData[i].id}"
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
      popUp.innerHTML+= `<a class="repos-link" href="https://github.com/${login}?tab=repositories">see all</a>`;
    }
    if (response.length == 0) {
      popUp.innerHTML+= `<p class="no-entry">no repositories found<p>`;
    }

    console.log(popUp.classList);
    const closeBtn = document.querySelector(`#id${storageData[i].id}`);
    closeBtn.addEventListener('click', function() {
      popUp.classList.remove('show');
    });
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

