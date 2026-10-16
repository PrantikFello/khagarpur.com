import { SocialPlatform } from "../socialMedia/socialMediaType";

export interface Contributor {
    name: String,
    role?: String | null,
    socialMedia?: SocialPlatform[] | null,
    phn?: String | null,
    picture: string;
}