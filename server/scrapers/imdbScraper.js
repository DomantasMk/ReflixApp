const puppeteer = require("puppeteer");
const IMDB_MovieList_URL = (startIndex) =>
  `https://www.imdb.com/search/title/?title_type=feature&view=simple&start=${startIndex}&ref_=adv_nxt`;
const IMDB_TvSeriesList_URL = (startIndex) =>
  `https://www.imdb.com/search/title/?title_type=tv_series&view=simple&start=${startIndex}&ref_=adv_nxt`;
/* Go to the IMDB Movie page and wait for it to load */
async function scrapePopularMovies(count) {
  /* Initiate the Puppeteer browser */
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  let movies = [];
  for (let i = 1; i < count; i += 50) {
    await page.goto(IMDB_TvSeriesList_URL(i), {
      waitUntil: "domcontentloaded",
    });
    const a_elems = await page.$$(
      "#main > div > div.lister.list.detail.sub-list > div > div > div.lister-item-content > div > div.col-title > span > span:nth-child(2) > a"
    );
    for (let y = 0; y < a_elems.length; y++) {
      const url = await page.evaluate((e) => e.href, a_elems[y]);
      let movieObject = await scrapeMovieLink(url, browser);
      if (movieObject) {
        movies.push(movieObject);
      }
    }
  }
  await browser.close();
  return movies;
}
async function scrapeMovieLink(url, browser) {
  /* Go to the IMDB Movie page and wait for it to load */
  const page2 = await browser.newPage();
  await page2.goto(url, { waitUntil: "networkidle2" });
  /* Run javascript inside of the page */
  let data;
  try {
    data = await page2.evaluate(() => {
      let title = document.querySelector('div[class="title_wrapper"] > h1')
        .innerText;
      let rating = document.querySelector('span[itemprop="ratingValue"]')
        .innerText;
      let ratingCount = document.querySelector('span[itemprop="ratingCount"]')
        .innerText;
      let genreWrap = document.querySelectorAll("#titleStoryLine > div");
      let genres = "";
      for (let i = 0; i < genreWrap.length; i++) {
        if (genreWrap[i].innerText.startsWith("Genres")) {
          genres = genreWrap[i].innerText;
          break;
        }
      }
      genres = genres.substr(7);
      genres = genres.replace(/\s/g, "");
      genres = genres.split("|");

      let poster_uri = document.querySelector(
        "#title-overview-widget > div.vital > div.slate_wrapper > div.poster > a > img"
      ).src;
      poster_uri = poster_uri.replace("182", "364");
      poster_uri = poster_uri.replace("182", "364");
      poster_uri = poster_uri.replace("268", "536");
      poster_uri = poster_uri.replace("268", "536");
      let length = document.querySelector(
        "#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper > div > time"
      ).innerText;
      length = length.trim();
      let description = document.querySelector(
        "#titleStoryLine > div:nth-child(3) > p > span"
      ).innerText;
      return {
        title,
        rating,
        ratingCount,
        genres,
        poster_uri,
        length,
        description,
      };
    });
    let movieTitleWithoutSpaces = data.title.replace(" ", "+");
    await page2.goto(
      `https://www.youtube.com/results?search_query=${movieTitleWithoutSpaces}+trailer`,
      { waitUntil: "networkidle2" }
    );
    let link = await page2.$("#thumbnail");
    link = await link.getProperty("href");
    link = await link.jsonValue();
    let trailerId = link.split("?v=")[1];
    data = { ...data, trailerId };
  } catch {
    data = null;
  }
  /*const relatedMovieDivs = await page2.$$(
    "#title_recs > div.rec_const_picker > div > div.rec_slide > div.rec_page.rec_selected > div > a > img"
  );
  let relatedMovies = [];
  for (let y = 0; y < relatedMovieDivs.length; y++) {
    let urlRelated = await page2.evaluate((e) => e.src, relatedMovieDivs[y]);
    urlRelated = urlRelated.replace("76", "364");
    urlRelated = urlRelated.replace("76", "364");
    urlRelated = urlRelated.replace("113", "536");
    urlRelated = urlRelated.replace("113", "536");
    const movie = {
      url: urlRelated,
      title: await page2.evaluate((e) => e.title, relatedMovieDivs[y]),
    };
    if (movie) {
      relatedMovies.push(movie);
    }
  }*/

  console.log(data);
  page2.close();
  return data;
}

exports.scrapePopularMovies = scrapePopularMovies;
