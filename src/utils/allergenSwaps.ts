
// Common allergen substitutions that can be used in recipes
export interface AllergenSwap {
  allergen: string;
  substitutes: string[];
}

export const allergenSwaps: AllergenSwap[] = [
  {
    allergen: "milk",
    substitutes: ["oat milk", "almond milk", "soy milk", "coconut milk"]
  },
  {
    allergen: "dairy",
    substitutes: ["oat milk", "almond milk", "coconut yogurt", "plant-based butter"]
  },
  {
    allergen: "eggs",
    substitutes: ["flax eggs (1 tbsp ground flaxseed + 3 tbsp water)", "applesauce", "banana", "aquafaba"]
  },
  {
    allergen: "wheat",
    substitutes: ["oat flour", "almond flour", "rice flour", "gluten-free flour blend"]
  },
  {
    allergen: "gluten",
    substitutes: ["gluten-free flour blend", "almond flour", "coconut flour", "rice"]
  },
  {
    allergen: "nuts",
    substitutes: ["seeds (sunflower, pumpkin)", "roasted chickpeas", "coconut flakes"]
  },
  {
    allergen: "peanuts",
    substitutes: ["sunflower seed butter", "pumpkin seed butter", "chickpea butter"]
  },
  {
    allergen: "tree nuts",
    substitutes: ["seeds (sunflower, pumpkin)", "coconut", "beans"]
  },
  {
    allergen: "soy",
    substitutes: ["coconut aminos", "chickpea miso", "hemp seeds"]
  },
  {
    allergen: "fish",
    substitutes: ["hearts of palm", "jackfruit", "tofu with seaweed"]
  },
  {
    allergen: "shellfish",
    substitutes: ["hearts of palm", "king oyster mushrooms", "jackfruit"]
  },
  {
    allergen: "crustaceans",
    substitutes: ["hearts of palm", "king oyster mushrooms", "jackfruit"]
  },
  {
    allergen: "sesame",
    substitutes: ["hemp seeds", "flax seeds", "poppy seeds"]
  },
  {
    allergen: "mustard",
    substitutes: ["turmeric", "horseradish", "wasabi"]
  },
  {
    allergen: "celery",
    substitutes: ["fennel", "carrots", "jicama"]
  },
  {
    allergen: "lupin",
    substitutes: ["chickpea flour", "lentil flour"]
  },
  {
    allergen: "molluscs",
    substitutes: ["oyster mushrooms", "king oyster mushrooms", "jackfruit"]
  },
  {
    allergen: "sulphites",
    substitutes: ["fresh lemon juice", "citric acid", "ascorbic acid"]
  }
];

export const findSubstitutes = (allergen: string): string[] => {
  // Normalize the allergen name to lowercase for case-insensitive matching
  const normalizedAllergen = allergen.toLowerCase();
  
  // Find exact matches first
  const exactMatch = allergenSwaps.find(
    swap => swap.allergen.toLowerCase() === normalizedAllergen
  );
  if (exactMatch) return exactMatch.substitutes;
  
  // If no exact match, look for partial matches
  const partialMatch = allergenSwaps.find(
    swap => normalizedAllergen.includes(swap.allergen) || 
           swap.allergen.includes(normalizedAllergen)
  );
  if (partialMatch) return partialMatch.substitutes;
  
  return ["No specific substitutes available"];
};
