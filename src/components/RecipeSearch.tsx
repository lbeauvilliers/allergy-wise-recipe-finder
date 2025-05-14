
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import RegionSelect, { RegionType } from "./RegionSelect";

interface RecipeSearchProps {
  onSearch: (recipeName: string) => void;
  isLoading: boolean;
  selectedRegion: RegionType;
  onRegionChange: (region: RegionType) => void;
}

const RecipeSearch = ({ 
  onSearch, 
  isLoading, 
  selectedRegion,
  onRegionChange
}: RecipeSearchProps) => {
  const [recipeName, setRecipeName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (recipeName.trim()) {
      onSearch(recipeName.trim());
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
            <h3 className="text-md font-medium text-gray-700">Select your region for allergen regulations:</h3>
            <RegionSelect 
              selectedRegion={selectedRegion} 
              onRegionChange={onRegionChange} 
            />
          </div>
          
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter a recipe name (e.g., Chocolate Chip Cookies, Pad Thai)"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              className="pl-10 py-6 text-lg"
              disabled={isLoading}
            />
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>
          <Button 
            type="submit" 
            className="bg-recipe-green hover:bg-recipe-green-light w-full py-6 text-lg font-medium"
            disabled={isLoading || !recipeName.trim()}
          >
            {isLoading ? "Searching..." : "Find Allergens"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RecipeSearch;
