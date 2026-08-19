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
  emailId: string;
  phoneNos: string[];
  socialMedia: SocialPlatform[];
}

export interface StaffMember {
  staffName: string;
  designation: string;
  photoUrl: string;
  contactInfo: ContactInfo;
}

export interface CommunityStruct {
  svgLink:string;
  id: string;
  message: string;
  groupName: string;
  profilePhoto: string,
  imageUrls: string[];
  groupContact: CommunityContact;
  staffInfo: StaffMember[];
}
