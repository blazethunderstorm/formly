"use client"

import { MdTextFields } from "react-icons/md";
import React from "react";
import {ElementsType, FormElementInstance, FormElements} from "../FormElements";
import { Label } from "recharts";
import { Input } from "../ui/input";

const type:ElementsType="TextField";
const extraAttributes={
    label:"TextField",
    helperText:"Helper Text",
    required:false,
    placeHolder:"Value Here ..."
}
export const TextFieldElement:FormElements={

    type,
    construct:(id:string) =>({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement:{
        icon: MdTextFields,
        label:"TextField",
    },
    designerComponent: DesignerComponent,
    formComponent:()=><div>Form Component</div>,
    propertiesComponent:()=><div>Properties Component</div>,
};


type CustomInstance=FormElementInstance & {
    extraAttributes:typeof extraAttributes
}

function DesignerComponent({elementInstance,}:{elementInstance:FormElementInstance}){
    const element=elementInstance as CustomInstance;
    const{label,required,placeHolder,helperText}=element.extraAttributes;
    return ( 
    <div className="flex flex-col gap-2 w-full">
        <Label>
            {label}
            {required && "*"}
        </Label>
        <Input readOnly disabled placeholder={placeHolder}/>
        {helperText && (
            <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
        )}
    </div>
    );
}