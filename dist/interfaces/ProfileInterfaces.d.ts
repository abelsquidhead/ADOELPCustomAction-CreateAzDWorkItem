export interface AttributeDescriptor {
    attributeName: string;
    containerName: string;
}
export interface AttributesContainer {
    attributes: {
        [key: string]: ProfileAttribute;
    };
    containerName: string;
    revision: number;
}
export interface Avatar {
    isAutoGenerated: boolean;
    size: AvatarSize;
    timeStamp: Date;
    value: number[];
}
export declare enum AvatarSize {
    Small = 0,
    Medium = 1,
    Large = 2
}
export interface CoreProfileAttribute extends ProfileAttributeBase<any> {
}
export interface Country {
    code: string;
    englishName: string;
}
export interface CreateProfileContext {
    cIData: {
        [key: string]: any;
    };
    contactWithOffers: boolean;
    countryName: string;
    displayName: string;
    emailAddress: string;
    hasAccount: boolean;
    language: string;
    phoneNumber: string;
}
export interface GeoRegion {
    regionCode: string;
}
export interface Profile {
    applicationContainer: AttributesContainer;
    coreAttributes: {
        [key: string]: CoreProfileAttribute;
    };
    coreRevision: number;
    id: string;
    revision: number;
    timeStamp: Date;
}
export interface ProfileAttribute extends ProfileAttributeBase<string> {
}
export interface ProfileAttributeBase<T> {
    descriptor: AttributeDescriptor;
    revision: number;
    timeStamp: Date;
    value: T;
}
/**
 * Country/region information
 */
export interface ProfileRegion {
    /**
     * The two-letter code defined in ISO 3166 for the country/region.
     */
    code: string;
    /**
     * Localized country/region name
     */
    name: string;
}
/**
 * Container of country/region information
 */
export interface ProfileRegions {
    /**
     * List of country/region code with contact consent requirement type of notice
     */
    noticeContactConsentRequirementRegions: string[];
    /**
     * List of country/region code with contact consent requirement type of opt-out
     */
    optOutContactConsentRequirementRegions: string[];
    /**
     * List of country/regions
     */
    regions: ProfileRegion[];
}
export declare var TypeInfo: {
    AttributeDescriptor: {
        fields: any;
    };
    AttributesContainer: {
        fields: any;
    };
    Avatar: {
        fields: any;
    };
    AvatarSize: {
        enumValues: {
            "small": number;
            "medium": number;
            "large": number;
        };
    };
    CoreProfileAttribute: {
        fields: any;
    };
    Country: {
        fields: any;
    };
    CreateProfileContext: {
        fields: any;
    };
    GeoRegion: {
        fields: any;
    };
    Profile: {
        fields: any;
    };
    ProfileAttribute: {
        fields: any;
    };
    ProfileAttributeBase: {
        fields: any;
    };
    ProfileRegion: {
        fields: any;
    };
    ProfileRegions: {
        fields: any;
    };
};
