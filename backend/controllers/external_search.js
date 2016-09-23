import axios from 'axios';
import OAuth from 'oauth-1.0a'
import ytdl from 'ytdl-core'
import exec from 'child_process';
import fs from 'fs';

const YOUTUBE_API_KEY = 'AIzaSyDQ_kgowJCa-mH5wnjnQ1mOE4nBqQIGij8'
const oauth = OAuth({
    consumer: {
        public: 'ac24c59a7d307088bde16c1954710b3a1be86959',
        secret: 'c517c8175fc5bbfb50adb202ebad7db8c014fcae'
    },
    signature_method: 'HMAC-SHA1'
});
const token = {
    public: '44544de2454973ae18248c12ae5ad70093c03158',
    secret: 'b7728c4a3cd249b170fb43e285875d98226f1792'
};
const youtubeDefaultResultsLimit = 10;
const beatportDefaultResultsLimit = 10;

export function searchYoutube(req, res, next) {
  var searchTerm = req.body.searchTerm;
  var resultsLimit = req.body.resultsLimit != undefined ?
    req.body.resultsLimit : youtubeDefaultResultsLimit;
  console.log('search youtube for: ', searchTerm);
  const searchTermEncoded = encodeURIComponent(searchTerm);
  return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${YOUTUBE_API_KEY}&q=${searchTermEncoded}&type=video&maxResults=${resultsLimit}`)
    .then(function (response) {
        res.json({ data: response.data.items });
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function loadYoutubeVideoData(req, res, next) {
  var videoId = req.params.id;
  console.log('load youtube data: ', videoId)
  return axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`)
    .then(function (response) {
         res.json({ data: response.data.items[0]})
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function loadYoutubeWave(req, res, next) {
  var videoId = req.params.id;
  console.log('load youtube wave: ', videoId);
  var url = `http://www.youtube.com/watch?v=${videoId}`;
  var base = __dirname + "/../../frontend/static";
  var flvFile = `${base}/flv/video_${videoId}.flv`;
  var pngFile = `${base}/wave/wave_${videoId}.png`;
  if (fs.existsSync(pngFile)) {
    console.log(`Wave already there: ${pngFile}`);
    res.json({ waveUrl: `/wave/wave_${videoId}.png` });
    return;
  }

  var stream = ytdl(url);
  stream.on('end', function () {
    console.log(`Download completed: flv ${videoId}`);
    // the next command is for older version of mmpeg installed on DO
    // exec.exec(`ffmpeg -i ${flvFile} -lavfi showwavespic=split_channels=0:s=1024x800 ${pngFile}`);

    var command = 'ffmpeg -i ' + flvFile + ' -filter_complex "[0:a]aformat=channel_layouts=mono, \
    compand=gain=-1, showwavespic=s=1850x250:colorkey=#ffffff:colors=#555555[fg]; color=s=1850x250:color=#ffffff@0.1[bg]; \
    [bg][fg]overlay=format=rgb" -vframes 1' + pngFile

     console.log(command);
     exec.exec(command);
     res.json({ waveUrl: `/wave/wave_${videoId}.png` });
  });
  stream.pipe(fs.createWriteStream(flvFile));
}

export function searchBeatport(req, res, next) {
  var searchTerm = req.body.searchTerm;
  var resultsLimit = req.body.resultsLimit != undefined ?
    req.body.resultsLimit : beatportDefaultResultsLimit;
  console.log('search beatport for: ', searchTerm);
  const searchTermEncoded = encodeURIComponent(searchTerm);
  const url = `https://oauth-api.beatport.com/catalog/3/search/?query=${searchTermEncoded}&perPage=${resultsLimit}`;
  const request_data = {
    url: url,
    method: 'GET'
  };

  return axios.get(url, {
    headers: oauth.toHeader(oauth.authorize(request_data, token))
  })
  .then(function (response) {
    res.json({ data: response.data.results });
  })
  .catch(function (error) {
    console.log(error);
  });
}
