"use client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Select,
  SelectValue,
  ListBox,
  ListBoxItem,
  TextArea,
  Popover,
  toast,
} from "@heroui/react";
import { DatePicker } from "@heroui/react";
import { Switch } from "@heroui/react";
import {
  Briefcase,
  Factory,
  Calendar,
  Check,
  CircleDollar,
  GeoPin,
  TextAlignLeft,
  ListUl,
  Star,
  Persons,
} from "@gravity-ui/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { createJob } from "@/lib/actions/action";
import Router from "next/router";
import Link from "next/link";


// ─── Section wrapper ──────────────────────────────────────────────────────────
const Section = ({ icon: Icon, title, children }) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-2 border-b pb-2">
      {Icon && <Icon className="text-gray-200 w-5 h-5" />}
      <h2 className="text-base font-semibold text-gray-200">{title}</h2>
    </div>
    {children}
  </div>
);

// ─── Two-column row ───────────────────────────────────────────────────────────
const Row = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
);

// ─── Mock company (replace with real auth context) ───────────────────────────
// const MOCK_COMPANY = {
//   name: "Acme Corp",
//   website: "https://acmecorp.com",
//   industry: "Technology",
//   location: "Dhaka, Bangladesh",
//   approved: true,
//   companyId: "1234567890",
// };

const JOB_CATEGORIES = [
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "Human Resources",
  "Operations",
  "Customer Support",
  "Product",
  "Legal",
  "Other",
];

const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Remote",
  "Contract",
  "Internship",
];

const CURRENCIES = ["BDT", "USD", "EUR", "GBP", "INR", "AED", "SGD"];

// ─── Main component ───────────────────────────────────────────────────────────
const PostJobForm = ({company}) => {
 
    if (!company) {
    return (
      <div className='flex flex-col gap-4 items-center justify-center py-20'>
        <p className='text-gray-500'>
       Please create a company profile before posting a job.
        </p>
        <Link href={'/recruiterdashboard/new'}>
           <Button>Create A job If you have a company</Button>
          </Link>
      </div>
    );
  };


  const router = useRouter();
  const companyData = company;
  console.log(company, 'company data form inside form')
  const [form, setForm] = useState({
    title: "",
    category: "",
    type: "",
    salaryMin: "",
    salaryMax: "",
    currency: "BDT",
    city: "",
    country: "",
    isRemote: false,
    deadline: null,
    responsibilities: "",
    requirements: "",
    benefits: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const set = (field) => (val) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // if (!companyData.approved) {
    //   setError(
    //     "Your company has not been approved yet. Please contact the administrator."
    //   );
    //   return;
    // }

    setLoading(true);
    try {
      const data = {
        ...form,
        company: companyData.companyName,
        companyId: companyData._id,
        status: "active",
        postedAt: new Date().toISOString(),
        isPublic: true,
        
      };
      console.log("Job data before post:", data);
      const res = await createJob(data);
      console.log("Job data after post:", res)
      if(res.insertedId){
        toast.success('Job posted successfully!')
        router.push('/recruiterdashboard/recruiteralljobs');
      }
      else{
          setSuccess(true);
      }
    
    } catch (err) {
      setError("An error occurred while posting the job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex justify-center items-center mt-16 mx-auto">
        <div className="flex flex-col items-center gap-4 p-12 rounded-2xl shadow-xl border text-center max-w-sm w-full ">
          <div className="bg-green-100 rounded-full p-4">
            <Check className="text-green-600 w-4 h-4" />
          </div>
          <h2 className="text-xl font-semibold text-gray-100">Job Posted!</h2>
          <p className="text-gray-300 text-sm">
           Your job listing has been successfully published and is now publicly visible.
          </p>
          <Button
            variant="primary"
            onPress={() => {
              setSuccess(false);
              setForm({
                title: "",
                category: "",
                type: "",
                salaryMin: "",
                salaryMax: "",
                currency: "BDT",
                city: "",
                country: "",
                isRemote: false,
                deadline: null,
                responsibilities: "",
                requirements: "",
                benefits: "",
              });
            }}
          >
            Post another job
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-6 px-4 w-full">
      <Form
        className="flex w-full  flex-col gap-8 p-8 sm:p-10 rounded-2xl shadow-xl border"
        onSubmit={onSubmit}
      >
        {/* ── Header ── */}
        <div>
          <h1 className="text-2xl font-bold text-white">New Job Post</h1>
          <p className="text-sm text-gray-300 mt-1">
            Please fill in all required fields.
          </p>
        </div>

        {/* ── Section 1: Job Info ── */}
        <Section icon={Briefcase} title="Job Information">
          {/* Title */}
          <TextField
            isRequired
            name="title"
            onChange={set("title")}
            className="w-full"
          >
            <Label>Job Title</Label>
            <Input placeholder="e.g. Senior Frontend Developer" />
            <FieldError />
          </TextField>

          <Row>
            {/* Category */}
            <TextField
              isRequired
              name="category"
              onChange={set("category")}
            >
              <Label>Job Category</Label>
              <Input
                list="job-categories"
                placeholder="Select or type a category"
              />
              <datalist id="job-categories">
                {JOB_CATEGORIES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
              <FieldError />
            </TextField>

            {/* Job Type */}
            <TextField
              isRequired
              name="type"
              onChange={set("type")}
            >
              <Label>Job Type</Label>
              <Input
                list="job-types"
                placeholder="Full-time, Remote…"
              />
              <datalist id="job-types">
                {JOB_TYPES.map((t) => (
                  <option key={t} value={t} />
                ))}
              </datalist>
              <FieldError />
            </TextField>
          </Row>

          {/* Salary */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium text-gray-200">
              Salary Range
            </Label>
            <div className="flex items-center gap-2">
              {/* Currency */}
              <TextField name="currency" onChange={set("currency")}>
                <Input
                  list="currencies"
            
                  className="w-full text-center"
                />
                <datalist id="currencies">
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </TextField>

              <TextField
                name="salaryMin"
                type="number"
                onChange={set("salaryMin")}
                className="flex-1"
              >
                <Input placeholder="Min" />
              </TextField>

              <span className="text-gray-200 text-sm">–</span>

              <TextField
                name="salaryMax"
                type="number"
                onChange={set("salaryMax")}
                className="flex-1"
              >
                <Input placeholder="Max" />
              </TextField>
            </div>
          </div>

          
    {/* Location */}
<div className="flex flex-col gap-2">
  <div className="flex items-center justify-between">
    <Label className="text-sm font-medium text-gray-200">
      Location
    </Label>
   <Switch
  isSelected={form.isRemote}
  onChange={(v) => setForm(prev => ({ ...prev, isRemote: !prev.isRemote }))}
>
  <Switch.Control>
    <Switch.Thumb />
  </Switch.Control>
  <Label className="text-sm text-gray-300">Remote Only</Label>
</Switch>
  </div>

  {!form.isRemote && (
    <Row>
      <TextField name="city" onChange={set("city")}>
        <Label>City</Label>
        <Input placeholder="Dhaka" />
      </TextField>
      <TextField name="country" onChange={set("country")}>
        <Label>Country</Label>
        <Input placeholder="Bangladesh" />
      </TextField>
    </Row>
  )}
  {form.isRemote && (
    <p className="text-sm text-blue-500 bg-blue-50 rounded-lg px-3 py-2">
      🌐 This position is fully remote — no location required.
    </p>
  )}
</div>

          {/* Deadline */}
          <TextField
            name="deadline"
            type="date"
            onChange={set("deadline")}
          >
            <Label>Application Deadline</Label>
            <Input type="date" />
            <FieldError />
          </TextField>
        </Section>

        {/* ── Section 2: Job Description ── */}
        <Section icon={TextAlignLeft} title="Job Description">
          {/* Responsibilities */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium text-gray-200">
              Responsibilities <span className="text-red-500">*</span>
            </Label>
            <textarea
              required
              name="responsibilities"
              rows={5}
              placeholder="• Develop and maintain frontend components&#10;• Collaborate with design and backend teams&#10;• Write clean, tested code"
              value={form.responsibilities}
              onChange={(e) => set("responsibilities")(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-y"
            />
          </div>

          {/* Requirements */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium text-gray-200">
              Requirements <span className="text-red-500">*</span>
            </Label>
            <textarea
              required
              name="requirements"
              rows={5}
              placeholder="• 3+ years of React experience&#10;• Proficiency in TypeScript&#10;• Good communication skills"
              value={form.requirements}
              onChange={(e) => set("requirements")(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-y"
            />
          </div>

          {/* Benefits */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium text-gray-200">
              Benefits{" "}
              <span className="text-gray-400 font-normal text-xs">
                (optional)
              </span>
            </Label>
            <textarea
              name="benefits"
              rows={3}
              placeholder="• Competitive salary&#10;• Health insurance&#10;• Flexible hours"
              value={form.benefits}
              onChange={(e) => set("benefits")(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-y"
            />
          </div>
        </Section>

        {/* ── Section 3: Company ── */}
        <Section icon={Factory} title="Company">
          {/* {companyData.approved ? (
            <div className="flex items-start gap-4 rounded-xl border px-4 py-3">
              <div className=" rounded-lg p-2">
                <Factory className="text-white w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-300">
                  {companyData.companyName}
                </p>
                <p className="text-xs text-gray-300">
                  {companyData.category} · {companyData.location}
                </p>
                <a
                  href={companyData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:underline"
                >
                  {companyData.url}
                </a>
              </div>
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full font-medium">
                Approved
              </span>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl px-4 py-3 text-sm">
             ⚠️ Your company has not been approved yet. Admin approval is required to post a job.
            </div>
          )} */}
            <div className="flex items-start gap-4 rounded-xl border px-4 py-3">
              <div className=" rounded-lg p-2">
                <Factory className="text-white w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-300">
                  {companyData.companyName}
                </p>
                <p className="text-xs text-gray-300">
                  {companyData.category} · {companyData.location}
                </p>
                <a
                  href={companyData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:underline"
                >
                  {companyData.url}
                </a>
              </div>
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full font-medium">
                Approved
              </span>
            </div>
        </Section>

        {/* ── Error ── */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* ── Actions ── */}
        <div className="flex items-center gap-3 pt-2 border-t">
          <Button
            type="submit"
            // isDisabled={loading || !companyData.approved}
            className="flex items-center gap-2"
          >
            {loading ? (
              "Posting…"
            ) : (
              <>
                <Check className="w-4 h-4" />
                Publish Job
              </>
            )}
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
          <p className="ml-auto text-xs text-gray-400">
            Status: <span className="text-green-600 font-medium">active</span> ·
            Publicly visible
          </p>
        </div>
      </Form>
    </div>
  );
};

export default PostJobForm;
