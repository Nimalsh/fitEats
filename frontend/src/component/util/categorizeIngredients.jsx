export const categorizeIngredients = (ingredients) => {
  return ingredients.reduce((acc, ingredient) => {
    const categoryName = ingredient.category?.name || 'Uncategorized';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(ingredient);
    return acc;
  }, {});
};