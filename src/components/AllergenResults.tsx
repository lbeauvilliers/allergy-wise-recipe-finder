import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, AlertTriangle } from "lucide-react";
import { RegionType } from "./RegionSelect";
import { regionAllergenData } from "@/utils/regionAllergens";

interface AllergenResultsProps {
  recipeName: string;
  allergens: string[];
  isLoading: boolean;
  error?: string;
  selectedRegion: RegionType;
}

const AllergenResults = ({
  recipeName,
  allergens,
  isLoading,
  error,
  selectedRegion,
}: AllergenResultsProps) => {
  // Function to determine color for allergen badge
  const getAllergenColor = (allergen: string): string => {
    const commonAllergens: Record<string, string> = {
      nuts: "bg-recipe-red",
      peanuts: "bg-recipe-red",
      "tree nuts": "bg-recipe-red",
      milk: "bg-recipe-yellow",
      dairy: "bg-recipe-yellow",
      eggs: "bg-recipe-yellow",
      wheat: "bg-recipe-orange",
      gluten: "bg-recipe-orange",
      soy: "bg-recipe-orange",
      fish: "bg-recipe-red",
      shellfish: "bg-recipe-red",
      sesame: "bg-recipe-purple",
      corn: "bg-recipe-blue",
      mustard: "bg-recipe-brown",
      celery: "bg-recipe-green",
      lupin: "bg-recipe-teal",
      coconut: "bg-recipe-red", // Additional allergen
      banana: "bg-recipe-yellow", // Additional allergen
      kiwi: "bg-recipe-green", // Additional allergen
      avocado: "bg-recipe-green", // Additional allergen
      chocolate: "bg-recipe-brown", // Additional allergen
      tomato: "bg-recipe-orange", // Additional allergen
      potato: "bg-recipe-yellow", // Additional allergen
      peach: "bg-recipe-pink", // Additional allergen
      pineapple: "bg-recipe-yellow", // Additional allergen
      spinach: "bg-recipe-green", // Additional allergen
      barley: "bg-recipe-orange", // Additional allergen
      rye: "bg-recipe-orange", // Additional allergen
      casein: "bg-recipe-yellow", // Additional allergen
      sulphites: "bg-recipe-red", // Additional allergen
      quinoa: "bg-recipe-brown", // Additional allergen
      buckwheat: "bg-recipe-teal", // Additional allergen
      fennel: "bg-recipe-green", // Additional allergen
      carrot: "bg-recipe-orange", // Additional allergen
      zucchini: "bg-recipe-green", // Additional allergen
      chickpeas: "bg-recipe-yellow", // Additional allergen
      peppers: "bg-recipe-red", // Additional allergen
      cabbage: "bg-recipe-green", // Additional allergen
      onion: "bg-recipe-yellow", // Additional allergen
      garlic: "bg-recipe-yellow", // Additional allergen
      cinnamon: "bg-recipe-brown", // Additional allergen
      cloves: "bg-recipe-brown", // Additional allergen
      nutmeg: "bg-recipe-brown", // Additional allergen
      vanilla: "bg-recipe-yellow", // Additional allergen
      curry: "bg-recipe-orange", // Additional allergen
      sage: "bg-recipe-green", // Additional allergen
      thyme: "bg-recipe-green", // Additional allergen
      rosemary: "bg-recipe-green", // Additional allergen
    };

    // Check if the allergen name contains any of our key allergens
    for (const [key, value] of Object.entries(commonAllergens)) {
      if (allergen.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }

    return "bg-slate-500"; // Default color
  };

  const regionInfo = regionAllergenData[selectedRegion];

  if (!recipeName) {
    return null;
  }

  return (
    <Card className="w-full mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-center">
          {isLoading ? "Analyzing Recipe..." : `Allergens in "${recipeName}"`}
        </CardTitle>
        <div className="text-center text-sm text-gray-500 mt-1">
          Region: {regionInfo.name} ({regionInfo.description})
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-6">
            <div className="w-10 h-10 border-4 border-recipe-green border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500">Identifying potential allergens...</p>
          </div>
        ) : error ? (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : allergens.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6">
            <Info className="h-8 w-8 text-recipe-green mb-2" />
            <p className="text-center text-gray-600">
              No common allergens identified for {regionInfo.name}. However,
              this is not a guarantee of allergen safety.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {allergens.map((allergen, index) => (
                <Badge
                  key={index}
                  className={`${getAllergenColor(
                    allergen
                  )} px-3 py-1 text-white`}
                >
                  {allergen}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Note: This is an AI-generated analysis and may not be 100%
              accurate. Always check ingredient labels or consult with a
              restaurant for severe allergies. Allergens shown are based on{" "}
              {regionInfo.name} regulatory requirements.
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AllergenResults;
