import { Avatar, Badge, Button, Card, Separator } from '@heroui/react';
import {Briefcase, CircleCheck, Clock, Globe, MapPin, Hashtag} from '@gravity-ui/icons';
import React from 'react';

const CompanyProfile = ({company}) => {
    const initials = company.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

    const InfoRow = ({ icon: Icon, label, value, isLink }) => (
  <div className="flex items-start gap-3 py-3">
    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 shrink-0 mt-0.5">
      <Icon className="text-white/50" width={18} height={18} />
    </div>
    <div className="flex flex-col gap-0.5 min-w-0">
      <span className="text-xs font-medium text-white/40 uppercase tracking-widest">{label}</span>
      {isLink ? (
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


  return (
    <div className="w-full mx-auto px-4 py-8 space-y-6 ">

      {/* Header Card */}
      <Card className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 rounded-2xl">
        <div className="flex items-center gap-5">
         <Avatar>
        <Avatar.Image alt="John Doe" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3" />
        <Avatar.Fallback>{initials}</Avatar.Fallback>
      </Avatar>
          <div className="flex gap-1.5 min-w-0">
            <h1 className="text-2xl font-bold text-white leading-tight truncate">
              {company.name}
            </h1>
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
                {company.industry}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Details Card */}
      <Card className="bg-white/5 border border-white/10 backdrop-blur-sm px-6 py-2 rounded-2xl">
        <InfoRow icon={Globe} label="Website" value={company.website} isLink />
        <Separator className="bg-white/5" />
        <InfoRow icon={Briefcase} label="Industry" value={company.industry} />
        <Separator className="bg-white/5" />
        <InfoRow icon={MapPin} label="Location" value={company.location} />
        <Separator className="bg-white/5" />
        <InfoRow icon={Hashtag} label="Company ID" value={company.companyId} />
      </Card>

      {/* Action Row */}
      <div className="flex gap-3">
        <Button
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
      </div>
    </div>
  );
};

export default CompanyProfile;



