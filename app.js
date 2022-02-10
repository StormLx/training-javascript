// ELEMENTS
const inputSearch = document.getElementById('input--search');
const btnSearch = document.getElementById('btn--search');
const app = document.getElementById('app');

// DATA
const articles = [{
    title: 'Macron en prison',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore error distinctio doloremque inventore eligendi atque ad dolor pariatur illum eos, nemo perferendis quos vitae alias modi porro assumenda tempora rerum!'
},
    {
        title: 'Mbappé au real ? C\'est déjà fait!',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore error distinctio doloremque inventore eligendi atque ad dolor pariatur illum eos, nemo perferendis quos vitae alias modi porro assumenda tempora rerum!'
    }
];

// EVENT LISTENERS
btnSearch.addEventListener('click', () => {
    displayResult();
});

inputSearch.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        displayResult();

    }
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

function createMarkup(article) {
    return `
    <div class="card" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${article.title}</h5>
      <p class="card-text">${article.description}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
    `;
}

function displayResult() {
    // Permet de supprimer tout le contenu de la balise html
    // Avant l'insertion du markup.
    app.innerHTML = '';
    // trim() permet d'enlever les espaces au début et à la fin d'une string.
    const word = inputSearch.value.toUpperCase().trim();
    const foundArticles = filter(word);
    console.log(foundArticles);
    if (word && foundArticles.length > 0) {
        foundArticles.forEach(article => {
            const _markup = createMarkup(article);
            app.insertAdjacentHTML('afterbegin', _markup);
        });
    } else if (word && foundArticles.length === 0) {
        app.insertAdjacentHTML('afterbegin', `<p>Aucun résultat.</p>`);
    } else {
        app.insertAdjacentHTML('afterbegin', `<p class="text-danger">Veuillez taper au moins 1 mot.</p>`);
    }
}