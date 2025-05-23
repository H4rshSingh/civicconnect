import IssueCard from "@/components/cards/IssueCard";
import Pagination from "@/components/shared/Pagination";
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

    const result = await adminFetchIssue(userInfo?._id);
    console.log({result})

    return (
        <>
      <h1 className='head-text text-left'>Assigned Issues</h1>

      <section className='mt-9 flex flex-col gap-10'>
        {result?.issues.length === 0 ? (
          <p className='no-result'>No Issue found</p>
        ) : (
          <>
            {result?.issues.map((issue : any) => (
              <IssueCard
                key={issue._id}
                id={issue._id}
                currentUserId={user.id}
                title={issue.title}
                description={issue.description}
                reportDate={issue.reportDate}
                phase={issue.phase}
                location={issue.location.toString()}
                voteCount={issue.voteCount}
                reporter={issue.reporter}
                community={issue.community}
                resolvedDate={issue.resolutionDate}
                comments={issue.comments}
                commentCount={issue.comments.length}
                image = {issue.image}
                isComment={false}
                isAdmin = {userInfo?.isAdmin}
                adminType={userInfo?.adminType}
                department={issue.department}
              />
            ))}
          </>
        )}
      </section>

    </>
    );
}

export default Page;
