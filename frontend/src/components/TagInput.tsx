import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface TagInputProps {
  availableTags: Tag[];
  selectedTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
  onCreateTag?: (name: string) => Promise<Tag | null>;
}

export const TagInput = ({
  availableTags,
  selectedTags,
  onTagsChange,
  onCreateTag,
}: TagInputProps): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = availableTags.filter(
      (tag) =>
        tag.name.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selectedTags.some((selected) => selected.id === tag.id),
    );
    setFilteredTags(filtered);
  }, [inputValue, availableTags, selectedTags]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowDropdown(true);
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const existingTag = filteredTags.find(
        (tag) => tag.name.toLowerCase() === inputValue.toLowerCase().trim(),
      );

      if (existingTag) {
        addTag(existingTag);
      } else if (onCreateTag) {
        handleCreateTag(inputValue.trim());
      }
    } else if (
      e.key === "Backspace" &&
      !inputValue &&
      selectedTags.length > 0
    ) {
      removeTag(selectedTags[selectedTags.length - 1]);
    }
  };

  const addTag = (tag: Tag) => {
    const newTags = [...selectedTags, tag];
    onTagsChange(newTags);
    setInputValue("");
    setShowDropdown(false);
  };

  const removeTag = (tag: Tag) => {
    const newTags = selectedTags.filter((t) => t.id !== tag.id);
    onTagsChange(newTags);
  };

  const handleCreateTag = async (name: string) => {
    if (!onCreateTag) return;

    try {
      const newTag = await onCreateTag(name);
      if (newTag) {
        addTag(newTag);
        toast.success(`Tag "${name}" created successfully`);
      }
    } catch (error) {
      toast.error("Failed to create tag");
    }
  };

  const handleTagClick = (tag: Tag) => {
    addTag(tag);
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-wrap gap-2 p-2 border-[1.5px] border-slate-300 rounded-md bg-transparent focus-within:border-purple-300 min-h-[42px]">
        {selectedTags.map((tag) => (
          <span
            key={tag.id}
            className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-sm"
          >
            {tag.name}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-purple-900 focus:outline-none"
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={
            selectedTags.length === 0 ? "Type to search or create tags..." : ""
          }
          className="flex-1 min-w-[120px] bg-transparent outline-none text-sm"
        />
      </div>

      {showDropdown &&
        (filteredTags.length > 0 || (inputValue.trim() && onCreateTag)) && (
          <div
            ref={dropdownRef}
            className="absolute z-10 w-full mt-1 bg-white border border-slate-300 rounded-md shadow-lg max-h-48 overflow-y-auto"
          >
            {filteredTags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => handleTagClick(tag)}
                className="w-full px-3 py-2 text-left text-sm hover:bg-purple-100 focus:outline-none focus:bg-purple-100"
              >
                {tag.name}
              </button>
            ))}
            {inputValue.trim() &&
              onCreateTag &&
              !filteredTags.some(
                (tag) =>
                  tag.name.toLowerCase() === inputValue.toLowerCase().trim(),
              ) && (
                <button
                  type="button"
                  onClick={() => handleCreateTag(inputValue.trim())}
                  className="w-full px-3 py-2 text-left text-sm text-purple-600 hover:bg-purple-100 focus:outline-none focus:bg-purple-100 border-t border-slate-200"
                >
                  + Create "{inputValue.trim()}"
                </button>
              )}
          </div>
        )}
    </div>
  );
};
