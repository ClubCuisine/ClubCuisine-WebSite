const tags = ["Italie", "Rapide", "Facile", "Four", "Sans alcool", "Sans porc"];
const tagIcons = {"france": "material/flag", "italie": "material/flag", "espagne": "material/flag", "mexique": "material/flag", "etats_unis": "material/flag", "bresil": "material/flag", "argentine": "material/flag", "perou": "material/flag", "chine": "material/flag", "japon": "material/flag", "coree_du_sud": "material/flag", "thailande": "material/flag", "vietnam": "material/flag", "inde": "material/flag", "maroc": "material/flag", "turquie": "material/flag", "grece": "material/flag", "liban": "material/flag", "egypte": "material/flag", "afrique_du_sud": "material/flag", "russie": "material/flag", "allemagne": "material/flag", "suisse": "material/flag", "belgique": "material/flag", "portugal": "material/flag", "australie": "material/flag", "nouvelle_zelande": "material/flag", "entree": "fontawesome/solid/utensils", "plat": "material/food", "dessert": "material/ice-cream", "vegetarien": "material/leaf", "vegetalien": "material/leaf", "sans_gluten": "material/bread-slice", "sans_lactose": "material/cow", "sans_fruits_a_coque": "material/leaf", "facile": "material/emoticon-happy", "moyen": "material/alert", "difficile": "material/emoticon-sad", "rapide": "material/clock", "long": "material/clock", "four": "material/toaster-oven", "sans_four": "material/toaster-oven", "sans_porc": "material/pig-variant", "sans_alcool": "material/glass-cocktail-off"};
const recipes = [{"link": "/Recettes/Entr\u00e9es/Salade de tomate.html", "tags": ["Italie", "Facile", "Rapide", "Sans porc", "Sans alcool"], "title": "Salade de tomate"}, {"link": "/Recettes/Entr\u00e9es/Cake aux olives et jambon.html", "tags": ["Facile", "Sans alcool", "Four"], "title": "Cake aux olives et jambon"}];

    document.addEventListener('DOMContentLoaded', function() {
        const tagInput = document.getElementById('tag-search');
        const clearSearch = document.getElementById('clear-search');
        const tagList = document.getElementById('tag-list');
        const resultList = document.getElementById('result-list');
        const selectedTags = new Set(JSON.parse(localStorage.getItem('selectedTags')) || []);
        let currentQuery = '';

        // Afficher tous les tags par défaut avec icônes
        function renderTags() {
            const filteredTags = tags.filter(tag => tag.toLowerCase().includes(currentQuery));
            const sortedTags = filteredTags.sort((a, b) => a.localeCompare(b)); // Trier les tags par ordre alphabétique
            tagList.innerHTML = sortedTags.map(tag => {
                const isSelected = selectedTags.has(tag);
                return `<li class="md-tag md-tag-icon md-tag--${tag.toLowerCase().replace(/ /g, '_')} ${isSelected ? 'selected' : ''}">${tag}</li>`;
            }).join('');
        }

        function updateResults() {
            if (selectedTags.size === 0) {
                resultList.innerHTML = '';
                resultList.style.display = 'none';
                return;
            }

            const filteredRecipes = recipes.filter(recipe => {
                const recipeTags = recipe.tags;
                return Array.from(selectedTags).every(tag => recipeTags.includes(tag));
            });

            const sortedRecipes = filteredRecipes.sort((a, b) => a.title.localeCompare(b.title)); // Trier les résultats par ordre alphabétique
            resultList.innerHTML = `<h3 class="result-list-item">Résultats de filtrage :</h3>` + sortedRecipes.map(recipe => `<li class="result-list-item"><a href="${recipe.link}">${recipe.title}</a></li>`).join('');
            resultList.style.display = 'block';

            // Ajouter la classe 'show' avec un léger délai pour l'animation
            setTimeout(() => {
                document.querySelectorAll('.result-list-item').forEach(item => {
                    item.classList.add('show');
                });
            }, 10); // Délai de 10ms pour permettre le rendu initial
        }

        // Initialiser l'affichage des tags et des résultats
        renderTags();
        updateResults();

        tagInput.addEventListener('input', function() {
            currentQuery = tagInput.value.toLowerCase();
            renderTags();
            clearSearch.style.display = tagInput.value ? 'block' : 'none';
        });

        clearSearch.addEventListener('click', function() {
            tagInput.value = '';
            currentQuery = '';
            renderTags();
            clearSearch.style.display = 'none';
        });

        tagList.addEventListener('click', function(event) {
            if (event.target.tagName === 'LI') {
                const selectedTag = event.target.textContent.trim();
                if (selectedTags.has(selectedTag)) {
                    selectedTags.delete(selectedTag);
                    event.target.classList.remove('selected');
                } else {
                    selectedTags.add(selectedTag);
                    event.target.classList.add('selected');
                }
                localStorage.setItem('selectedTags', JSON.stringify(Array.from(selectedTags)));
                updateResults();
                renderTags();
            }
        });

        // Restaurer les tags sélectionnés à partir du localStorage
        if (selectedTags.size > 0) {
            renderTags();
            updateResults();
        }
    });
    