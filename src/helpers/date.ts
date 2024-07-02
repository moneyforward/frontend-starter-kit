import dayjs from 'dayjs'

import { DATE_FORMAT, DAY_MONTH_FORMAT, NEW_YEAR_DATES, SATURDAY, SUNDAY, WEEKEND } from '@/constants/date'

export function checkSpecialDate(date: dayjs.Dayjs) {
  const { isNewYear, isWeekend } = checkDate(date)
  return isNewYear || isWeekend
}

export function checkDate(currentDate: dayjs.Dayjs) {
  const todayDate = dayjs()

  // check new year date
  const isNewYear = NEW_YEAR_DATES.includes(currentDate.format(DAY_MONTH_FORMAT))

  // 0 is Sunday, 6 is Saturday, based on dayjs day() api
  const isWeekend = WEEKEND.includes(currentDate.day())
  const isSaturday = currentDate.day() === SATURDAY
  const isSunday = currentDate.day() === SUNDAY

  // limited up to 3 months from today
  const limitedDate = todayDate.startOf('day').add(3, 'months')
  const isLimitedBy3MonthFromToday = currentDate.isAfter(limitedDate)

  // past date
  const isPastDate = currentDate.isBefore(todayDate.startOf('day'))

  return {
    isNewYear,
    isSaturday,
    isSunday,
    isWeekend,
    isLimitedBy3MonthFromToday,
    isPastDate
  }
}

export function isValidDate(currentDate: dayjs.Dayjs, extraDisabledDates?: string[]) {
  const { isNewYear, isWeekend, isPastDate, isLimitedBy3MonthFromToday } = checkDate(currentDate)

  // Extra disabled dates
  const isExtraDisabledDate = extraDisabledDates?.includes(currentDate.format(DATE_FORMAT)) || false

  return isNewYear || isWeekend || isPastDate || isLimitedBy3MonthFromToday || isExtraDisabledDate
}

export function isPastTime(currentTime: dayjs.Dayjs) {
  const todayDate = dayjs.tz()

  const isPastTime = currentTime.isBefore(todayDate)

  return isPastTime
}
