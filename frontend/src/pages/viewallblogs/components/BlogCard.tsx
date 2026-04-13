/* eslint-disable jsx-a11y/img-redundant-alt */
import { HiFire } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { timeDiff } from "../../../utils/relativeTime";

interface Tag {
  id: string;
  name: string;
  slug: string;
}

export const BlogCard = ({ blogData }: any): JSX.Element => {
  const navigate = useNavigate();

  const viewBlogOnClick = () => {
    navigate(`/blog/view/${blogData.id}/${blogData.slug}`);
  };

  const tags: Tag[] = blogData.tags || [];

  return (
    <div className="w-[95%] sm:w-full mt-4 flex justify-between items-center p-4 bg-white hover:scale-105 duration-300 rounded-md border-[1.5px] border-slate-200 shadow-md shadow-slate-300">
      {/** Cover image */}
      <img
        src={blogData["cover_image"]}
        alt="cover-image"
        className="w-[30%] h-[11.25rem] rounded-md object-cover"
      />

      {/** Blog details */}
      <div className="w-[70%] h-[11.25rem] relative">
        {/** Author info */}
        <div className="flex justify-start items-center pl-2">
          <img
            src={blogData["author_profile_image"]}
            alt="author-profile-image"
            className="w-7 h-7 sm:w-10 sm:h-10 rounded-full"
          />
          <p className=" text-sm p-2">@ {blogData["author_username"]}</p>
        </div>

        {/** Title & subtitle */}
        <h2
          onClick={viewBlogOnClick}
          className="p-2 font-bold text-sm sm:text-lg sm:whitespace-nowrap sm:overflow-hidden sm:overflow-ellipsis cursor-pointer w-full"
        >
          {blogData.title}
        </h2>
        <p className="p-2 text-[0.55rem] sm:text-[0.75rem] hidden sm:block text-justify whitespace-nowrap overflow-hidden overflow-ellipsis">
          {blogData.subtitle}
        </p>

        {/** Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pl-2 mt-1">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-[0.6rem] sm:text-[0.65rem]"
              >
                {tag.name}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-0.5 text-gray-500 text-[0.6rem] sm:text-[0.65rem]">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/** Date & likes */}
        <div className="flex justify-start items-center w-full absolute bottom-0">
          {/** Date */}
          <p className="p-2  text-[0.6rem] sm:text-[0.7rem]">
            {timeDiff(new Date(blogData.created_at).valueOf())}
          </p>

          {/** Likes */}
          <div className="flex justify-between items-center p-2">
            <HiFire className="w-4" />
            <p className="text-sm">
              {Intl.NumberFormat("en", { notation: "compact" }).format(
                blogData["applaud_count"],
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
