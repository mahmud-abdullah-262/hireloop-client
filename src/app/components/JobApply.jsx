'use client'
import { createApplications } from '@/lib/actions/action';
import {
  Paperclip,
  Person,
  Envelope,
  Handset,
  FileText,
  Link,
  Briefcase,
  Check,
  CircleXmark,
  ArrowUpFromSquare,
  CircleInfo,
  CircleCheckFill,
} from '@gravity-ui/icons';
import {
  Button,
  Chip,
  Separator ,
  Progress,
  Tooltip,
  ProgressBar,
  Label,
  toast,
} from '@heroui/react';
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import NextLink from 'next/link';
const DummyJob = {
  _id: { $oid: "6a2532ed97de561d0d00f09a" },
  title: "Frontend Engineer",
  category: "Engineering",
  type: "Full-time",
  salaryMin: "120000",
  salaryMax: "180000",
  currency: "USD",
  city: "San Jose",
  country: "USA",
  isRemote: false,
  deadline: "2026-07-15",
  company: "adobe",
  companyId: "6a25254997de561d0d00f05f",
  logoUrl: "https://res.cloudinary.com/dto6szvn9/image/upload/v1780814145/adobe_d4xxlf.png",
  status: "active",
  postedAt: "2026-06-07T08:00:00.000Z",
};

const dummyUser = {
  name: "mahmud",
  email: "mahmud@gmail.com",
  role: "seeker",
};

// ─── Validators ────────────────────────────────────────────────────────────
const validators = {
  fullName: (v) => !v.trim() ? "Name is required" : v.trim().length < 2 ? "Name is too short" : null,
  email: (v) =>
    !v.trim() ? "Email is required"
    : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v) ? "Enter a valid email address"
    : null,
  phone: (v) =>
    v && !/^[+]?[\d\s\-().]{7,15}$/.test(v) ? "Enter a valid phone number" : null,
  coverLetter: (v) =>
    !v.trim() ? "Cover letter is required"
    : v.trim().length < 50 ? "Write at least 50 characters"
    : null,
  linkedIn: (v) =>
    v && !/^https?:\/\/(www\.)?linkedin\.com\/.+/i.test(v) ? "Enter a valid LinkedIn URL" : null,
  portfolio: (v) =>
    v && !/^https?:\/\/.+\..+/.test(v) ? "Enter a valid URL" : null,
  yearsExp: (v) => !v ? "Please select your experience level" : null,
  resumeUrl: (v) => !v ? "Please upload your resume" : null,
};

// ─── Shared Input Classes ───────────────────────────────────────────────────
const inputBase =
  "w-full bg-default-100 hover:bg-default-200 focus:bg-gray-900 border border-default-200 focus:border-primary rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-default-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/30";

// ─── FormField Wrapper ──────────────────────────────────────────────────────
const FormField = ({ label, icon: Icon, error, required, hint, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="flex items-center gap-1.5 text-sm font-medium text-default-700">
      {Icon && <Icon className="w-3.5 h-3.5 text-default-500" />}
      {label}
      {required && <span className="text-danger text-xs ml-0.5">*</span>}
      {hint && (
        <Tooltip content={hint} placement="top">
          <span className="cursor-help text-default-400 ml-0.5">
            <CircleInfo className="w-3.5 h-3.5" />
          </span>
        </Tooltip>
      )}
    </label>
    {children}
    {error && (
      <p className="text-xs text-danger flex items-center gap-1">
        <CircleXmark className="w-3 h-3 shrink-0" />
        {error}
      </p>
    )}
  </div>
);

// ─── Main Component ─────────────────────────────────────────────────────────
const JobApply = ({ job, applicant }) => {
  const fileRef = useRef(null);
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    fullName: applicant.name || "",
    email: applicant.email || "",
    jobId: job._id || "",
    companyId: job.companyId || "",
    companyName: job.company,
    jobTitle: job.title || "",
    status: 'applied',
    applicantEmail: applicant.email || "",
    applicantId : applicant.id,
    phone: "",
    yearsExp: "",
    linkedIn: "",
    portfolio: "",
    coverLetter: "",
    resumeUrl: "",  
  resumeName: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const deadline = new Date(job.deadline);
  const daysLeft = Math.ceil((deadline - new Date()) / (1000 * 60 * 60 * 24));
  const salary = `$${parseInt(job.salaryMin).toLocaleString()} – $${parseInt(job.salaryMax).toLocaleString()}`;

  // ── Handlers ────────────────────────────────────────────────────────────
  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const err = validators[field]?.(value) ?? null;
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validators[field]?.(form[field]) ?? null;
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

 const [uploading, setUploading] = useState(false);

const handleFile = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // validation
  const allowed = ["application/pdf", "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
  if (!allowed.includes(file.type)) {
    setErrors((prev) => ({ ...prev, resume: "Only PDF or Word files are accepted" }));
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    setErrors((prev) => ({ ...prev, resume: "File size must be under 5 MB" }));
    return;
  }

  setUploading(true);
  setErrors((prev) => ({ ...prev, resume: null }));

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hireloop_resumes"); // তোমার preset নাম
    formData.append("resource_type", "raw"); // PDF/Word-এর জন্য

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/raw/upload`,
      { method: "POST", body: formData }
    );

    if (!res.ok) throw new Error("Upload failed");

    const data = await res.json();

    setForm((prev) => ({
      ...prev,
      resumeUrl: data.secure_url,  // এটা MongoDB-তে save হবে
      resumeName: file.name,
    }));
  } catch (err) {
    setErrors((prev) => ({ ...prev, resume: "Upload failed. Please try again." }));
  } finally {
    setUploading(false);
  }
};

  const validateAll = () => {
    const fields = ["fullName", "email", "phone", "coverLetter", "linkedIn", "portfolio", "yearsExp", "resumeUrl"];
    const newErrors = {};
    fields.forEach((f) => {
      const val = f === "resume" ? form.resume : form[f];
      const err = validators[f]?.(val) ?? null;
      if (err) newErrors[f] = err;
    });
    if (!form.agreeTerms) newErrors.agreeTerms = "You must agree to the terms";
    setErrors(newErrors);
    setTouched(Object.fromEntries(fields.map((f) => [f, true])));
    return Object.keys(newErrors).length === 0;
  };

  const goReview = () => {
    if (validateAll()) setStep(2);
  };

  const submit = async () => {
    console.log( 'submitted data form applicant:', form)
    const postApplication =  await createApplications(form)

    if(postApplication.insertedId){
      toast.success('Application posted successfully!')
     
      setStep(3);
    }

    
  };

  const progressValue = step === 1 ? 33 : step === 2 ? 66 : 100;

  // ─── Step 3: Success ─────────────────────────────────────────────────────
  if (step === 3) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="mx-auto w-20 h-20 rounded-full bg-success/10 flex items-center justify-center">
            <CircleCheckFill className="w-10 h-10 text-success" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Application Submitted!</h2>
            <p className="text-default-500 text-sm leading-relaxed">
              Your application for <span className="font-semibold text-foreground">{job.title}</span> at{" "}
              <span className="font-semibold text-foreground capitalize">{job.company}</span> has been sent successfully.
            </p>
          </div>
          <div className="bg-default-100 rounded-2xl p-4 text-left space-y-2">
            <p className="text-xs text-default-400 font-semibold uppercase tracking-wider">Confirmation</p>
            <p className="text-sm text-default-600">
              Confirmation sent to:{" "}
              <span className="text-foreground font-medium">{form.email}</span>
            </p>
            <p className="text-sm text-default-500">You can expect a response within 3–5 business days.</p>
          </div>
      
           <NextLink
  href='/jobs'
  className="w-full rounded-xl bg-white text-black px-4 py-2.5 text-sm font-medium text-center block"
>
  Submit Another Application
</NextLink>
     
         
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
   {/* ── Progress Bar ─────────────────────────────────────────────────── */}
<div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-default-200 px-4 py-3">
  <div className="max-w-2xl mx-auto">
    <ProgressBar value={progressValue}>
      <div className="flex items-center justify-between mb-2">
        <Label className="text-xs text-default-500">Step {step} of 3</Label>
        <ProgressBar.Output className="text-xs text-default-500" />
      </div>
      <ProgressBar.Track className="h-1.5 w-full bg-default-200 rounded-full overflow-hidden">
        <ProgressBar.Fill className="h-full bg-primary rounded-full transition-all duration-300" />
      </ProgressBar.Track>
    </ProgressBar>
  </div>
</div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* ── Job Info Card ────────────────────────────────────────────────── */}
        <div className="bg-default-100 rounded-2xl p-4 flex gap-4 items-start">
          <Image
            src={job.logoUrl}
            alt={job.company}
            height={50}
            width={50}
            className="w-12 h-12 rounded-xl object-contain bg-white p-1 shrink-0 border border-default-200"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-lg text-foreground truncate">{job.title}</h1>
            <p className="text-default-500 text-sm capitalize">{job.company} · {job.city}, {job.country}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <Chip size="sm" variant="flat" color="primary">{job.type}</Chip>
              {job.isRemote && <Chip size="sm" variant="flat" color="success">Remote</Chip>}
              <Chip size="sm" variant="flat" color="default">{salary} / yr</Chip>
              <Chip size="sm" variant="flat" color={daysLeft <= 7 ? "danger" : "warning"}>
                {daysLeft} days left
              </Chip>
            </div>
          </div>
        </div>

        {/* ── Step 1: Application Form ──────────────────────────────────────── */}
        {step === 1 && (
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

            {/* Personal Info */}
            <div className="space-y-4">
              <h2 className="text-xs font-semibold text-default-400 uppercase tracking-widest flex items-center gap-2">
                <Person className="w-4 h-4" /> Personal Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Full Name" icon={Person} required error={errors.fullName}>
                  <input
                    className={inputBase}
                    placeholder="Your full name"
                    value={form.fullName}
                    onChange={(e) => setField("fullName", e.target.value)}
                    onBlur={() => handleBlur("fullName")}
                  />
                </FormField>

                <FormField label="Email Address" icon={Envelope} required error={errors.email}>
                  <input
                    className={inputBase}
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                  />
                </FormField>

                <FormField
                  label="Phone Number"
                  icon={Handset}
                  error={errors.phone}
                  hint="Include country code, e.g. +8801XXXXXXXXX"
                >
                  <input
                    className={inputBase}
                    type="tel"
                    placeholder="+8801XXXXXXXXX"
                    value={form.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    onBlur={() => handleBlur("phone")}
                  />
                </FormField>

                <FormField label="Years of Experience" icon={Briefcase} required error={errors.yearsExp}>
                  <select
                    className={inputBase + " cursor-pointer"}
                    value={form.yearsExp}
                    onChange={(e) => setField("yearsExp", e.target.value)}
                    onBlur={() => handleBlur("yearsExp")}
                  >
                    <option value="">Select level</option>
                    <option value="0-1">0–1 year (Fresher)</option>
                    <option value="1-3">1–3 years (Junior)</option>
                    <option value="3-5">3–5 years (Mid-level)</option>
                    <option value="5-8">5–8 years (Senior)</option>
                    <option value="8+">8+ years (Lead / Principal)</option>
                  </select>
                </FormField>
              </div>
            </div>

            <Separator  />

            {/* Links */}
            <div className="space-y-4">
              <h2 className="text-xs font-semibold text-default-400 uppercase tracking-widest flex items-center gap-2">
                <Link className="w-4 h-4" /> Online Profiles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="LinkedIn Profile" icon={Link} error={errors.linkedIn}>
                  <input
                    className={inputBase}
                    placeholder="https://linkedin.com/in/yourname"
                    value={form.linkedIn}
                    onChange={(e) => setField("linkedIn", e.target.value)}
                    onBlur={() => handleBlur("linkedIn")}
                  />
                </FormField>

                <FormField label="Portfolio / Website" icon={Link} error={errors.portfolio}>
                  <input
                    className={inputBase}
                    placeholder="https://yourportfolio.com"
                    value={form.portfolio}
                    onChange={(e) => setField("portfolio", e.target.value)}
                    onBlur={() => handleBlur("portfolio")}
                  />
                </FormField>
              </div>
            </div>

            <Separator  />

          {/* Resume Upload */}
<div className="space-y-4">
  <h2 className="text-xs font-semibold text-default-400 uppercase tracking-widest flex items-center gap-2">
    <Paperclip className="w-4 h-4" /> Resume
  </h2>
  <FormField label="Upload Resume" required error={errors.resume}>
    <div
      onClick={() => fileRef.current?.click()}
      className={`
        flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border-2 border-dashed cursor-pointer
        transition-all duration-200
        ${form.resumeUrl
          ? "border-success/60 bg-success/5"
          : errors.resume
          ? "border-danger/50 bg-danger/5"
          : "border-default-300 bg-default-50 hover:border-primary/50 hover:bg-primary/5"
        }
      `}
    >
      {form.resumeUrl ? (
        <>
          <Check className="w-7 h-7 text-success" />
          <p className="text-sm font-medium text-success">{form.resumeName}</p>
          <p className="text-xs text-default-400">Click to replace</p>
        </>
      ) : uploading ? (
        <>
          <div className="w-7 h-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-default-600">Uploading...</p>
        </>
      ) : (
        <>
          <ArrowUpFromSquare className="w-7 h-7 text-default-400" />
          <p className="text-sm font-medium text-default-600">Click to upload or drag & drop</p>
          <p className="text-xs text-default-400">PDF or Word · Max 5 MB</p>
        </>
      )}
    </div>
    <input
      ref={fileRef}
      type="file"
      accept=".pdf,.doc,.docx"
      className="hidden"
      onChange={handleFile}
    />
  </FormField>
</div>

            <Separator  />

            {/* Cover Letter */}
            <div className="space-y-4">
              <h2 className="text-xs font-semibold text-default-400 uppercase tracking-widest flex items-center gap-2">
                <FileText className="w-4 h-4" /> Cover Letter
              </h2>
              <FormField
                label="Cover Letter"
                required
                error={errors.coverLetter}
                hint="Explain why you are the right fit for this role"
              >
                <div className="relative">
                  <textarea
                    className={inputBase + " resize-none min-h-[160px]"}
                    placeholder={`I am excited to apply for the ${job.title} position at ${job.company}. With my background in ${job.category}, I bring...`}
                    value={form.coverLetter}
                    onChange={(e) => setField("coverLetter", e.target.value)}
                    onBlur={() => handleBlur("coverLetter")}
                    maxLength={2000}
                  />
                  <span className="absolute bottom-3 right-3 text-xs text-default-400 pointer-events-none">
                    {form.coverLetter.length}/2000
                  </span>
                </div>
              </FormField>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <button
                type="button"
                role="checkbox"
                aria-checked={form.agreeTerms}
                onClick={() => {
                  setField("agreeTerms", !form.agreeTerms);
                  setErrors((p) => ({ ...p, agreeTerms: null }));
                }}
                className={`mt-0.5 w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-colors
                  ${form.agreeTerms ? "bg-primary border-primary"
                    : errors.agreeTerms ? "border-danger"
                    : "border-default-400"
                  }`}
              >
                {form.agreeTerms && <Check className="w-3 h-3 text-white" />}
              </button>
              <div>
                <p className="text-sm text-default-600">
                  I agree to HireLoop's{" "}
                  <span className="text-primary cursor-pointer hover:underline">Terms of Service</span> and{" "}
                  <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>.
                </p>
                {errors.agreeTerms && (
                  <p className="text-xs text-danger mt-0.5 flex items-center gap-1">
                    <CircleXmark className="w-3 h-3" /> {errors.agreeTerms}
                  </p>
                )}
              </div>
            </div>

            <Button
              color="primary"
              size="lg"
              className="w-full rounded-xl font-semibold"
              onPress={goReview}
            >
              Review Application →
            </Button>
          </form>
        )}

        {/* ── Step 2: Review ────────────────────────────────────────────────── */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold text-foreground">Review Your Application</h2>
              <p className="text-sm text-default-500">Please confirm your details before submitting</p>
            </div>

            {[
              {
                title: "Personal Information",
                icon: Person,
                rows: [
                  ["Full Name", form.fullName],
                  ["Email", form.email],
                  ["Phone", form.phone || "—"],
                  ["Experience", form.yearsExp || "—"],
                ],
              },
              {
                title: "Online Profiles",
                icon: Link,
                rows: [
                  ["LinkedIn", form.linkedIn || "—"],
                  ["Portfolio", form.portfolio || "—"],
                  ["Resume", form.resumeName || "—"],
                ],
              },
            ].map(({ title, icon: Icon, rows }) => (
              <div key={title} className="bg-default-100 rounded-2xl p-4 space-y-3">
                <h3 className="text-xs font-semibold text-default-500 uppercase tracking-wider flex items-center gap-2">
                  <Icon className="w-4 h-4" /> {title}
                </h3>
                <div className="space-y-2 divide-y divide-default-200">
                  {rows.map(([label, val]) => (
                    <div key={label} className="flex justify-between items-start gap-4 pt-2 first:pt-0 text-sm">
                      <span className="text-default-400 shrink-0">{label}</span>
                      <span className="text-foreground text-right break-all">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-default-100 rounded-2xl p-4 space-y-2">
              <h3 className="text-xs font-semibold text-default-500 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4" /> Cover Letter
              </h3>
              <p className="text-sm text-foreground leading-relaxed line-clamp-6">{form.coverLetter}</p>
            </div>

            <div className="flex gap-3">
              <Button variant="flat" size="lg" className="flex-1 rounded-xl" onPress={() => setStep(1)}>
                ← Edit
              </Button>
              <Button color="primary" size="lg" className="flex-1 rounded-xl font-semibold" onPress={submit}>
                <Check className="w-4 h-4" />
                Submit Application
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApply;
