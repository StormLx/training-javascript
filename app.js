// ELEMENTS
let inputSearch;
let btnSearch;
let cardResult;
let btnCreateArticle;
let inputCreateArticleTitle;
let inputCreateArticleDescription;
let btnArticleDelete;
const btnNavHome = document.getElementById('btn--nav--home');
const btnNavSearch = document.getElementById('btn--nav--search');
const btnNavCreateArticle = document.getElementById('btn--nav--create-article');
const app = document.getElementById('app');


// DATA
const articles = [
    {
        id: 1,
        title: 'Macron en prison',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore error distinctio doloremque inventore eligendi atque ad dolor pariatur illum eos, nemo perferendis quos vitae alias modi porro assumenda tempora rerum!'
    },
    {
        id: 2,
        title: 'Mbappé au real ? C\'est déjà fait!',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore error distinctio doloremque inventore eligendi atque ad dolor pariatur illum eos, nemo perferendis quos vitae alias modi porro assumenda tempora rerum!'
    }
];

// EVENT LISTENERS

btnNavHome.addEventListener('click', () => {
    app.innerHTML = '';
    app.insertAdjacentHTML('afterbegin', homeMarkup);
})


btnNavSearch.addEventListener('click', () => {
    app.innerHTML = '';
    app.insertAdjacentHTML('afterbegin', createSearchBar())
    inputSearch = document.getElementById('input--search');
    btnSearch = document.getElementById('btn--search');
    cardResult = document.getElementById('card--result');

    btnSearch.addEventListener('click', () => {
        displayResult();
        btnArticleDelete = document.getElementById('btn--article--delete');
    });

    inputSearch.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            displayResult();
        }
    });
});
btnNavCreateArticle.addEventListener('click', () => {
    app.innerHTML = '';
    app.insertAdjacentHTML('afterbegin', createArticleMarkup);
    btnCreateArticle = document.getElementById('btn--create-article');
    inputCreateArticleTitle = document.getElementById('input--create-article--title');
    inputCreateArticleDescription = document.getElementById('input--create-article--description');

    btnCreateArticle.addEventListener('click' , () => {
        const newArticle = {
            id: +Date.now().toString(),
            title: inputCreateArticleTitle.value,
            description: inputCreateArticleDescription.value
        }
        articles.push(newArticle);
        inputCreateArticleDescription.value = '';
        inputCreateArticleTitle.value = '';

    })

});


// FUNCTIONS
function filter(word) {
    // vérifie si le titre contient le mot recherché 
    // ou si la description contient le mot recherché
    // alors récupère l'article et le stock dans un array.
    return articles.filter(article => article.title.toUpperCase().includes(word) ||
        article.description.toUpperCase().includes(word)
    );
}

/* A la recherche du mot 'macron' filter return cette liste d'objets.
 (la méthode filter renverra toujours une liste d'objets même si il n'y a pas de résultat ou même 1 seul résultat.)
    [
        {
        title: 'Macron en prison',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore error distinctio doloremque inventore eligendi atque ad dolor pariatur illum eos, nemo perferendis quos vitae alias modi porro assumenda tempora rerum!'
    }
]
*/

function createSearchBar() {
    return `
        <div class="row mb-2">
        <div class="col-6">
            <input class="form-control" id="input--search" placeholder="Type your research" type="text">
        </div>
        <div class="col-4">
            <button class="btn btn-primary" id="btn--search" type="button">Search</button>
        </div>
    </div>
    <div class="row" id="card--result"></div>
    `;
}

function createResultCard(article) {
    return `
    <div class="col-6">
        <div class="card">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${article.title}</h5>
                <p class="card-text">${article.description}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
                <a href="#" class="btn btn-danger" id="${article.id}">Delete</a>
            </div>
        </div>
    </div>
`;
}

function displayResult() {
    // Permet de supprimer tout le contenu de la balise html
    // Avant l'insertion du markup.
    cardResult.innerHTML = '';
    // trim() permet d'enlever les espaces au début et à la fin d'une string.
    const word = inputSearch.value.toUpperCase().trim();
    const foundArticles = filter(word);
    if (word && foundArticles.length > 0) {
        foundArticles.forEach(article => {
            const _markup = createResultCard(article);
            cardResult.insertAdjacentHTML('beforeend', _markup);
        });
    } else if (word && foundArticles.length === 0) {
        cardResult.insertAdjacentHTML('beforeend', `<p>Aucun résultat.</p>`);
    } else {
        cardResult.insertAdjacentHTML('beforeend', `<p class="text-danger">Veuillez taper au moins 1 mot.</p>`);
    }
}

const homeMarkup = `
    <div class="row">
    <div class="col">
    <h3>Bienvenue sur notre application de journalistes du dimanche.</h3>
</div>
</div>
`

const createArticleMarkup = `
    <div class="row">
        <div class="col">
            <h4 class="d-flex justify-content-center">Create a new article</h4>
        </div>
    </div>
    <div class="row">
        <div class="col-6">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="input--create-article--title" placeholder="Type your title">
                <label for="floatingInput">Title</label>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-6">
            <div class="form-floating">
                <textarea class="form-control" placeholder="Description" id="input--create-article--description" style="height: 100px"></textarea>
                <label for="floatingTextarea2">Description</label>
            </div>
        </div>
    </div>
    <div class="row mt-4">
        <div class="col-6">
            <button class="btn btn-primary" type="button" id="btn--create-article">Create article</button>
        </div>
    </div>
    
`;

app.insertAdjacentHTML('afterbegin', homeMarkup);