'use client'
import { Pagination, Table } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const PaymentTable = ({ subscriptions = [], page, totalData, size }) => {
const searchParams = useSearchParams();
const router = useRouter()

 const totalPages = Math.ceil(totalData / size);
  const itemsPerPage = size;
 
  // এটা লাগবে যদি এতটি থেকে এতটি দেখানো হচ্ছে, এভাবে দেখাতে চাই
  //  const startItem = totalData === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  // const endItem = Math.min(page * itemsPerPage, totalData);



  const handlePageChange = (newPage) => {
    console.log('clicked', newPage, totalPages) 
    if (newPage < 1 || newPage > totalPages) return; // যদি পেজ নাম্বার একের কম হয়, বা টোটাল পেজের কম হয় তাহলে রিটার্ন। টোটাল পেজ নাম্বার ফরম্যাটেঠিকভাবে দেয়া আছে কিনা দেখতে হবে।

    const params = new URLSearchParams(searchParams.toString()); // বিদ্যমান ব্রাউজার টেক্সটটা  নিয়ে এসে স্ট্রিং বানালাম

    params.set("page", newPage.toString()); // সেখানের পেজ প্যারামিটারে পেজিনেশনথেকে আসা পেজ নাম্বার সেট করলাম

    router.push(`?${params.toString()}`); // ব্রাউজারের এড্রেসবারে সেটা সেট করলাম।

  }
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* শুরুতে টাইটেল */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-white">Admin Payment Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Total Subscriptions: {totalData}</p>
      </div>

     {/* রেসপন্সিভ টেবিল কন্টেইনার */}
<div className="w-full overflow-x-auto">
  <Table>
    <Table.ScrollContainer>
      <Table.Content aria-label="Subscriptions Payment Table" className="w-full">
        <Table.Header>
          <Table.Column isRowHeader>Email</Table.Column>
         
          <Table.Column>Transaction ID</Table.Column>
          <Table.Column>Plan ID</Table.Column>
          <Table.Column>Amount</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column>Date</Table.Column>
        </Table.Header>
        <Table.Body>
          {subscriptions.map((sub) => (
            <Table.Row key={sub._id}>
              <Table.Cell>{sub.customerEmail}</Table.Cell>

            <Table.Cell className="w-32 max-w-[120px] truncate">
              
                  {sub.sessionId}
             
              </Table.Cell>

            
              <Table.Cell>{sub.planId}</Table.Cell>
              <Table.Cell>{sub.amount} {sub.currency}</Table.Cell>
              <Table.Cell>{sub.paymentStatus}</Table.Cell>
              <Table.Cell>{sub.paymentDate}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Content>
    </Table.ScrollContainer>
  </Table>
</div>

      {/* পেজিনেশন */}
      <div className="flex justify-center pt-4">
        <Pagination className="justify-center">
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous 
              isDisabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
              >
                <Pagination.PreviousIcon />
                <span>Previous</span>
              </Pagination.Previous>
            </Pagination.Item>
            {Array.from({ length: totalPages || 0 }, (_, i) => i + 1).map((p) => (
              <Pagination.Item key={p}>
                <Pagination.Link isActive={p === page}>
                  {p}
                </Pagination.Link>
              </Pagination.Item>
            ))}
            <Pagination.Item>
              <Pagination.Next 
              onClick={() => handlePageChange(page + 1)}
              isDisabled={page === totalPages}>
                <span>Next</span>
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </div>
    </div>
  );
};

export default PaymentTable;