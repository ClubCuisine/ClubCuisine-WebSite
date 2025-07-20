---
# MÉTADONNÉES OBLIGATOIRES DE LA RECETTE
# Le titre de la recette doit être clair et descriptif
tile: Cake aux olives et jambon
# Ces tags déterminent comment la recette apparaîtra dans le système de filtrage
tags:
  # ORIGINE GÉOGRAPHIQUE (choisir une seule origine)
  - France          # ou Italie, Espagne, Mexique, États-Unis, Brésil, Argentine, etc.
  
  # TYPE DE PLAT (choisir un seul type)
  - Entrée          # ou Plat, Dessert
  
  # RESTRICTIONS ALIMENTAIRES (ajouter toutes celles qui s'appliquent)
  - Végétarien      # ou Végétalien, Sans gluten, Sans lactose, Sans fruits à coque
  - Sans porc       # si applicable
  - Sans alcool     # si applicable
  
  # NIVEAU DE DIFFICULTÉ (choisir un seul niveau)
  - Facile          # ou Moyen, Difficile
  
  # DURÉE DE PRÉPARATION (choisir selon le temps total)
  - Rapide          # moins de 30 minutes / ou Long (plus de 30 minutes)
  
  # ÉQUIPEMENT NÉCESSAIRE (ajouter selon les besoins)
  - Four            # si un four est nécessaire / ou Sans four
---

# [Nom de la Recette]
<!-- 
CONSEILS POUR LE TITRE :
- Utilisez un nom descriptif et appétissant
- Évitez les caractères spéciaux dans le nom du fichier
- Exemple : "Cake aux olives et jambon" 
-->

## Ingrédients

### Pour [X] personnes :
<!-- 
SYSTÈME D'AJUSTEMENT DES QUANTITÉS :
- Remplacez [X] par le nombre de personnes de base
- Cette section active automatiquement le système d'ajustement des portions
-->

<div class="people-adjustment">
  <button class="adjust-button minus">-</button>
  <input type="number" id="num-people" value="1" min="1" data-default-quantity="[X]"> <!-- [X] doit correspondre à la quantité de base -->
  <button class="adjust-button plus">+</button>
</div>

<div class="grid cards" markdown>
<!-- 
FORMATAGE DES INGRÉDIENTS :
- Chaque ingrédient doit utiliser la classe "ingredient"
- data-base-quantity : quantité numérique de base
- data-unit : unité de mesure (g, ml, cuillères, etc.)
- Si pas d'unité spécifique, laisser data-unit=""
EXEMPLES DE FORMATAGE :
- Quantité avec unité : <span class="ingredient" data-base-quantity="150" data-unit="g">150 g</span> de farine
- Quantité sans unité : <span class="ingredient" data-base-quantity="2" data-unit="">2</span> œufs
- Fraction : <span class="ingredient" data-base-quantity="0.5" data-unit="">1/2</span> cuillère à café
-->

- <span class="ingredient" data-base-quantity="[quantité]" data-unit="[unité]">[quantité] [unité]</span> [nom de l'ingrédient]
- <span class="ingredient" data-base-quantity="[quantité]" data-unit="[unité]">[quantité] [unité]</span> [nom de l'ingrédient]
<!-- Répéter pour chaque ingrédient -->
</div>

## Instructions

### Etape 1
<!-- 
TECHNIQUES D'ENRICHISSEMENT :
1. CONSEILS ET ASTUCES :
Utilisez les blocs d'information pour ajouter des conseils

??? : pour avoir un menu déroulant rétracté par default
!!! : Pour avoir une section qui n'est pas rétractable

Pour plus de précision dans les module et comment les utiliser lisez la documentation de MkDocs Material.
-->

??? info inline end "A savoir"
    [Conseil ou astuce importante pour cette étape]

[Description détaillée de la première étape]

### Etape 2

??? tip inline end "Conseils"
    - **Point important** : [explication]
    - [Autre conseil utile]

[Description de la deuxième étape]

### Etape 3

??? inline end info "A noter"
    [Information importante à retenir]

[Description de la troisième étape avec éventuellement une image]

<!-- 
AJOUT D'IMAGES :
Pour ajouter une image explicative dans un conseil :
<p align="center">
  <img src="[URL_de_l_image]" alt="Description" width="300">
</p>

Ajouter une image dans une étape :
![Description de l'image](URL_de_l_image)
-->

### Etape 4
[Continuer avec toutes les étapes nécessaires...]

<!-- 
TYPES DE BLOCS D'INFORMATION DISPONIBLES :
- info : informations générales (icône i)
- tip : conseils et astuces (icône ampoule)
- warning : avertissements (icône triangle)
- note : notes importantes (icône crayon)

POSITIONNEMENT :
- inline end : à droite du texte
- inline : dans le texte
- (rien) : bloc complet
-->

## Conservation
<!-- Section optionnelle pour les conseils de conservation -->
[Instructions de conservation si applicable]

<!-- 
CONSEILS POUR UNE BONNE RECETTE :

1. TITRE ET MÉTADONNÉES :
   - Choisissez des tags précis pour un bon référencement
   - Le titre doit être attractif et descriptif

2. INGRÉDIENTS :
   - Listez dans l'ordre d'utilisation
   - Soyez précis avec les quantités
   - Utilisez toujours le système d'ajustement des portions

3. INSTRUCTIONS :
   - Numérotez les étapes clairement
   - Une action principale par étape
   - Utilisez les blocs d'information pour enrichir
   - Ajoutez des temps de cuisson/préparation

4. MISE EN FORME :
   - Utilisez markdown pour la mise en forme
   - Les blocs d'information rendent la recette plus professionnelle
   - Les images aident à la compréhension

5. TESTS :
   - Testez la recette avant publication
   - Vérifiez que le système d'ajustement fonctionne
   - Assurez-vous que tous les tags sont corrects

EXEMPLE COMPLET DE STRUCTURE :
```
# Ma Délicieuse Recette

## Ingrédients
### Pour 4 personnes :
[système d'ajustement + liste d'ingrédients]

## Instructions
### Etape 1-N
[étapes détaillées avec conseils]

## Conservation (optionnel)
[conseils de conservation]
```
-->