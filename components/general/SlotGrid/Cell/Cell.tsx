import { Dispatch, SetStateAction, useEffect, useState } from "react";
import style from "../SlotGrid.module.css";

function Cell({slots, row, column, setSlots, setterSlots}: {slots: number[][], row: number, column: number, setSlots: Dispatch<SetStateAction<number[][]>>, setterSlots: number[][]}) {
    const [classNames, setClassNames] = useState<string>("");

    useEffect(()=>{
        if(setterSlots[row][column]===1){
            // check if already selected   
            const newClassNames = style.alreadySelected;
            setClassNames(newClassNames);
        }else if(setterSlots[row][column]===0){
            const newClassNames = " ";
            setClassNames(newClassNames);
        }
    }, [setterSlots])

    const handleClick = ()=>{
        if(slots[row][column] === 1){
            if(classNames.includes(style.selected)){
                const newClassNames = classNames.replace(style.selected, "");
                setClassNames(newClassNames);
            }else if(classNames.includes(style.alreadySelected)){
                const newClassNames = classNames.replace(style.alreadySelected, style.delete);
                setClassNames(newClassNames);
            }
            
            slots[row][column] = 0;
            setSlots([...slots]);
        }

        else{
            if(classNames.includes(style.delete)){

                const newClassNames = classNames.replace(style.delete, style.alreadySelected);
                setClassNames(newClassNames);
                
            }else{
                const newClassNames = style.selected;
                setClassNames(newClassNames);
                setClassNames(newClassNames);
            }

            slots[row][column] = 1;
            setSlots([...slots]);
        }
    }   



  return (
      <td className={classNames} onClick={handleClick}></td>
  )
}

export default Cell
