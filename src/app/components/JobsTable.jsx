// components/recruiter/JobsTable.jsx
"use client";

import { Table, Chip, Button, Tooltip } from '@heroui/react';
import { Eye, Pencil, TrashBin } from '@gravity-ui/icons';

const columns = [
  { id: 'title', label: 'Job Title' },
  { id: 'category', label: 'Category' },
  { id: 'type', label: 'Type' },
  { id: 'salary', label: 'Salary' },
  { id: 'location', label: 'Location' },
  { id: 'deadline', label: 'Deadline' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions' },
];

const statusColorMap = {
  active: 'success',
  inactive: 'danger',
  draft: 'warning',
};

const typeColorMap = {
  'Full-time': 'primary',
  'Part-time': 'secondary',
  Contract: 'warning',
  Freelance: 'default',
};

const renderCell = (job, columnId) => {
  switch (columnId) {
    case 'title':
      return (
        <div className="flex flex-col">
          <p className="text-sm font-semibold">{job.title}</p>
          <p className="text-xs text-gray-400">{job.company}</p>
        </div>
      );
    case 'category':
      return <span className="text-sm">{job.category}</span>;
    case 'type':
      return (
        <Chip color={typeColorMap[job.type] ?? 'default'} size="sm" variant="flat">
          {job.type}
        </Chip>
      );
    case 'salary':
      return (
        <div className="flex flex-col">
          <span className="text-sm">
            {Number(job.salaryMin).toLocaleString()} – {Number(job.salaryMax).toLocaleString()}
          </span>
          <span className="text-xs text-gray-400">{job.currency}</span>
        </div>
      );
    case 'location':
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-sm capitalize">{job.city}, {job.country}</span>
          {job.isRemote && (
            <Chip size="sm" variant="dot" color="secondary">Remote</Chip>
          )}
        </div>
      );
    case 'deadline':
      return (
        <span className="text-sm">
          {new Date(job.deadline).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      );
    case 'status':
      return (
        <Chip color={statusColorMap[job.status] ?? 'default'} size="sm" variant="flat">
          {job.status}
        </Chip>
      );
    case 'actions':
      return (
        <div className="flex items-center gap-1">
          <Tooltip content="View">
            <Button isIconOnly size="sm" variant="light">
              <Eye width={16} height={16} />
            </Button>
          </Tooltip>
          <Tooltip content="Edit">
            <Button isIconOnly size="sm" variant="light" color="primary">
              <Pencil width={16} height={16} />
            </Button>
          </Tooltip>
          <Tooltip content="Delete" color="danger">
            <Button isIconOnly size="sm" variant="light" color="danger">
              <TrashBin width={16} height={16} />
            </Button>
          </Tooltip>
        </div>
      );
    default:
      return null;
  }
};

export default function JobsTable({ jobs }) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Recruiter job listings">
          <Table.Header>
            {columns.map((col) => (
              <Table.Column key={col.id} id={col.id}>
                {col.label}
              </Table.Column>
            ))}
          </Table.Header>
          <Table.Body
            items={jobs}
            renderEmptyState={() => (
              <div className="py-8 text-center text-gray-400">No jobs found.</div>
            )}
          >
            {(job) => (
              <Table.Row id={job._id}>
                {columns.map((col) => (
                  <Table.Cell key={col.id}>{renderCell(job, col.id)}</Table.Cell>
                ))}
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}