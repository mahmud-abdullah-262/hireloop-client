import { getCompany } from '@/lib/api/fetchFunctions';
import { Button, Input, Pagination } from '@heroui/react';
import { ArrowRight, CircleCheckFill, Magnifier } from '@gravity-ui/icons';
import { CompanyCard } from '@/app/components/CompanyCard';




const CompanyPage = async () => {
  const companies = await getCompany();
  // const companies = dummyCompanies; // আপাতত ডামি ডাটা, রিয়েল ডাটা রেডি হলে উপরের লাইন আনকমেন্ট করে দিও

  return (
    <div className="min-h-screen bg-black px-6 py-10 text-white sm:px-10">
      <div className="mx-auto max-w-6xl">
        {/* হেডার */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Browse Companies</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Discover the world&apos;s leading technology and creative organizations.
            Filter by industry, size, and values to find your next professional home.
          </p>
        </div>

        {/* সার্চ বার */}
        <div className="mb-8 flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 p-2 pl-4">
          <Magnifier className="size-4 shrink-0 text-zinc-500" />
          <Input
            aria-label="Search companies"
            placeholder="Search by name, industry, or location..."
            className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          />
          <Button className="shrink-0 rounded-lg bg-white px-5 py-2 text-sm font-medium text-black hover:bg-zinc-200">
            Find Companies
          </Button>
        </div>

        {/* কোম্পানি কার্ড গ্রিড */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <CompanyCard key={company._id} company={company} />
          ))}
        </div>

        {/* পেজিনেশন */}
        <div className="mt-10 flex justify-center">
          <Pagination aria-label="Company pagination">
            <Pagination.Content className="gap-2">
              <Pagination.Item>
                <Pagination.Previous className="h-9 w-9 rounded-lg bg-zinc-900 text-zinc-400 hover:bg-zinc-800">
                  <Pagination.PreviousIcon />
                </Pagination.Previous>
              </Pagination.Item>
              <Pagination.Item>
                <Pagination.Link isActive className="h-9 w-9 rounded-lg bg-white text-black">
                  1
                </Pagination.Link>
              </Pagination.Item>
              <Pagination.Item>
                <Pagination.Link className="h-9 w-9 rounded-lg bg-zinc-900 text-zinc-400 hover:bg-zinc-800">
                  2
                </Pagination.Link>
              </Pagination.Item>
              <Pagination.Item>
                <Pagination.Link className="h-9 w-9 rounded-lg bg-zinc-900 text-zinc-400 hover:bg-zinc-800">
                  3
                </Pagination.Link>
              </Pagination.Item>
              <Pagination.Item>
                <Pagination.Ellipsis className="text-zinc-500" />
              </Pagination.Item>
              <Pagination.Item>
                <Pagination.Link className="h-9 w-9 rounded-lg bg-zinc-900 text-zinc-400 hover:bg-zinc-800">
                  12
                </Pagination.Link>
              </Pagination.Item>
              <Pagination.Item>
                <Pagination.Next className="h-9 w-9 rounded-lg bg-zinc-900 text-zinc-400 hover:bg-zinc-800">
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;