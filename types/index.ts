export interface AnalysisResult {
  id: number;
  date: string;
  imageData: string;
  confidence: number;
  modelExplanation: string;
  result: "Pneumonia" | "Infiltration" | "Normal";
}