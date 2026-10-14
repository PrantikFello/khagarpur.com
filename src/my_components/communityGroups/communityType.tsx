import { SocialPlatform } from "../socialMedia/socialMediaType";


export interface CommunityContact {
  emailId?: string;
  quickDials?: QuickDials[];
  address?: string;
  socialMedia?: SocialPlatform[]; 
  officeHours: string,
}

export interface QuickDials{
  serviceName: string;
  phoneNo: string;
}

export interface ContactInfo {
  emailId?: string | null;
  phoneNos: string[];
  socialMedia?: SocialPlatform[] | null;
}

export interface StaffMember {
  staffName: string;
  designation?: string | null;
  photoUrl: string;
  contactInfo: ContactInfo;
}

export interface CommunityStruct {
  svgLink:string;
  id: string;
  message?: string | null;
  groupName: string;
  profilePhoto: string,
  imageUrls: string[];
  groupContact: CommunityContact;
  staffInfo?: StaffMember[] | null;
}
