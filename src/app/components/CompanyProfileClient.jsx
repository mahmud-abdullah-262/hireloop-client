'use client';

import { useState } from 'react';
import { Avatar, Button, Card, Input, Separator } from '@heroui/react';
import { Briefcase, CircleCheck, Clock, Globe, MapPin, Hashtag } from '@gravity-ui/icons';
import { updateCompany } from '@/lib/actions/action';
import { useRouter } from 'next/navigation';


 const InfoRow = ({ icon: Icon, label, value, field, isLink, isEditing, formData, handleChange }) => (
    <div className="flex items-start gap-3 py-3">
      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 shrink-0 mt-0.5">
        <Icon className="text-white/50" width={18} height={18} />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span className="text-xs font-medium text-white/40 uppercase tracking-widest">{label}</span>
        {isEditing && field ? (
          <Input
            value={formData[field]}
            onChange={handleChange(field)}
            size="sm"
            variant="underlined"
            classNames={{
              input: 'text-sm text-white/90 font-medium',
              inputWrapper: 'border-white/20',
            }}
          />
        ) : isLink ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors truncate"
          >
            {value}
          </a>
        ) : (
          <span className="text-sm text-white/90 font-medium">{value}</span>
        )}
      </div>
    </div>
  );





const CompanyProfileClient = ({ company }) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: company.companyName,
    url: company.url,
    location: company.location,
    category: company.category,
  });





  
  const initials = formData.companyName
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

const handleSave = async () => {
  setLoading(true);
  try {
    await updateCompany(company._id, formData);
    setIsEditing(false);
     router.refresh();
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  const handleCancel = () => {
    // reset করে দেবে
    setFormData({
      companyName: company.companyName,
      url: company.url,
      location: company.location,
      category: company.category,
    });
    setIsEditing(false);
  };

  // Edit mode হলে Input, না হলে সাধারণ text
 

  return (
    <div className="w-full mx-auto px-4 py-8 space-y-6">

      {/* Header Card */}
      <Card className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 rounded-2xl">
        <div className="flex items-center gap-5">
          <Avatar>
            <Avatar.Image alt={formData.companyName} src={company.logoUrl} />
            <Avatar.Fallback>{initials}</Avatar.Fallback>
          </Avatar>
          <div className="flex gap-1.5 min-w-0 flex-wrap items-center">
            {isEditing ? (
              <Input
                value={formData.companyName}
                onChange={handleChange('companyName')}
                variant="underlined"
                classNames={{
                  input: 'text-2xl font-bold text-white',
                  inputWrapper: 'border-white/20',
                }}
              />
            ) : (
              <h1 className="text-2xl font-bold text-white leading-tight truncate">
                {formData.companyName}
              </h1>
            )}
            <div className="flex items-center gap-2 flex-wrap">
              {company.approved ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                  <CircleCheck width={12} height={12} />
                  Approved
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">
                  <Clock width={12} height={12} />
                  Pending Approval
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-white/50 border border-white/10">
                <Briefcase width={12} height={12} />
                {formData.category}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Details Card */}
      <Card className="bg-white/5 border border-white/10 backdrop-blur-sm px-6 py-2 rounded-2xl">
       <InfoRow
  icon={Globe}
  label="Website"
  value={formData.url}
  field="url"
  isLink={!isEditing}
  isEditing={isEditing}        
  formData={formData}         
  handleChange={handleChange} 
/>
        <Separator className="bg-white/5" />
        <InfoRow 
        icon={Briefcase} 
        label="Industry"   
        value={formData.category} 
        field="category" 
        isLink={!isEditing}
  isEditing={isEditing}        
  formData={formData}         
  handleChange={handleChange} 
        />
        <Separator className="bg-white/5" />
        <InfoRow 
        icon={MapPin}    
        label="Location"   
        value={formData.location} 
        field="location" 
        isLink={!isEditing}
  isEditing={isEditing}        
  formData={formData}         
  handleChange={handleChange} 
        
        />
        <Separator className="bg-white/5" />
        <InfoRow 
        icon={Hashtag}   
        label="Company ID" 
        value={company._id} 
        isLink={!isEditing}
  isEditing={isEditing}        
  formData={formData}         
  handleChange={handleChange} 
        
        />  {/* edit হবে না */}
      </Card>

      {/* Action Row */}
      <div className="flex gap-3">
        {isEditing ? (
          <>
            <Button
              isLoading={loading}
              onPress={handleSave}
              className="flex-1 bg-white text-black font-semibold h-11 rounded-xl hover:bg-white/90 transition-colors"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              variant="bordered"
              onPress={handleCancel}
              className="flex-1 border-white/15 text-white/70 h-11 rounded-xl hover:bg-white/5 hover:text-white transition-colors"
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              onPress={() => setIsEditing(true)}
              className="flex-1 bg-white text-black font-semibold h-11 rounded-xl hover:bg-white/90 transition-colors"
            >
              Edit Profile
            </Button>
            <Button
              variant="bordered"
              className="flex-1 border-white/15 text-white/70 h-11 rounded-xl hover:bg-white/5 hover:text-white transition-colors"
            >
              View Public Page
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default CompanyProfileClient;