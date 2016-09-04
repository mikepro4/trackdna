import moment from 'moment'

export function formatTime(time) {
  const momentDuration = moment.duration(time, 'seconds')
  let durationZero = ''
  if(momentDuration.seconds()< 10) {
    durationZero = 0
  }
  const finalTime = (`${momentDuration.minutes()}:${durationZero}${momentDuration.seconds()}`)
  return finalTime
}
