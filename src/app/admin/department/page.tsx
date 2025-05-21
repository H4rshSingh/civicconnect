import { createDepartment, getDepartments } from "@/lib/actions/department.action";
import { adminFetchIssue } from "@/lib/actions/issue.action";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({
    searchParams,
  }: {
    searchParams: { [key: string]: string | undefined };
  }) => {
    const user = await currentUser();
    if (!user) return null; // to avoid typescript warnings

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.isAdmin) redirect("/");

    if (!userInfo?.onboarded) redirect("/onboarding");

    const departmentResult = await getDepartments();

    return (
        <>
      <h1 className='head-text text-left'>Create Department</h1>

      <section className='mt-9 flex flex-col gap-10'>
        <form action={async (formData: FormData) => {
            "use server";
            const name = formData.get("name")?.toString();
            const description = formData.get("description")?.toString();

            if (!name || !description) {
                return;
            }

            await createDepartment({
                name,
                description,
            })
        }}>
            <div className="flex flex-col gap-4">
                <label htmlFor="name" className="text-sm font-medium">Department Name</label>
                <input type="text" name="name" id="name" className="border border-gray-300 rounded-md p-2" required />
            </div>
            <div className="flex flex-col gap-4">
                <label htmlFor="description" className="text-sm font-medium">Department Description</label>
                <textarea name="description" id="description" rows={4} className="border border-gray-300 rounded-md p-2" required></textarea>
            </div>
            <button type="submit" className="mt-8 bg-blue text-white py-2 px-4 rounded-md ">Create Department</button>
        </form>

      </section>
        {/* fetch all department */}

        <section className='mt-9 flex flex-col gap-10'>
            <h1 className='head-text text-left'>Departments</h1>
            {departmentResult?.length === 0 ? (
                <p className='no-result'>No Department found</p>
            ) : (
                <>
                    {departmentResult?.map((department: any) => (
                        <div key={department._id} className="border border-gray-300 rounded-md p-4">
                            <h2 className="text-lg font-semibold">{department.name}</h2>
                            <p className="text-sm text-gray-500">{department.description}</p>
                        </div>
                    ))}
                </>
            )}
        </section>
    </>
    );
}

export default Page;
