'use client'

import { Chip, Pagination, Table } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";

const ApplyTable = ({applications}) => {
 const [page, setPage] = useState(1);
 const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(applications.length/ITEMS_PER_PAGE);
  const currentData = applications.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
  return (
    <div>
     <Table className='w-full border'>
      <Table.ScrollContainer>
        <Table.Content aria-label="Team members" >
          <Table.Header>
            <Table.Column isRowHeader>Job Title</Table.Column>
            <Table.Column>Company</Table.Column>
            <Table.Column>Apply Time</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Details</Table.Column>
          </Table.Header>
          <Table.Body>
           {currentData.map(application => 
             <Table.Row key={application._id}>
              <Table.Cell>{application.jobTitle}</Table.Cell>
              <Table.Cell>{application.companyName}</Table.Cell>
              <Table.Cell>
                 {new Date(application.createdAt).toLocaleString("en-BD", {
                  dateStyle: "medium",
                  timeStyle: "short",
                  })}
              </Table.Cell>
              <Table.Cell>{application.status == 'reviewed' ? <Chip>Reviewed</Chip>  : application.status == 'rejected' ? <Chip color="danger">Rejected</Chip>: <Chip color="success">Applied</Chip> }</Table.Cell>
              <Table.Cell><Link className="bg-gray-900 py-2 px-6 font-medium rounded-2xl" href={`/jobs/${application.jobId}`}>Details</Link></Table.Cell>
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

export default ApplyTable;