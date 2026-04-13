export interface CategorySelectionProps {
  catIndex: any;
  setCatIndex: React.Dispatch<React.SetStateAction<any>>;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  blog_count?: number;
}
