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
            {/* Super Salads-style bowl/veggie icon */}
            <span className="inline-flex items-center justify-center rounded-full bg-[hsl(var(--super-green-light))] p-2 border-4 border-[hsl(var(--super-orange))]">
              <svg
                className="h-16 w-16"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer orange circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  stroke="hsl(var(--super-orange))"
                  strokeWidth="8"
                  fill="hsl(var(--super-beige))"
                />
                {/* Bowl */}
                <ellipse
                  cx="60"
                  cy="80"
                  rx="38"
                  ry="22"
                  fill="hsl(var(--super-green))"
                />
                <ellipse
                  cx="60"
                  cy="80"
                  rx="32"
                  ry="16"
                  fill="hsl(var(--super-green-light))"
                />
                {/* Tomato wedge */}
                <path
                  d="M38 70 Q30 60 48 56 Q50 68 38 70 Z"
                  fill="hsl(var(--super-red))"
                />
                <path
                  d="M40 66 Q36 62 46 58 Q47 65 40 66 Z"
                  fill="hsl(var(--super-beige))"
                />
                {/* Cucumber slice */}
                <ellipse
                  cx="85"
                  cy="65"
                  rx="10"
                  ry="10"
                  fill="hsl(var(--super-yellow))"
                  stroke="hsl(var(--super-dark-green))"
                  strokeWidth="2"
                />
                <circle
                  cx="85"
                  cy="65"
                  r="2"
                  fill="hsl(var(--super-dark-green))"
                />
                <circle
                  cx="89"
                  cy="62"
                  r="1.2"
                  fill="hsl(var(--super-dark-green))"
                />
                <circle
                  cx="81"
                  cy="68"
                  r="1.2"
                  fill="hsl(var(--super-dark-green))"
                />
                {/* Leafy greens */}
                <path
                  d="M60 50 Q55 30 70 38 Q65 55 60 50 Z"
                  fill="hsl(var(--super-dark-green))"
                />
                <path
                  d="M55 55 Q45 35 62 40 Q60 60 55 55 Z"
                  fill="hsl(var(--super-green))"
                />
                {/* Radish or garnish */}
                <circle
                  cx="70"
                  cy="60"
                  r="5"
                  fill="hsl(var(--super-red))"
                  stroke="hsl(var(--super-dark-green))"
                  strokeWidth="2"
                />
                {/* Decorative sprig */}
                <path
                  d="M95 55 Q105 50 98 65"
                  stroke="hsl(var(--super-dark-green))"
                  strokeWidth="3"
                  fill="none"
                />
                <circle
                  cx="100"
                  cy="52"
                  r="3"
                  fill="hsl(var(--super-dark-green))"
                />
              </svg>
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
            Powered by AI. This is a substitute for professional medical advice!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
