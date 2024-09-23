const APIURL = 'https://api.github.com/users/';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getUser(username) {
    try {
        const {data} = await axios(`${APIURL}${username}`);
        createUserCard(data);
        getRepos(username);
    } catch (err) {
        if (err.response && err.response.status === 404) {
            showError('No profile found with this username');
        }
    }
}

async function getRepos(username) {
    try {
        const {data} = await axios(`${APIURL}${username}/repos?sort=created`);
        displayRepos(data);
    } catch (err) {
        showError('Could not fetch repositories');
    }
}

function createUserCard(user) {
    console.log(user)
    const userID = user.name || user.login;
    const userBio = user.bio ? `<p>${user.bio}</p>` : '';
    const cardHTML = `
    <div class="card">
        <div>
            <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
        </div>
        <div class="user-info">
            <a href="${user.html_url}" class="user-url"><h2>${userID}</h2></a>
            ${userBio}
            <ul>
                <li>${user.followers} <strong>Followers</strong></li>
                <li>${user.following} <strong>Following</strong></li>
                <li>${user.public_repos} <strong>Repositories</strong></li>
            </ul>
            <div id="repos"></div>
        </div>
    </div>`;
    
    main.innerHTML = cardHTML;
}

function showError(message) {
    const errorHTML = `
        <div class="card">
            <h1>${message}</h1>
        </div>`;
    main.innerHTML = errorHTML;
}

function displayRepos(repos) {
    const reposEl = document.getElementById('repos');

    repos.slice(0, 5).forEach(repo => {
        const repoLink = document.createElement('a');
        repoLink.classList.add('repo');
        repoLink.href = repo.html_url;
        repoLink.target = '_blank';
        repoLink.innerText = repo.name;
        reposEl.appendChild(repoLink);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = search.value.trim();

    if(user) {
        getUser(user);
        search.value = '';
    }
});
