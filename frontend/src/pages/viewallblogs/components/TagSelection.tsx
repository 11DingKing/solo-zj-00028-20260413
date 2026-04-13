import { Tag } from "../types";

interface TagSelectionProps {
  tags: Tag[];
  selectedTag: string | null;
  onTagSelect: (tagSlug: string | null) => void;
}

export const TagSelection = ({
  tags,
  selectedTag,
  onTagSelect,
}: TagSelectionProps): JSX.Element => {
  return (
    <div className="mt-4 p-2">
      <h3 className="text-sm font-semibold mb-2 text-gray-700">Tags</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onTagSelect(null)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
            selectedTag === null
              ? "bg-purple-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-purple-100"
          }`}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => onTagSelect(tag.slug)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
              selectedTag === tag.slug
                ? "bg-purple-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-purple-100"
            }`}
          >
            {tag.name}
            <span className="ml-1 text-gray-500">({tag.blog_count || 0})</span>
          </button>
        ))}
      </div>
    </div>
  );
};
