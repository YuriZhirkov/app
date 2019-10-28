
import moment from 'moment'

// 获取昨天的开始结束时间
export function getYesterday(){
  let date = []
  date.push(moment().subtract('days',1).format('YYYY-MM-DD 00:00:00'))
  date.push(moment().subtract('days',1).format('YYYY-MM-DD 23:59:59'))
  return date
}
// 获取昨天的日期
export function getYesterdayYYMMDD(){
  let date = moment().subtract('days',1).format('YYYY-MM-DD')
  return date
}

// 获取当天的开始结束时间
export function getToday(){
  let date = []
  date.push(moment().format('YYYY-MM-DD 00:00:00'))
  date.push(moment().format('YYYY-MM-DD 23:59:59'))
  return date
}

// 获取今天的日期
export function getTodayYYMMDD(){
  let date = moment().format('YYYY-MM-DD')
  return date
}

// 获取最近2天的开始结束时间
export function getLast2Days(){
  let date = []
  date.push(moment().subtract('days',1).format('YYYY-MM-DD 00:00:00'))
  date.push(moment().format('YYYY-MM-DD 23:59:59'))
  return date
}

// 获取最近30天的开始结束日期
export function getLast30DaysYYMMDD(){
  let date = []
  date.push(moment().subtract('days',30).format('YYYY-MM-DD'))
  date.push(moment().format('YYYY-MM-DD'))
  return date
}

// 获取当前周的开始结束时间
export function getCurrWeekDaysYYMMDD(){
  let date = []
  let weekOfday = parseInt(moment().format('d'))// 计算今天是这周的第几天,默认周日为一周中的第一天
  let start = moment().subtract(weekOfday-1,'days').format('YYYY-MM-DD')// 周一日期
  let end = moment().add(7-weekOfday,'days').format('YYYY-MM-DD')// 周日日期
  date.push(start)
  date.push(end)
  return date
}
// 获取当前月的开始结束时间
export function getCurrMonthDaysYYMMDD(){
  let date = []
  let start = moment().add('month',0).format('YYYY-MM-01')// 周一日期
  let end = moment(start).add('month',1).add('days',-1).format('YYYY-MM-DD')// 周日日期
  date.push(start)
  date.push(end)
  return date
}

// 获取上个月的开始结束时间
export function getLastMonthDaysYYMMDD(){
  let date = []
  let start = moment().subtract('month',1).format('YYYY-MM-01')// 周一日期
  let end = moment(start).add('month',1).add('days',-1).format('YYYY-MM-DD')// 周日日期
  date.push(start)
  date.push(end)
  return date
}

export function convertDate(value){
  if(value){
    return moment(value).format('DD/HH:mm:ss')
  }
  return ''
}

export function convertDateYYYMMDD(value){
  if(value && value!='/'){
    return moment(value).format('YYYY-MM-DD')
  }
  return value
}

/* 根据月份获取开始结束时间 */
export function getMonthDaysYYMMDD(value){
  let date = []
  if(value){
    let dateTime = new Date(value);
    let year = dateTime.getFullYear()
    let month = dateTime.getMonth();
    let startDate = moment([year, month]);
    let start = startDate.format('YYYY-MM-DD')//开始日期
    let end = moment(start).endOf('month').format('YYYY-MM-DD')// 结束日期
    date.push(start)
    date.push(end)
    return date
  }
  return ['','']
}