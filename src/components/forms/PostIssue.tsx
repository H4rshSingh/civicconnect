"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { IssueValidation } from "@/lib/validations/issue";
import Image from "next/image";
import { Input } from "../ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { createIssue } from "@/lib/actions/issue.action";
import { isBase64Image } from "@/lib/utils";
import FileUpload from "../shared/FileUpload";
import { getDepartments } from "@/lib/actions/department.action";

interface Props {
    userId: string;
    location: string;
    communityId?: string;
}

function PostIssue({ userId, location, communityId }: Props) {
    const router = useRouter();
    const pathname = usePathname();

    const { organization } = useOrganization();

    const [departments, setDepartments] = useState<
        {
            _id: string;
            name: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
        }[]
    >([]);
    // const fetchDepartments = async () => {
    //     const dep = await getDepartments();
    //     setDepartments(dep);
    // };

    useEffect(() => {
        const fetchDepartments = async () => {
            const dep = await getDepartments();
            console.log(dep);
            setDepartments(dep);
        };
        fetchDepartments();
    }, []);



    const form = useForm<z.infer<typeof IssueValidation>>({
        resolver: zodResolver(IssueValidation),
        defaultValues: {
            title: "",
            description: "",
            location: location,
            image: '',
            reporterId: userId,
            department: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof IssueValidation>) => {
        console.log("harsh ",departments)
        await createIssue({
            title: values.title,
            description: values.description,
            location: values.location,
            image: values.image ?? "",
            reporterId: values.reporterId,
            communityId: communityId ? communityId : null,
            path: pathname,
            department: values.department != "" ? values.department : departments[0]?.name,
        });
        if (communityId) {
            router.push(`/communities/${communityId}`)
        }
        router.push("/");
        form.reset();
    };

    return (
        <Form {...form}>
            <form
                className='mt-10 flex flex-col justify-start gap-10'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Title
                            </FormLabel>
                            <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 custom-scrollbar'>
                                <Textarea rows={2} {...field} className="resize-none" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Description
                            </FormLabel>
                            <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 custom-scrollbar'>
                                <Textarea rows={5} {...field} className="resize-none " />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='department'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Department
                            </FormLabel>
                            <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 custom-scrollbar'>
                                <select
                                    {...field}
                                    className="resize-none bg-dark-3 text-light-1"
                                >
                                    {departments?.map((department: any) => (
                                        <option key={department._id} value={department.name}>
                                            {department.name}
                                        </option>
                                    ))}
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col sm:justify-between sm:flex-row gap-4 sm:items-center ">
                    <FormField
                        control={form.control}
                        name='location'
                        render={({ field }) => (
                            <FormItem className='flex w-full sm:w-1/2 flex-col gap-3'>
                                <FormLabel className='text-base-semibold text-light-2'>
                                    Location
                                </FormLabel>
                                <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 custom-scrollbar'>
                                    <Textarea rows={1} {...field} className="resize-none " />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Photo</FormLabel>
                                <FormControl>
                                    <FileUpload
                                        apiEndpoint="media"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type='submit' className='bg-primary-500'>
                    Post Issue
                </Button>
            </form>
        </Form>
    );
}

export default PostIssue;
