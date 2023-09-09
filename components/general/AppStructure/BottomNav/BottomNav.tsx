import MenuIcon from "@mui/icons-material/Menu"; // menu
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { bottomNavList } from "../constants";
import styles from "./BottomNav.module.css";



function BottomNav({handleDrawerToggle, current}: {handleDrawerToggle: () => void, current: number}) {
    const router = useRouter();
    
    useEffect(() => {
        const activeMenu = bottomNavList.find((item) => item.link === router.pathname);
        activeElement(activeMenu !== undefined ? activeMenu?.id : 4);
      }, [router.pathname, current]);


    const activeElement = (id: number) => {
        const view2Bar = document.getElementById("view2Bar");
        const target = document.getElementById(`view2Item${id}`);

        if (view2Bar && target) {
            const vwValue =  (target.offsetLeft / window.innerWidth) * 100;
            view2Bar.style.left = `${vwValue}vw`;
            view2Bar.style.width = `${target.offsetWidth}px`;

            window.addEventListener("resize", function resizeHandle() {
                const vwValue =  (target.offsetLeft / window.innerWidth) * 100;
                view2Bar.style.left = `${vwValue}vw`;
                view2Bar.style.width = `${target.offsetWidth}px`;
                
                return () => {
                    window.removeEventListener("resize", resizeHandle);
                }
            });
            target.classList.add(styles.active);

        }

        bottomNavList.forEach((item, index) => {
            if (index !== id) {
                const target = document.getElementById(`view2Item${index}`);
                if (target) {
                    target.classList.remove(styles.active);
                }
            }
        });

        if (id !== 4) document.getElementById(`view2Item${4}`)?.classList.remove(styles.active);
    }

      
    
  return (
    <div className={styles.view2}>
      <div className={styles.bottomNav}>
        <div className={styles.view2Bar} id="view2Bar"></div>

        {
            bottomNavList.map((item, index) => {
                return (
                    <Link id={`view2Item${index}`} href={item.link} key={item.id}>
                        <Button sx={{textTransform: "none"}} className={styles.view2Item}>
                            {item.icon}
                            {item.name}
                        </Button>
                    </Link>
                )
            }
            )
        }


        <span id={`view2Item${4}`}>
          <Button className={styles.view2Item} onClick={handleDrawerToggle}>
            <MenuIcon className={styles.view2Icn} />
            More
          </Button>
        </span>
      </div>
    </div>
  );
}

export default BottomNav;
