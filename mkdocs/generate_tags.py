import os
import re
import json
from ruamel.yaml import YAML
from ruamel.yaml.constructor import SafeConstructor

class IgnoreAliasesConstructor(SafeConstructor):
    def ignore_aliases(self, data):
        return True

    def construct_undefined(self, node):
        return None

def extract_tags(file_path):
    with open(file_path, 'r') as file:
        content = file.read()
        front_matter = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
        if front_matter:
            yaml = YAML(typ='safe')
            metadata = yaml.load(front_matter.group(1))
            return metadata.get('tags', [])
    return []

def load_icons_from_config(config_path):
    yaml = YAML(typ='safe')
    yaml.Constructor = IgnoreAliasesConstructor
    yaml.Constructor.add_constructor(None, IgnoreAliasesConstructor.construct_undefined)
    with open(config_path, 'r') as file:
        config = yaml.load(file)
        return config.get('theme', {}).get('icon', {}).get('tag', {})

def generate_tags_js(tags, tag_icons, recipes):
    js_content = f"const tags = {json.dumps(tags)};\n"
    js_content += f"const tagIcons = {json.dumps(tag_icons)};\n"
    js_content += f"const recipes = {json.dumps(recipes)};\n"
    js_content += """
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
    """

    with open('docs/js/tags.js', 'w') as js_file:
        js_file.write(js_content)

def main():
    tags = set()
    recipes = []
    for root, _, files in os.walk('docs'):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                file_tags = extract_tags(file_path)
                if file_tags:
                    tags.update(file_tags)
                    relative_path = os.path.relpath(file_path, 'docs')
                    html_path = '/' + relative_path.replace('.md', '.html')
                    title = os.path.splitext(os.path.basename(file_path))[0]
                    recipes.append({
                        'link': html_path,
                        'tags': file_tags,
                        'title': title
                    })
    
    tag_icons = load_icons_from_config('mkdocs.yml')
    generate_tags_js(list(tags), tag_icons, recipes)

if __name__ == "__main__":
    main()