import {getCookie} from "@/utils/cookies.ts";

export type TUserDto = {
  name: string
  email: string
  id: number
  uuid: string
  registration_date: string
}

export type TUser = Omit<TUserDto, 'registration_date'> & {
  registrationDate: string
}

export type TSpendingCreateDto = {
  group_id: number
  who_bought_id: number
  whom_bought_id: number
  sum: number
  comment: string
  calculation_breakdown: string
}

export type TSpendingDto = TSpendingCreateDto & {
  id: number
  who_bought: TUserDto,
  whom_bought: TUserDto
  created_at: string
}

export type TSpending = Omit<TSpendingDto, 'group_id' | 'who_bought_id' | 'whom_bought_id' | 'calculation_breakdown' | 'who_bought' | 'whom_bought' | 'created_at'> & {
  groupId: number
  whoBoughtId: number
  whomBoughtId: number
  calculationBreakdown: string
  who: TUser
  whom: TUser
  createdAt: string
}

export type TSpendingGroupDto = {
  slug: string
  name: string
  creator_id: number
  id: number
  created_at: string
  creator: TUserDto
  users: TUserDto[]
}

export type TSpendingGroup = Omit<TSpendingGroupDto, 'creator_id' | 'created_at' | 'users' | 'creator' | 'spendings'> & {
  creatorId: number
  createdAt: string
  creator: TUser
  users: TUser[]
}

const parseUserFromDto = (user: TUserDto): TUser => {
  return {
    ...user,
    registrationDate: user.registration_date
  }
}

const parseSpendingFromDto = (spending: TSpendingDto): TSpending => {
  return {
    ...spending,
    groupId: spending.group_id,
    createdAt: spending.created_at,
    who: parseUserFromDto(spending.who_bought),
    whom: parseUserFromDto(spending.whom_bought),
    whoBoughtId: spending.who_bought_id,
    whomBoughtId: spending.whom_bought_id,
    calculationBreakdown: spending.calculation_breakdown
  }
}

const parseSpendingGroupFromDto = (spendingGroup: TSpendingGroupDto): TSpendingGroup => {
  return {
    ...spendingGroup,
    creatorId: spendingGroup.creator_id,
    createdAt: spendingGroup.created_at,
    creator: parseUserFromDto(spendingGroup.creator),
    users: spendingGroup.users.map(u => parseUserFromDto(u)),
  }
}

export const useSpendingsApi = () => {
  const apiUrl = import.meta.env.VITE_API_URL

  async function getSpendingsGroup(slug: string) {
    const res = await fetch(apiUrl + `/group/${slug}`, {
      headers: {
        'Authorization': `Bearer ${getCookie('token')}`
      }
    });

    const data = await res.json()
    return parseSpendingGroupFromDto(data)
  }

  async function getSpendings(slug: string) {
    const res = await fetch(apiUrl + `/spendings/${slug}`, {
      headers: {
        'Authorization': `Bearer ${getCookie('token')}`
      }
    });

    const data = await res.json()
    return data.map((s: TSpendingDto) => parseSpendingFromDto(s))
  }

  async function addSpending(spending: TSpendingCreateDto) {
    console.log({spending})
    const res = await fetch(apiUrl + `/spendings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getCookie('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(spending)
    });

    return await res.json()
  }

  return { getSpendingsGroup, getSpendings, addSpending }
}
