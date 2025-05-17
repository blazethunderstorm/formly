"use client"

import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "./ui/dialog"
import { BsFileEarmarkPlus } from "react-icons/bs"
import { ImSpinner2 } from "react-icons/im"
import { z } from "zod"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import { toast } from "sonner"
import { CreateForm } from "@/action/form"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(4),
  description: z.string().optional(),
})

export default function CreateFormBtn() {
  const router =useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [open, setOpen] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: ""
    }
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const formId = await CreateForm(data);
     
      toast.success("Form created successfully")
      setOpen(false)
      form.reset()
      router.push(`/builder/${formId}`)
    }
    catch(error) {
      toast.error("An error occurred while creating the form")
    }
    finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4">
          <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary " />
          <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">Create New Form</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-lg backdrop-blur-2xl border border-gray-200 shadow-xl rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold ">Create a new form</DialogTitle>
          <DialogDescription >
            Fill in the details to create a new form.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm" 
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      rows={5} 
                      {...field} 
                      className="border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm" 
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button 
                onClick={form.handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-2 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70 w-full"
              >
                {!isSubmitting && <span>Save</span>}
                {isSubmitting && (
                  <ImSpinner2 className="animate-spin h-5 w-5 text-white" />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}