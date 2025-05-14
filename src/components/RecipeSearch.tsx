
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

interface RecipeSearchProps {
  onSearch: (recipeName: string) => void;
  isLoading: boolean;
}

const RecipeSearch = ({ onSearch, isLoading }: RecipeSearchProps) => {
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
