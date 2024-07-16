export interface IUserInfomation {
    username?: string
    nickname?: string
    firstname?: string
    lastname?: string
    position?: string
    nationality?: string
    tel?: string
    startDate?: string
    profilePic?: string
    coverPic?: string
    contactInfo?: IContactInfo
    educationInfo?: IEducationInfo[],
    expirienceInfo?: IExperienceInfo[],
    skillInfo?: ISkillInfo[]
    interestInfo?: string[],
    guildInfo?: string[]
}

export interface IContactInfo {
    address?: string,
    subdistrict?: string,
    district?: string,
    province?: string
    postalCode?: string,
    facebook?: string,
    lineId?: string,
    instagram?: string
}

interface IEducationInfo { year?: number, university?: string }

interface IExperienceInfo { fromDate?: string, toDate?: string, experience?: string }

interface ISkillInfo { skill?: string, rate?: number }

