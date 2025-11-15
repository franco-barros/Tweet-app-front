export interface SuggestionUser {
  id: string;
  name: string;
  username: string;
}

export const fakeSuggestions: SuggestionUser[] = [
  { id: "suggest-1", name: "ReactJS", username: "reactjs" },
  { id: "suggest-2", name: "Next.js", username: "nextjs" },
  { id: "suggest-3", name: "TypeScript", username: "typescript" },
];
