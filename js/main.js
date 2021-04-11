document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
  e.preventDefault()

  const siteName = document.getElementById('siteName').value;
  const siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)) {
    return false;
  }

  const bookmark = {
    name: siteName,
    url: siteUrl
  }


  if (localStorage.getItem('bookmarks') === null) {
    const bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  document.getElementById('myForm').reset();

  displayBookmarks()
}


function deleteBookmark(url) {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  const updatedBookmarks = bookmarks.filter(bookmark => bookmark.url !== url);

  localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  this.parentElement.remove();
}



function displayBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  
  const bookmarksResults = document.getElementById('bookmarksResults');

  bookmarks.forEach(bookmark => {
    const name = bookmark.name;
    const url = bookmark.url;

    bookmarksResults.innerHTML += `
      <div class="well">
      <h3>
        ${name}
        <a class="btn btn-default" target="_blank" href="${url}">Visit</a>
        <a onclick="deleteBookmark.bind(this, '${url}')()" class="btn btn-danger" href="#">Delete</a>
      </h3>
      </div>  
      `;
  })  
}

document.addEventListener('DOMContentLoaded', displayBookmarks)


function validateForm(siteName, siteUrl) {
  if(!siteName || !siteUrl) {
    alert('Please fill in all fields')
    return false;
  }

  const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);

  if(!siteUrl.match(regex)) {
    alert('Please use a valid URL');
    return false;
  }
  
  return true;
}

const chk = document.getElementById('chk');

chk.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});
