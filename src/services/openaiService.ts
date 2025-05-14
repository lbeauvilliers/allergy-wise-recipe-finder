
interface AllergenResponse {
  allergens: string[];
  error?: string;
}

export const fetchRecipeAllergens = async (recipeName: string): Promise<AllergenResponse> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('openai_api_key') || ''}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that identifies common allergens in recipes. Respond with a JSON array of allergens for the given recipe.'
          },
          {
            role: 'user',
            content: `List all common allergens that might be present in this recipe: ${recipeName}. Return ONLY a JSON array of allergens without any other text.`
          }
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to fetch allergens');
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      return { allergens: [], error: 'No content returned from API' };
    }

    try {
      // Try to parse the content as JSON
      const allergens = JSON.parse(content);
      if (Array.isArray(allergens)) {
        return { allergens };
      } else if (typeof allergens === 'object' && allergens.allergens && Array.isArray(allergens.allergens)) {
        return { allergens: allergens.allergens };
      }
      return { allergens: [], error: 'Unexpected response format' };
    } catch (e) {
      // If it's not valid JSON, try to extract a list from the text
      const matches = content.match(/\[(.*)\]/s);
      if (matches && matches[1]) {
        const items = matches[1].split(',').map((item: string) => 
          item.trim().replace(/^["']|["']$/g, '')
        ).filter(Boolean);
        return { allergens: items };
      }
      return { allergens: [], error: 'Failed to parse allergens from response' };
    }
  } catch (error) {
    console.error('Error fetching allergens:', error);
    return { 
      allergens: [], 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
};
