import { useState } from "react";
import { fetchRecipeAllergens } from "@/services/openaiService";
import RecipeSearch from "@/components/RecipeSearch";
import AllergenResults from "@/components/AllergenResults";
import ApiKeyInput from "@/components/ApiKeyInput";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { RegionType } from "@/components/RegionSelect";
import superSaladsLogo from "../Super salads.png";

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

    const response = await fetchRecipeAllergens(
      searchedRecipeName,
      selectedRegion
    );

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
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "hsl(var(--super-beige))" }}
    >
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Super Salads logo image */}
            <span className="inline-flex items-center justify-center rounded-full bg-[hsl(var(--super-green-light))] p-2 border-4 border-[hsl(var(--super-orange))]">
              <img
                src={superSaladsLogo}
                alt="Super Salads Logo"
                className="h-16 w-16 object-contain rounded-full"
                draggable={false}
              />
            </span>
            <div>
              <h1 className="text-4xl font-extrabold text-[hsl(var(--super-dark-green))] tracking-tight leading-tight drop-shadow-sm">
                SUPER SALADS
              </h1>
              <div className="text-lg font-medium text-[hsl(var(--super-orange))] -mt-1">
                Allergy Wise Recipe Finder
              </div>
              <div className="text-sm text-[hsl(var(--super-dark-green))] mt-1">
                This awesome super brand of looking for allergens in food to
                help your day!
              </div>
            </div>
          </div>
          <ApiKeyInput />
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[hsl(var(--super-green))] mb-2">
            Find Allergens in Any Recipe
          </h2>
          <p className="text-lg text-[hsl(var(--super-dark-green))]">
            Discover potential allergens in your favorite foods, fast and
            friendly!
          </p>
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

        <div className="mt-12 text-center text-sm text-[hsl(var(--super-dark-green))]">
          <p>
            Note: This tool uses AI to identify potential allergens based on
            common recipe ingredients. Always verify ingredients with the actual
            recipe for severe allergies.
          </p>
        </div>
      </main>

      <footer className="bg-[hsl(var(--super-green-light))] py-8 border-t-4 border-[hsl(var(--super-orange))]">
        <div className="max-w-4xl mx-auto px-4 text-center text-[hsl(var(--super-dark-green))] text-base font-semibold">
          <p>Super Salads &copy; 2025 — Allergy Wise for a Super Day!</p>
          <p className="mt-1 text-sm font-normal text-[hsl(var(--super-dark-green))]">
            Powered by AI. Not a substitute for professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
