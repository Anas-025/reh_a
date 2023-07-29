import { Dispatch, SetStateAction } from "react";

export interface HeadTitleProps {
    displayName: string;
    date: Date;
    headTitle: string;
    setHeadTitle: Dispatch<SetStateAction<string>>
}