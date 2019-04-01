const modal = document.getElementById('modal-posts');

function makeRequest(url, method, json) {
  return new Promise((resolve, reject) => {
    showSpinner();

    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

    if (method === 'GET') {
      xhr.send();
    }

    if (method === 'PUT') {
      xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
      xhr.send(json);
    }

    if (method === 'DELETE') {
      xhr.send(null);
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) {
        return;
      }

      if (this.readyState === 4 && this.status === 200) {
        hideSpinner();
        try {
        const response = JSON.parse(this.responseText);
        resolve(response);
        } catch (e) {
          console.log(e);
        }
      } else {
        hideSpinner();
        reject(xhr.responseText);
        console.log(xhr.responseText);
      }
    }
  });
}

function showUsers(users) {
  const card = document.getElementById('card');

  users.forEach((user) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'user-card');
    li.setAttribute('id', user.id);
    card.appendChild(li);

    const avatar = document.createElement('div');
    avatar.setAttribute('class', 'avatars');
    li.appendChild(avatar);

    const userName = document.createElement('p');
    userName.setAttribute('class', 'user-name');

    const userNameText = document.createTextNode('user name: ');
    userName.appendChild(userNameText);
    const userNameLink = document.createElement('a');
    userNameLink.setAttribute('href', '#');
    userName.appendChild(userNameLink);
    const userNameLinkText = document.createTextNode(`${user.name}`);
    userNameLink.appendChild(userNameLinkText);

    li.appendChild(userName);

    userNameLink.addEventListener('click', displayPosts);

    const userAddress = document.createElement('div');
    const address = document.createElement('p');
    address.setAttribute('class', 'address-title');
    userAddress.appendChild(address);
    const addressTitle = document.createTextNode('address: ');
    address.appendChild(addressTitle);
    userAddress.setAttribute('class', 'user-address');
    li.appendChild(userAddress);

    const city = document.createElement('p');
    city.setAttribute('class', 'user-city');
    const cityText = document.createTextNode('city: ');
    userAddress.appendChild(city);
    city.appendChild(cityText);
    const citySpan = document.createElement('span');
    city.appendChild(citySpan);
    const cityTextSpan = document.createTextNode(`${user.address.city}`);
    citySpan.appendChild(cityTextSpan);

    const street = document.createElement('p');
    street.setAttribute('class', 'user-street');
    const streetText = document.createTextNode('street: ');
    userAddress.appendChild(street);
    street.appendChild(streetText);
    const streetSpan = document.createElement('span');
    street.appendChild(streetSpan);
    const streetTextSpan = document.createTextNode(`${user.address.street}`);
    streetSpan.appendChild(streetTextSpan);

    const suite = document.createElement('p');
    suite.setAttribute('class', 'user-suite');
    const suiteText = document.createTextNode('suite: ');
    userAddress.appendChild(suite);
    suite.appendChild(suiteText);
    const suiteSpan = document.createElement('span');
    suite.appendChild(suiteSpan);
    const suiteTextSpan = document.createTextNode(`${user.address.suite}`);
    suiteSpan.appendChild(suiteTextSpan);

    const zipcode = document.createElement('p');
    zipcode.setAttribute('class', 'user-zipcode');
    const zipcodeText = document.createTextNode('zipcode: ');
    userAddress.appendChild(zipcode);
    zipcode.appendChild(zipcodeText);
    const zipcodeSpan = document.createElement('span');
    zipcode.appendChild(zipcodeSpan);
    const zipcodeTextSpan = document.createTextNode(`${user.address.zipcode}`);
    zipcodeSpan.appendChild(zipcodeTextSpan);

    const companyName = document.createElement('p');
    companyName.setAttribute('class', 'company-name');
    li.appendChild(companyName);
    const companyNameText = document.createTextNode('company: ');
    companyName.appendChild(companyNameText);
    const companyNameSpan = document.createElement('span');
    companyName.appendChild(companyNameSpan);
    const companyNameTextSpan = document.createTextNode(`${user.company.name}`);
    companyNameSpan.appendChild(companyNameTextSpan);

    const buttons = document.createElement('div');
    buttons.setAttribute('class', 'buttons-div');
    li.appendChild(buttons);
    const saveEditButton = document.createElement('button');
    saveEditButton.setAttribute('class', 'button');
    const saveEditButtonText = document.createTextNode('Save/Edit');
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'button');
    const deleteButtonText = document.createTextNode('Delete');
    buttons.appendChild(saveEditButton);
    saveEditButton.appendChild(saveEditButtonText);
    buttons.appendChild(deleteButton);
    deleteButton.appendChild(deleteButtonText);

    saveEditButton.addEventListener('click', saveEditHandler);
    deleteButton.addEventListener('click', deleteHandler);
  });
}

function showCatAvatars(catUrls, className, classImg) {
  const avatar = document.getElementsByClassName(className);

  for (let i = 0; i < avatar.length; i++) {
    const img = document.createElement('img');
    img.setAttribute('class', classImg);
    avatar[i].appendChild(img);
    img.setAttribute('src', catUrls[i]);
  }
}

makeRequest('https://jsonplaceholder.typicode.com/users', 'GET')
  .then(responseUsersList => {
    showUsers(responseUsersList);
    return responseUsersList;
  })
  .then((responseUsersList) =>
    fetch(`https://api.thecatapi.com/v1/images/search?limit=${responseUsersList.length}&size=small&mime_types=jpg`))
  .then(response => response.json())
  .then((responseCatAvatars) => {
    showCatAvatars(responseCatAvatars.map(cat => cat.url), 'avatars', 'avatar-img')
  })
  .catch(error => console.log(error));

function saveEditHandler(event) {
  showModal();
  const id = event.target.parentElement.parentElement.id;

  const modalContent = document.getElementsByClassName('modal-content')[0];
  const usernameValue = event.target.parentElement.previousSibling.previousSibling.previousSibling.lastChild;

  const form = document.createElement('form');
  form.setAttribute('class', 'form');
  modalContent.appendChild(form);

  const divUserName = document.createElement('div');
  divUserName.setAttribute('id', id);
  form.appendChild(divUserName);
  const usernameTitle = document.createElement('p');
  divUserName.appendChild(usernameTitle);
  const usernameTitleText = document.createTextNode('username: ');
  usernameTitle.appendChild(usernameTitleText);
  const usernameInput = document.createElement('input');
  divUserName.appendChild(usernameInput);
  usernameInput.value = usernameValue.textContent;

  const divCompany = document.createElement('div');
  divCompany.setAttribute('class', 'company');
  form.appendChild(divCompany);
  const companyTitle = document.createElement('p');
  divCompany.appendChild(companyTitle);
  const companyTitleText = document.createTextNode('company: ');
  companyTitle.appendChild(companyTitleText);
  const companyInput = document.createElement('input');
  divCompany.appendChild(companyInput);
  const company = event.target.parentElement.previousSibling.lastChild;
  companyInput.value = company.textContent;

  const divAddress = document.createElement('div');
  divAddress.setAttribute('class', 'address');
  form.appendChild(divAddress);

  const divCity = document.createElement('div');
  divCity.setAttribute('class', 'city');
  divAddress.appendChild(divCity);
  const cityTitle = document.createElement('p');
  divCity.appendChild(cityTitle);
  const cityTitleText = document.createTextNode('city: ');
  cityTitle.appendChild(cityTitleText);
  const cityInput = document.createElement('input');
  divCity.appendChild(cityInput);
  const city = event.target.parentElement.previousSibling.previousSibling.childNodes[1].lastChild;
  cityInput.value = city.textContent;

  const divStreet = document.createElement('div');
  divStreet.setAttribute('class', 'street');
  divAddress.appendChild(divStreet);
  const streetTitle = document.createElement('p');
  divStreet.appendChild(streetTitle);
  const streetTitleText = document.createTextNode('street: ');
  streetTitle.appendChild(streetTitleText);
  const streetInput = document.createElement('input');
  divStreet.appendChild(streetInput);
  const street = event.target.parentElement.previousSibling.previousSibling.childNodes[2].lastChild;
  streetInput.value = street.textContent;

  const divSuite = document.createElement('div');
  divSuite.setAttribute('class', 'suite');
  divAddress.appendChild(divSuite);
  const suiteTitle = document.createElement('p');
  divSuite.appendChild(suiteTitle);
  const suiteTitleText = document.createTextNode('suite: ');
  suiteTitle.appendChild(suiteTitleText);
  const suiteInput = document.createElement('input');
  divSuite.appendChild(suiteInput);
  const suite = event.target.parentElement.previousSibling.previousSibling.childNodes[3].lastChild;
  suiteInput.value = suite.textContent;

  const divZipcode = document.createElement('div');
  divZipcode.setAttribute('class', 'zipcode');
  divAddress.appendChild(divZipcode);
  const zipcodeTitle = document.createElement('p');
  divZipcode.appendChild(zipcodeTitle);
  const zipcodeTitleText = document.createTextNode('zipcode: ');
  zipcodeTitle.appendChild(zipcodeTitleText);
  const zipcodeInput = document.createElement('input');
  divZipcode.appendChild(zipcodeInput);
  const zipcode = event.target.parentElement.previousSibling.previousSibling.lastChild.lastChild;
  zipcodeInput.value = zipcode.textContent;

  const saveButton = document.createElement('button');
  saveButton.setAttribute('class', 'button');
  form.appendChild(saveButton);
  const saveButtonText = document.createTextNode('Save');
  saveButton.appendChild(saveButtonText);

  const cancelButton = document.createElement('button');
  cancelButton.setAttribute('class', 'button');
  form.appendChild(cancelButton);
  const cancelButtonText = document.createTextNode('Cancel');
  cancelButton.appendChild(cancelButtonText);

  saveButton.addEventListener('click', (event) => {
    const data = {};
    data.name = usernameInput.value;
    data.company = companyInput.value;
    data.address = {
      city: cityInput.value,
      street: streetInput.value,
      suite: suiteInput.value,
      zipcode: zipcodeInput.value
    };
    const body = JSON.stringify(data);

    const id = event.target.parentElement.childNodes[0].id;
    makeRequest(`https://jsonplaceholder.typicode.com/users/${id}`, 'PUT', body)
      .then(() => {
        usernameValue.textContent = usernameInput.value;
        company.textContent = companyInput.value;
        city.textContent = cityInput.value;
        street.textContent = streetInput.value;
        suite.textContent = suiteInput.value;
        zipcode.textContent = zipcodeInput.value;

        closeModalHandler();
      })
      .catch(() => {
        console.log('Edit was unsuccessful');
      })
  });

  cancelButton.addEventListener('click', closeModalHandler);
}

function deleteHandler(event) {
  const id = event.target.parentElement.parentElement.id;

  makeRequest(`https://jsonplaceholder.typicode.com/users/${id}`, 'DELETE')
    .then(() => {
      event.target.parentElement.parentElement.remove();
    })
    .catch(() => {
      console.log('Delete was unsuccessful');
    })
}

function displayPosts(event) {

  let postAuthorName = event.target.parentElement.lastChild;
  let postAuthorAvatar = event.target.parentElement.previousSibling.childNodes[0].getAttribute('src');
  let id = event.target.parentElement.parentElement.id;

  let postsArray;

  makeRequest(`https://jsonplaceholder.typicode.com/posts?userId=${id}`, 'GET')
    .then((posts) => {
      postsArray = posts;
      const postIds = posts.map(post => post.id);
      const commentsPromises = postIds.map(id => {
        return makeRequest(`https://jsonplaceholder.typicode.com/comments?postId=${id}`, 'GET');
      });

      return Promise.all(commentsPromises);
    })
    .then((comments) => {
      const modalContent = document.getElementsByClassName('modal-content')[0];
      const ul = document.createElement('ul');
      ul.setAttribute('class', 'posts-list');
      modalContent.appendChild(ul);
      let commentQuantity = 0;

      postsArray.forEach((post, index) => {
        const li = document.createElement('li');
        li.setAttribute('class', 'post-item');
        ul.appendChild(li);
        const authorAvatar = document.createElement('img');
        li.appendChild(authorAvatar);
        authorAvatar.setAttribute('src', postAuthorAvatar);
        authorAvatar.setAttribute('class', 'post-author-avatar');
        const postAuthor = document.createElement('p');
        postAuthor.setAttribute('class', 'post-author');
        li.appendChild(postAuthor);
        const postAuthorText = document.createTextNode(postAuthorName.textContent);
        postAuthor.appendChild(postAuthorText);

        const divPost = document.createElement('div');
        li.appendChild(divPost);
        const postHeader = document.createElement('h3');
        divPost.appendChild(postHeader);
        const postHeaderText = document.createTextNode(post.title);
        postHeader.appendChild(postHeaderText);
        const postBody = document.createElement('p');
        divPost.appendChild(postBody);
        const postBodyText = document.createTextNode(post.body);
        postBody.appendChild(postBodyText);

        const commentsList = document.createElement('ul');
        commentsList.setAttribute('class', 'comments-list');
        li.appendChild(commentsList);
        const commentsForPost = comments[index];

        commentQuantity += commentsForPost.length;

        commentsForPost.forEach(comment => {
          const commentItem = document.createElement('li');
          commentItem.setAttribute('class', 'comment-item');
          commentsList.appendChild(commentItem);

          const authorCommentAvatar = document.createElement('div');
          commentItem.appendChild(authorCommentAvatar);
          authorCommentAvatar.setAttribute('class', 'author-comment-avatar');
          const emailCommentAuthor = document.createElement('p');
          emailCommentAuthor.setAttribute('class', 'email-comment-author');
          commentItem.appendChild(emailCommentAuthor);
          const emailCommentAuthorText = document.createTextNode(comment.email);
          emailCommentAuthor.appendChild(emailCommentAuthorText);

          const divComment = document.createElement('div');
          commentItem.appendChild(divComment);
          divComment.setAttribute('class', 'comment');
          const commentHeader = document.createElement('h4');
          divComment.appendChild(commentHeader);
          const commentHeaderText = document.createTextNode(comment.name);
          commentHeader.appendChild(commentHeaderText);
          const commentBody = document.createElement('p');
          divComment.appendChild(commentBody);
          const commentBodyText = document.createTextNode(comment.body);
          commentBody.appendChild(commentBodyText);
        });
      });
      showModal();
      fetch(`https://api.thecatapi.com/v1/images/search?limit=${commentQuantity}&size=small&mime_types=jpg`)
        .then(response => response.json())
        .then(cats => showCatAvatars(cats.map(cat => cat.url), 'author-comment-avatar', 'comment-avatar-img'))
        .catch(error => console.log(error));
    });
}

function showModal() {
  modal.style.display = 'block';
  const close = document.getElementsByClassName('close')[0];
  close.addEventListener('click', closeModalHandler);
}

function closeModalHandler() {
  modal.style.display = 'none';
  const modalContent = document.getElementsByClassName('modal-content')[0];
  modalContent.removeChild(modalContent.childNodes[3]);
}

function showSpinner() {
  const spinner = document.getElementsByClassName('loader')[0];
  spinner.style.display = 'block';
}

function hideSpinner() {
  const spinner = document.getElementsByClassName('loader')[0];
  spinner.style.display = 'none';
}
