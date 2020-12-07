const puppeteer = require('puppeteer')
const router = require('songs.js')

async function scrape(url){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)
    await page.setViewport({
        width: 1200,
        height: 800
    });


    //NEEDS TO BE FIXED TO GO UNTIL END. CURRENTLY STOPPING AFTER 5 ITERS
    var songs = []
    var a = 0
    while(a < 5){
        await autoScroll(page)
        a++
    }

    songs.push(await page.evaluate( async (arr) => {
        var fullInfoArray = []
        const songList = Array.from(document.querySelectorAll('article div.music-item'))
        for(var i = arr.length; i < songList.length; i++){
            var info = []
            var genreNodes = Array.from(songList[i].querySelectorAll('span.song-category'))
            var genres = []
            genreNodes.forEach(e => genres.push(e.innerText))
            info = {
                title: songList[i].querySelector('div.name a').innerText,
                genre: genres,
                tempo: null,
                length: songList[i].querySelector('p.duration').innerText,
                artist: songList[i].querySelector('div.namealbum a').innerText,
                credits: null,
                link: songList[i].querySelector('a.play-pause-btn p').getAttribute('data-href')
            }
            fullInfoArray.push(JSON.stringify(info))
        }
        return fullInfoArray
    }, songs))

    browser.close()

    // console.log(songs)
    return songs
}

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

async function addToDB(){
    var scrapedSongs = await scrape('https://artlist.io/')
    //For every song in the list, if it doesn't exist in the database, add it
    for(var i = 0; i < scrapedSongs.length; i++){
        router.post()
    }
}

addToDB()
//upload what has been scraped