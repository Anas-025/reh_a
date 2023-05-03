import { IconButton, Tooltip, Zoom } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import style from "./HeroImage.module.css";
import { returnFileSize, validFileType} from "utils/ExtendedUtils";


export default function HeroImage({ heroImageSrc, setHeroImageSrc }: { heroImageSrc: string, setHeroImageSrc: Dispatch<SetStateAction<string>>}) {
  const [tooltipTitle, setTooltipTitle] = useState("Edit Image");
  const heroImageRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (heroImageRef.current) {
        heroImageRef.current.addEventListener("change", (e) => {
        // @ts-ignore
        const file = e.target?.files[0];

        if (file) {
            if(!validFileType(file)){ 
                alert("Invalid File Type");
            }else{
            const src = URL.createObjectURL(file);
            setTooltipTitle(`${file.name} (${returnFileSize(file.size)})`)
            setHeroImageSrc(src);
            }
        }
        });
    }
    }, [heroImageRef]);



  return (
    <div className={style.image1} id="heroImage">
      <div>
        <Tooltip title={tooltipTitle} TransitionComponent={Zoom}>
          <img
            src={heroImageSrc}
            alt=""
          />
        </Tooltip>
        <IconButton className={style.editIcon}>
          <label htmlFor="file" className={style.addImage}>
            <input
              ref={heroImageRef}
              type="file"
              name=""
              id="file"
              className={style.file}
              accept=".jpg, .jpeg, .png"
            />
            <EditIcon style={{ color: "white" }} />
          </label>
        </IconButton>
      </div>
    </div>
  );
}

