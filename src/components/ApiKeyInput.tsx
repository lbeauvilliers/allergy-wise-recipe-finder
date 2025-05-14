
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Key } from "lucide-react";

const ApiKeyInput = () => {
  const [apiKey, setApiKey] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Check if API key exists in localStorage on component mount
  useEffect(() => {
    const storedKey = localStorage.getItem("openai_api_key");
    if (storedKey) {
      setApiKey(storedKey);
    } else {
      // Open dialog if no API key is found
      setIsOpen(true);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("openai_api_key", apiKey.trim());
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Key className="h-4 w-4" />
          {localStorage.getItem("openai_api_key") ? "Change API Key" : "Set API Key"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>OpenAI API Key</DialogTitle>
          <DialogDescription>
            Enter your OpenAI API key to enable recipe allergen identification. 
            Your API key is stored locally on your device and is never sent to our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            type="submit" 
            onClick={handleSaveApiKey}
            disabled={!apiKey.trim()}
            className="bg-recipe-green hover:bg-recipe-green-light"
          >
            Save API Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyInput;
