let api = "https://api.github.com/users/Mohamed-Fouad-Nassar/repos";
let reposSection = document.getElementById("repos");

function replaceSpecialChars(str) {
  return str.replace(/(-|_)/gim, " ");
}

function KBToMB(KB) {
  return (KB * 0.001024).toFixed(2);
}

async function getRepos(apiLink) {
  try {
    let response = await fetch(apiLink);
    let data = await response.json();
    for (let i = 0; i < data.length; i++) {
      let article = `
          <article class="box">
            <div class="image">
              <img id="projectImage" src="https://github.com/Mohamed-Fouad-Nassar/${
                data[i].name
              }/blob/main/thumbnail.png?raw=true" alt="project-img" />
            </div>
            <div class="info">
              <h3 id="projectName">${replaceSpecialChars(data[i].name)}</h3>
              <a id="userProfile" title="go to owner profile"
                href="${data[i].owner.html_url}">
                ${replaceSpecialChars(data[i].owner.login)}
              </a>
              <p id="projectDescription">${data[i].description}</p>
              <div class="links">
                <a 
                href="https://mohamed-fouad-nassar.github.io/${data[i].name}/">
                  preview</a>
                <a href="${data[i].html_url}">code on github</a>
              </div>
              <div class="foot">
                <div class="size">
                  <ion-icon class="icon" name="cloud-download"></ion-icon>
                  <span>${KBToMB(data[i].size)} MB</span>
                </div>
                <div class="details">
                  <div class="views">
                    <ion-icon class="icon" name="eye"></ion-icon>
                    <span>${data[i].watchers_count}</span>
                  </div>
                  <div class="stars">
                    <ion-icon class="icon" name="star"></ion-icon>
                    <span>${data[i].stargazers_count}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
      `;
      reposSection.innerHTML += article;
      console.log(data[i]);
    }
  } catch (error) {
    console.log(Error(error));
  }
}

getRepos(api);
