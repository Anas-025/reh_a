import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip, Zoom } from "@mui/material";
import Image from "next/image";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { returnFileSize, validFileType } from "utils/ExtendedUtils";
import style from "../../BlogCreator/BlogCreator.module.css";

export default function HeroImage({
  blogCoverImage,
  setBlogCoverImage,
  blogCoverImageFile,
  setBlogCoverImageFile,
}: {
  blogCoverImage: string;
  setBlogCoverImage: Dispatch<SetStateAction<string>>;
  blogCoverImageFile: File | null;
  setBlogCoverImageFile: Dispatch<SetStateAction<File | null>>;
}) {
  const [tooltipTitle, setTooltipTitle] = useState("Edit Image");
  const blogCoverImageRef = useRef<HTMLInputElement>(null);

  const handleBlogCoverImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e?.target?.files) return;

    const file = e.target?.files[0];

    if (file) {
      if (!validFileType(file)) {
        alert("Invalid File Type");
      } else {
        const src = URL.createObjectURL(file);
        setTooltipTitle(`${file.name} (${returnFileSize(file.size)})`);
        setBlogCoverImage(src);
        setBlogCoverImageFile(file);
      }
    }
  };

  return (
    <div
      className="relative mt-[40px] md:mt-[70px] w-full text-center"
      id="blogCoverImage"
    >
      <div className="relative m-auto overflow-auto w-[90%] h-[260px] sm:max-w-[900px] sm:h-[350px] md:h-[450px] lg:h-[600px] px-4">
        <Tooltip title={tooltipTitle} TransitionComponent={Zoom}>
          <div className="w-full h-full bg-gray-200 rounded-[10px] overflow-hidden cursor-pointer">
            {blogCoverImageFile ? (
              <img
                src={URL.createObjectURL(blogCoverImageFile)}
                className="w-full h-full object-cover"
                alt=""
              />
            ) : blogCoverImage ? (
              <Image
                src={blogCoverImage}
                fill={true}
                alt="Blog Cover Image"
                className="object-cover cursor-pointer rounded-[10px] transition-all duration-150"
              />
            ) : (
              <div
                onClick={() => blogCoverImageRef.current?.click()}
                className="flex flex-col gap-4 items-center justify-center w-full h-full"
              >
                <AddPhotoAlternateOutlinedIcon className="text-white text-6xl" />
                <span className="text-xl md:text-2xl font-semibold text-white">
                  Upload Blog Cover Image
                </span>
              </div>
            )}
          </div>
        </Tooltip>
        
        <IconButton className="absolute right-6 top-2 z-40 w-12 h-12 cursor-pointer bg-black flex items-center justify-center hover:bg-gray-400">
          <input
            ref={blogCoverImageRef}
            type="file"
            name=""
            id="file"
            className={style.file}
            accept=".jpg, .jpeg, .png"
            hidden
            onChange={handleBlogCoverImageChange}
          />
          <EditIcon
            onClick={() => blogCoverImageRef.current?.click()}
            style={{ color: "white" }}
          />
        </IconButton>
      </div>
    </div>
  );
}
