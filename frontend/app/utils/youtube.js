export function checkVideoOwnership(artistName, video) {
  const artist = artistName.replace(/\s/g, '').toLowerCase();
  const channelName = video.snippet.channelTitle.replace(/\s/g, '').toLowerCase()

  return (artist === channelName)
}

export function checkVideoOfficial(video) {
  const channelName = video.snippet.channelTitle.replace(/\s/g, '').toLowerCase()
  return (channelName.indexOf('official') !== -1) || (channelName.indexOf('vevo') !== -1)
}

export function checkVideoNameMatch(trackName, video) {
  const track = trackName.replace(/\s/g, '').toLowerCase();
  const videoTitle = video.snippet.title.replace(/\s/g, '').toLowerCase()
  return (videoTitle.indexOf(track) !== -1)
}
