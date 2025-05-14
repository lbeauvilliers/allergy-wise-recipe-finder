
import { useState } from "react";
import { fetchRecipeAllergens } from "@/services/openaiService";
import RecipeSearch from "@/components/RecipeSearch";
import AllergenResults from "@/components/AllergenResults";
import ApiKeyInput from "@/components/ApiKeyInput";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { RegionType } from "@/components/RegionSelect";

const Index = () => {
  const [recipeName, setRecipeName] = useState("");
  const [allergens, setAllergens] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [selectedRegion, setSelectedRegion] = useState<RegionType>("EU");

  const handleSearch = async (searchedRecipeName: string) => {
    // Check if API key exists
    if (!localStorage.getItem("openai_api_key")) {
      setError("Please set your OpenAI API key first.");
      return;
    }

    setRecipeName(searchedRecipeName);
    setIsLoading(true);
    setError(undefined);

    const response = await fetchRecipeAllergens(searchedRecipeName, selectedRegion);
    
    setAllergens(response.allergens);
    setError(response.error);
    setIsLoading(false);
  };

  const handleRegionChange = (region: RegionType) => {
    setSelectedRegion(region);
    if (recipeName) {
      // If there's already a recipe, re-run the search with the new region
      handleSearch(recipeName);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg 
              className="h-8 w-8 text-recipe-green" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm0 16.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1-5.5a1 1 0 0 1-2 0V7a1 1 0 0 1 2 0z"/>
            </svg>
            <h1 className="text-2xl font-bold text-gray-800">Allergy Wise</h1>
          </div>
          <ApiKeyInput />
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Recipe Allergen Finder</h2>
          <p className="text-lg text-gray-600">Discover potential allergens in your favorite recipes</p>
        </div>

        {!localStorage.getItem("openai_api_key") && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Please set your OpenAI API key to use this application.
            </AlertDescription>
          </Alert>
        )}

        <RecipeSearch 
          onSearch={handleSearch} 
          isLoading={isLoading}
          selectedRegion={selectedRegion}
          onRegionChange={handleRegionChange}
        />
        
        <AllergenResults 
          recipeName={recipeName} 
          allergens={allergens} 
          isLoading={isLoading} 
          error={error}
          selectedRegion={selectedRegion}
        />

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Note: This tool uses AI to identify potential allergens based on common recipe ingredients.
            Always verify ingredients with the actual recipe for severe allergies.
          </p>
        </div>
      </main>

      <footer className="bg-gray-100 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>Allergy Wise Recipe Finder &copy; 2025</p>
          <p className="mt-1">
            Powered by AI - Not a substitute for professional medical advice
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
