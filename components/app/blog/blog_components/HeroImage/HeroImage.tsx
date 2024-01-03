import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Input,
  Tooltip,
  Zoom,
} from "@mui/material";
import HeroVideo from "components/general/VisitBlog/HeroVideo/HeroVideo";
import Image from "next/image";
import { useRef, useState } from "react";
import { returnFileSize, validFileType } from "utils/ExtendedUtils";
import { HeroImageProps } from "../../Blog.interface";
import style from "../../Blog.module.css";

export default function HeroImage(props: HeroImageProps) {
  const {
    blogCoverImage,
    setBlogCoverImage,
    setBlogCoverImageFile,
    blogCoverImageFile,
    setVideoId,
    videoId,
  } = props;
  const [tooltipTitle, setTooltipTitle] = useState("Edit Image");
  const blogCoverImageRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string>("");
  const [shade, setShade] = useState(false);
  const [open, setOpen] = useState(false);


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
        setVideoId("");
      }
    }
  };

  const handleVideoSave = () => {
    if (!url) {
      alert("Please enter a URL");
      return;
    }
    const videoId = url.split("/")[5];
    if (!videoId) {
      alert("Invalid URL");
      return;
    }
    setVideoId(videoId);
    setShade(false);
    setBlogCoverImage("");
    setBlogCoverImageFile(null);
    setTooltipTitle("Video");
    setOpen(false);
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div
        className="relative mt-[70px] w-full text-center"
        id="blogCoverImage"
      >
        <div className="relative m-auto overflow-auto max-w-[900px] h-[600px] px-4">
          <Tooltip title={tooltipTitle} TransitionComponent={Zoom}>
            <div className="w-full h-full bg-gray-200 rounded-[10px] overflow-hidden cursor-pointer">
              {blogCoverImageFile ? (
                <img
                  src={URL.createObjectURL(blogCoverImageFile)}
                  className="w-full h-full object-cover"
                  alt=""
                  onClick={handleDialogOpen}
                />
              ) : blogCoverImage ? (
                <Image
                  src={blogCoverImage}
                  fill={true}
                  alt="Blog Cover Image"
                  className="object-cover cursor-pointer rounded-[10px] transition-all duration-150"
                  onClick={handleDialogOpen}
                />
              ) : videoId ? (
                <HeroVideo heroVideoId={videoId} />
              ) : (
                <div
                  onClick={handleDialogOpen}
                  className="flex flex-col gap-8 items-center justify-center w-full h-full"
                >
                  <AddPhotoAlternateOutlinedIcon className="text-6xl" />
                  <span className="text-xl">
                    Upload Blog Cover Image or Video
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

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <DialogTitle>Choose one</DialogTitle>
          <DialogContent sx={{ display: "flex", gap: "5rem", padding: "2rem" }}>
            <Box
              sx={{
                width: "250px",
                aspectRatio: "1",
                borderRadius: "10px",
                border: "2px dashed black",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                blogCoverImageRef.current?.click();
                setOpen(false);
              }}
            >
              <AddPhotoAlternateOutlinedIcon sx={{ fontSize: "2rem" }} />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>or</Box>
            <Box
              sx={{
                width: "250px",
                aspectRatio: "1",
                borderRadius: "10px",
                display: "grid",
                placeItems: "center",
                border: "2px dashed black",
                cursor: "pointer",
              }}
              onClick={() => setShade(true)}
            >
              <VideoCallOutlinedIcon sx={{ fontSize: "2.5rem" }} />
            </Box>
          </DialogContent>

          <Box
            sx={{
              position: "absolute",
              backgroundColor: "white",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              top: shade ? "0" : "100%",
              transition: "top 250ms ease-in-out",
              padding: "4rem 2rem 2rem 2rem",
              gap: "2rem",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                type="text"
                placeholder="Enter Video URL"
                fullWidth
              />
            </Box>

            <Box>
              <Button
                sx={{
                  backgroundColor: "black!important",
                  color: "white",
                  padding: "0.5rem 1.5rem",
                }}
                onClick={handleVideoSave}
              >
                Upload
              </Button>
            </Box>

            <Box
              sx={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
              }}
            >
              <IconButton onClick={() => setShade(false)}>
                <CloseIcon sx={{ color: "black" }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
