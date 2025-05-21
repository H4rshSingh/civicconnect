"use server"
import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import Department from "../models/department.model";

interface Params {
    name: string;
    description: string;
}

export const createDepartment = async (params : Params) => {
    try {
        await connectToDB();
        const { name, description } = params;
        const newDepartment = new Department({
            name,
            description
        });
        await newDepartment.save();
        revalidatePath("/admin/department");
    } catch (error) {
        console.log(error);
    }
};

export const getDepartment = async (id: string) => {
    try {
        await connectToDB();
        const department = await Department.findById(id);
        if (!department) {
            throw new Error("Department not found");
        }
        return department;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching department");
    }
}
export const getDepartments = async ( ) => {
    try {
        await connectToDB();
        const departments = await Department.find({});
        if (!departments) {
            throw new Error("Departments not found");
        }
        return departments;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching departments");
    }
}

export const updateDepartment = async (params: Params) => {
    try {
        await connectToDB();
        const { id, name, description } = params;
        const department = await Department.findByIdAndUpdate(id, {
            name,
            description
        }, { new: true });
        if (!department) {
            throw new Error("Department not found");
        }
        revalidatePath("/admin/department");
    } catch (error) {
        console.log(error);
    }
};

