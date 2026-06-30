'use client'
import { Button, Input } from '@heroui/react';
import { Magnifier } from '@gravity-ui/icons';
import { CompanyCard } from '@/app/components/CompanyCard';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';

const CompanyClient = ({ filters, companies = [], size, totalData, currentPage }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const totalPages = Math.ceil(totalData / size) || 1;
 

  const [search, setSearch] = useState(filters?.search || ""); 
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if(search) {
      params.set("search", search)
    } else{
      params.delete('search')
    }
    params.set("page", 1)
    console.log(params.toString() , 'params string')
    router.push(`?${params.toString()}`)
  }
  const handlePageChange = (newPage) => {
    console.log('clicked', newPage, totalPages)
    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("page", newPage.toString());

    router.push(`?${params.toString()}`);
  };



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
            value={search} // Controlled input বানানোর জন্য value দেওয়া ভালো
            className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button 
            className="shrink-0 rounded-lg bg-white px-5 py-2 text-sm font-medium text-black hover:bg-zinc-200"
            onClick={handleSearch}
          >
            Find Companies
          </Button>
        </div>

        {/* কোম্পানি কার্ড গ্রিড */}
        {companies.length === 0 ? (
          <div className="text-center text-zinc-500 my-10">No companies found.</div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <CompanyCard key={company._id} company={company} />
            ))}
          </div>
        )}

        {/* নেভিগেশন বাটনসমূহ (যদি ১ পেজের বেশি থাকে তখনই শুধু দেখাবে) */}
        {totalPages > 1 && (
          
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="flat"
          isDisabled={currentPage === 1}
          onPress={() => handlePageChange(currentPage - 1)}
        >
          <CircleArrowLeft/>
        </Button>
        
        <span className="text-sm min-w-[80px] text-center">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          size="sm"
          variant="flat"
          isDisabled={currentPage === totalPages}
          onPress={() => handlePageChange(currentPage + 1)}
        >
          <CircleArrowRight></CircleArrowRight>
        </Button>
      </div>

        )}

      </div>
    </div>
  );
};

export default CompanyClient;