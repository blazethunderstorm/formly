"use server";

import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schemas/form";
import { currentUser } from "@clerk/nextjs/server";

class UserNotFoundErr extends Error{

}

export async function GetFormStats() {
    const user= await currentUser();
    if (!user) {
        throw new UserNotFoundErr();
    }
    const stats=prisma.form.aggregate({
        where:{
            userID:user.id,
        },
        _sum:{
            visits:true,
            submissions:true,

        },

    })
    const visits=(await stats)._sum.visits||0;
    const submissions=(await stats)._sum.submissions||0;

    let submissionRate=0;

    if (visits>0){
        submissionRate=(submissions/visits)*100;
    }

    const bounceRate=100-submissionRate;

    return {
        visits,submissions,submissionRate,bounceRate
    }
}



export async function CreateForm(data: formSchemaType) {
    const validation = formSchema.safeParse(data);
    if (!validation.success) {
      throw new Error("Validation failed");
    }
    
    const user = await currentUser();
    if (!user) {
      throw new UserNotFoundErr();
    }
    
    const form = await prisma.form.create({
      data: {
        name: data.name,
        description: data.description ?? "",
        userID: user.id,
      }
    });
    
    if (!form) {
      throw new Error("Form creation failed");
    }
    
    return form.id;
  }


export async function GetForms (){
  const user=await currentUser();
  if (!user){
    throw new UserNotFoundErr();
  }
  return await prisma.form.findMany({
    where:{
      userID:user.id,
    },
    orderBy:{
      createdAt:"desc",
    },
  }

  )
}

export async function GetFormById(id: number) {
  const user=await currentUser();
  if (!user){
    throw new UserNotFoundErr();
  }
  return await prisma.form.findUnique({
    where:{
      id,
    },
  })
}