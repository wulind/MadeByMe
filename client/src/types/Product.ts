enum CraftTypeEnum {
  Crochet = "Crochet",
  Macrame = "Macrame",
}

enum DifficultyLevelEnum {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
}

enum SizesAvailableEnum {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
  MadeToMeasure = "Made to Measure",
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
  craft: CraftTypeEnum;
  language: string;
  difficultyLevel: DifficultyLevelEnum;
}

export interface CrochetPattern extends Product {
  colorways: string[];
  gauge: string;
  hookSize: string;
  category: string;
  sizesAvailable: SizesAvailableEnum[];
  estimatedTime: string;
}
