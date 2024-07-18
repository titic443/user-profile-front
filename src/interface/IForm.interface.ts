export interface IUserInfomation {
    username?: string
    nickname?: string
    firstname?: string
    lastname?: string
    position?: string
    nationality?: string
    tel?: string
    startDate?: string
    profilePic?: any
    coverPic?: any
    contactInfo?: IContactInfo
    educationInfo?: IEducationInfo[]
    experienceInfo?: IExperienceInfo[]
    skillInfo?: ISkillInfo[]
    interestInfo?: string[]
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

export interface IEducationInfo { year?: string, university?: string }

export interface IExperienceInfo { fromDate?: string, toDate?: string, experience?: string }

export interface ISkillInfo { skill?: string, rate?: number }

