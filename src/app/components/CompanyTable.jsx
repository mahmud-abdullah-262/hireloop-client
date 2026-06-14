'use client'

import { updateCompanyStatus } from "@/lib/actions/action";
import { Button, Chip, Pagination, Table, toast } from "@heroui/react";

import Link from "next/link";
import { useState } from "react";

const CompanyTable =  ({data}) => {
  const handleApprove = async(companyData) => {
   const id = companyData._id ;
  // console.log(companyData, id, 'handle approve clicked')
    
  const result =  await updateCompanyStatus(id, companyData)
  if(result){
    toast.success('Company Approved.')
  }
  // console.log('data after update:', companyData, id)
 }
const handleReject = async(companyData) => {
  const id = companyData._id;
  const result = await updateCompanyStatus(id, companyData)
  console.log(result)
  if(result?.success){
    toast.danger('Company Rejected.')
  } else {
    toast.error(result?.message || 'Something went wrong')  // forbidden দেখাবে
  }
}

 
 const [page, setPage] = useState(1);
 const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(data.length/ITEMS_PER_PAGE);
  const currentData = data.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
  return (
    <div>
     <Table className='w-full border'>
      <Table.ScrollContainer>
        <Table.Content aria-label="Team members" >
          <Table.Header>
            <Table.Column isRowHeader>Company Name</Table.Column>
            <Table.Column>Recruiter Id</Table.Column>
            <Table.Column>Industry</Table.Column>
            <Table.Column>Date Submitted</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Actions</Table.Column>
          </Table.Header>
          <Table.Body>
           {currentData.map(company => 
             <Table.Row key={company._id}>
              <Table.Cell>{company.companyName}</Table.Cell>
              <Table.Cell>{company.recruiterId}</Table.Cell>
              <Table.Cell>{company.category}</Table.Cell>
              <Table.Cell>
                 {new Date(company.createdAt).toLocaleString("en-BD", {
                  dateStyle: "medium",
                  timeStyle: "short",
                  })}
              </Table.Cell>
              <Table.Cell>
                {company.status == 'approve' ? <Chip color="success">Approved</Chip>
                : company.status == 'reject' ? <Chip color="danger">Rejected</Chip>
                :  company.status == 'inactive' ? <Chip color="warning">Inactive</Chip>
               : <Chip color="warning">Pending</Chip> }</Table.Cell>
              <Table.Cell className={'space-x-1'}>
                <Button 
                 onClick={() => {
                  const data = {
                    ...company,
                    status: 'reject'
                  }
                  handleReject(data)
                }}
                className={'rounded'} variant="danger">Reject</Button>
                <Button 
                onClick={() => {
                  const data = {
                    ...company,
                    status: 'approve'
                  }
                  handleApprove(data)
                }}
                className={'bg-green-500 text-white rounded'}>Approve</Button>
              </Table.Cell>
            </Table.Row>
           )}
         
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table> 


     <Pagination className="justify-center mt-10">
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
            <Pagination.PreviousIcon />
            <span>Previous</span>
          </Pagination.Previous>
        </Pagination.Item>
        {Array.from({length: totalPages}, (_, i) => i + 1).map((p) => (
          <Pagination.Item key={p}>
            <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
              {p}
            </Pagination.Link>
          </Pagination.Item>
        ))}
        <Pagination.Item>
          <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
            <span>Next</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
    </div>
  );
};

export default CompanyTable;