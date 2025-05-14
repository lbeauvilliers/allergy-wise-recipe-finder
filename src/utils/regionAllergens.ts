
import { RegionType } from "@/components/RegionSelect";

export interface RegionData {
  allergens: string[];
  name: string;
  description: string;
  regulatorySource: string;
}

export const regionAllergenData: Record<RegionType, RegionData> = {
  EU: {
    name: "European Union",
    allergens: [
      "gluten", "wheat", "rye", "barley", "oats", "crustaceans", "eggs", "fish",
      "peanuts", "soybeans", "milk", "lactose", "tree nuts", "almonds", "hazelnuts",
      "walnuts", "cashews", "pecans", "brazil nuts", "pistachios", "macadamia",
      "celery", "mustard", "sesame", "sulphites", "lupin", "molluscs"
    ],
    description: "14 allergens required by EU Regulation",
    regulatorySource: "EU Regulation No. 1169/2011 (Annex II)"
  },
  UK: {
    name: "United Kingdom",
    allergens: [
      "gluten", "wheat", "rye", "barley", "oats", "crustaceans", "eggs", "fish",
      "peanuts", "soybeans", "milk", "lactose", "tree nuts", "almonds", "hazelnuts",
      "walnuts", "cashews", "pecans", "brazil nuts", "pistachios", "macadamia",
      "celery", "mustard", "sesame", "sulphites", "lupin", "molluscs"
    ],
    description: "Same 14 allergens as EU",
    regulatorySource: "UK Food Information Regulations 2014"
  },
  GCC: {
    name: "Gulf Cooperation Council",
    allergens: [
      "gluten", "wheat", "barley", "rye", "oats", "spelt", "crustacean shellfish",
      "eggs", "fish", "peanuts", "soybeans", "walnuts", "tree nuts", "milk", "lactose", "sulphites"
    ],
    description: "Common GCC allergens",
    regulatorySource: "Gulf Standard GSO 9 (Labelling of Prepackaged Foods)"
  },
  SouthAfrica: {
    name: "South Africa",
    allergens: [
      "eggs", "milk", "crustaceans", "molluscs", "fish", "peanuts", "soybeans",
      "tree nuts", "gluten", "wheat", "barley", "rye", "oats"
    ],
    description: "8 common allergen categories",
    regulatorySource: "R.146 Foodstuffs Labeling Regulations"
  },
  US: {
    name: "United States",
    allergens: [
      "milk", "eggs", "fish", "crustacean shellfish", "tree nuts", "peanuts",
      "wheat", "soybeans", "sesame"
    ],
    description: "9 major allergens",
    regulatorySource: "U.S. Federal Food, Drug & Cosmetic Act (FALCPA 2004; FASTER Act 2021)"
  },
  Canada: {
    name: "Canada",
    allergens: [
      "eggs", "milk", "mustard", "peanuts", "crustaceans", "molluscs", "shellfish",
      "fish", "sesame", "soy", "sulphites", "tree nuts", "almonds", "walnuts",
      "wheat", "triticale", "gluten"
    ],
    description: "Priority allergens (plus gluten sources)",
    regulatorySource: "Canada Food & Drug Regulations, Section B.01.010 (2012 amendments)"
  },
  AustraliaNewZealand: {
    name: "Australia & New Zealand",
    allergens: [
      "peanuts", "tree nuts", "milk", "eggs", "sesame", "fish", "shellfish",
      "crustacea", "molluscs", "soy", "lupin", "wheat", "gluten"
    ],
    description: "Mandated allergens",
    regulatorySource: "Food Standards Code (FSANZ) Standard 1.2.3"
  },
  Japan: {
    name: "Japan",
    allergens: [
      "egg", "milk", "wheat", "buckwheat", "peanut", "shrimp", "crab",
      "soybean", "sesame", "tree nuts", "almond", "walnut", "cashew"
    ],
    description: "7 mandatory allergens + recommended allergens",
    regulatorySource: "Food Labeling Standard (Consumer Affairs Agency, Japan)"
  },
  Codex: {
    name: "Codex Alimentarius",
    allergens: [
      "gluten", "wheat", "rye", "barley", "crustacea", "eggs", "fish",
      "peanuts", "milk", "sesame", "tree nuts", "almond", "cashew", "hazelnut",
      "pecan", "pistachio", "walnut"
    ],
    description: "Codex priority allergens (2025)",
    regulatorySource: "Codex General Standard for the Labelling of Prepackaged Foods (CXS 1-1985, rev. 2024)"
  }
};
