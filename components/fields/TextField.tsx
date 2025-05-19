"use client"

import { MdTextFields } from "react-icons/md";
import React from "react";
import {ElementType, FormElement} from "../FormElements";

const type:ElementType="TextField";

export const TextFieldElement:FormElement={

    type,
    construct:(id:string) =>({
        id,
        type,
        extraAttributes:{
            label:"TextField",
            helperText:"HelperText",
            required:false,
            placeHolder:"Value Here ...",
        }
    }),
    designerBtnElement:{
        icon: React.createElement(MdTextFields),
        label:"TextField",
    },
    designerComponent:() => <div>Designer Component</div>,
    formComponent:()=><div>Form Component</div>,
    propertiesComponent:()=><div>Properties Component</div>,
};