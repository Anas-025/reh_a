import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip, Zoom } from "@mui/material";
import { GPCContext } from "Providers/GPC_Provider";
import Image from "next/image";
import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { returnFileSize, validFileType } from "utils/ExtendedUtils";
import style from "./pay.module.css";

interface Props {
  blogCoverImageFile: File | null;
  setBlogCoverImageFile: Dispatch<SetStateAction<File | null>>;
}

function Step2(props: Props) {
  const { blogCoverImageFile, setBlogCoverImageFile } = props;
  const [tooltipTitle, setTooltipTitle] = useState("Edit Image");
  const blogCoverImageRef = useRef<HTMLInputElement>(null);
  const [blogCoverImage, setBlogCoverImage] = useState<string>("");
  const { showError } = useContext(GPCContext);

  const handleBlogCoverImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e?.target?.files) return;

    const file = e.target?.files[0];

    if (file) {
      if (!validFileType(file)) {
        showError("Invalid File Type!");
      } else {
        const src = URL.createObjectURL(file);
        setTooltipTitle(`${file.name} (${returnFileSize(file.size)})`);
        setBlogCoverImage(src);
        setBlogCoverImageFile(file);
      }
    }
  };

  return (
    <div className="relative mt-[10px] w-full text-center" id="blogCoverImage">
      <div className="relative m-auto overflow-auto max-w-[600px] h-[400px] px-4">
        <Tooltip title={tooltipTitle} TransitionComponent={Zoom}>
          <div className="w-full h-full bg-gray-200 rounded-[10px] overflow-hidden cursor-pointer">
            {blogCoverImageFile ? (
              <img
                src={URL.createObjectURL(blogCoverImageFile)}
                className="w-full h-full object-cover"
                alt=""
                onClick={() => blogCoverImageRef.current?.click()}
              />
            ) : blogCoverImage ? (
              <Image
                src={blogCoverImage}
                fill={true}
                alt="Blog Cover Image"
                className="object-cover cursor-pointer rounded-[10px] transition-all duration-150"
                onClick={() => blogCoverImageRef.current?.click()}
              />
            ) : (
              <div
                onClick={() => blogCoverImageRef.current?.click()}
                className="flex flex-col gap-4 items-center justify-center w-full h-full"
              >
                <AddPhotoAlternateOutlinedIcon className="text-6xl" />
                <span className="text-xl md:text-2xl font-semibold">
                  Upload Payment Screen Shot
                </span>
              </div>
            )}
          </div>
        </Tooltip>

        <IconButton className="absolute right-6 top-2 z-40 w-12 h-12 cursor-pointer bg-black flex items-center justify-center hover:bg-gray-400">
          <label htmlFor="file" className="grid items-start cursor-pointer">
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
            <EditIcon style={{ color: "white" }} />
          </label>
        </IconButton>
      </div>
    </div>
  );
}

export default Step2;
