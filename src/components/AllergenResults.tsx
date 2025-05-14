
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, AlertTriangle } from "lucide-react";

interface AllergenResultsProps {
  recipeName: string;
  allergens: string[];
  isLoading: boolean;
  error?: string;
}

const AllergenResults = ({ recipeName, allergens, isLoading, error }: AllergenResultsProps) => {
  // Function to determine color for allergen badge
  const getAllergenColor = (allergen: string): string => {
    const commonAllergens: Record<string, string> = {
      "nuts": "bg-recipe-red",
      "peanuts": "bg-recipe-red",
      "tree nuts": "bg-recipe-red",
      "milk": "bg-recipe-yellow",
      "dairy": "bg-recipe-yellow",
      "eggs": "bg-recipe-yellow",
      "wheat": "bg-recipe-orange",
      "gluten": "bg-recipe-orange",
      "soy": "bg-recipe-orange",
      "fish": "bg-recipe-red",
      "shellfish": "bg-recipe-red",
    };
    
    // Check if the allergen name contains any of our key allergens
    for (const [key, value] of Object.entries(commonAllergens)) {
      if (allergen.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }
    
    return "bg-slate-500"; // Default color
  };

  if (!recipeName) {
    return null;
  }

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          {isLoading ? "Analyzing Recipe..." : `Allergens in "${recipeName}"`}
        </CardTitle>
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
              No common allergens identified. However, this is not a guarantee of allergen safety.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {allergens.map((allergen, index) => (
                <Badge 
                  key={index} 
                  className={`${getAllergenColor(allergen)} px-3 py-1 text-white`}
                >
                  {allergen}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Note: This is an AI-generated analysis and may not be 100% accurate. Always check ingredient labels or consult with a restaurant for severe allergies.
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AllergenResults;
