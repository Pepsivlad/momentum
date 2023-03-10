import playList from './playList.js';
addEventListener("DOMContentLoaded", () => {
  window.addEventListener('beforeunload', setLocalStorage);
  window.addEventListener('load', getLocalStorage);

  const time = document.querySelector('.time');
  const dateElem = document.querySelector('.date');
  const name = document.querySelector('.name');
  const greeting = document.querySelector('.greeting');
  const body = document.querySelector('body');
  const slideNext = document.querySelector('.slide-next');
  const slidePrev = document.querySelector('.slide-prev');
  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const weatherDescription = document.querySelector('.weather-description');
  const wind = document.querySelector('.wind');
  const humidity = document.querySelector('.humidity');
  const city = document.querySelector('.city');
  const weatherError = document.querySelector('.weather-error');
  const quote = document.querySelector('.quote');
  const author = document.querySelector('.author');
  const quoteChangeBtn = document.querySelector('.change-quote');
  const playBtn = document.querySelector('.play');
  const playPrevBtn = document.querySelector('.play-prev');
  const playNextBtn = document.querySelector('.play-next');
  const playListContainer = document.querySelector('.play-list');
  const playerTime = document.querySelector('.player-time');
  const timeline = document.querySelector('.timeline');
  const progressBar = document.querySelector('.progress');
  const volumeBtn = document.querySelector('.volume-button');
  const volumeEl = document.querySelector('.volume');
  const volumeSlider = document.querySelector('.volume-slider');
  const volumePercentage = document.querySelector('.volume-percentage');
  const engBtn = document.querySelector('.eng');
  const ruBtn = document.querySelector('.ru');
  const settingsBtn = document.querySelector('.settings');
  const popupBtn = document.querySelector('.popup');
  const popupHeaderText = document.querySelector('.popup-header-text');
  const settingsLanguageText = document.querySelector('.settings-language');
  const settingsBgSrcText = document.querySelector('.settings-bg-src');
  const settingsBgTagsText = document.querySelector('.settings-bg-tags');
  const settingsDisableBlocksText = document.querySelector('.settings-disable-blocks');
  const closeSettingsBtn = document.querySelector('.close-settings');
  const settingsBgSrcGithub = document.querySelector('.github');
  const settingsBgSrcUnsplash = document.querySelector('.unsplash');
  const settingsBgSrcFlickr = document.querySelector('.flickr');
  const settingsBgTags = document.querySelector('.tags-api');
  const settingsTagsError = document.querySelector('.tags-error');
  const settingsTime = document.querySelector('.settings-time');
  const settingsDate = document.querySelector('.settings-date');
  const settingsGreeting = document.querySelector('.settings-greeting');
  const settingsQuote = document.querySelector('.settings-quote');
  const settingsWeather = document.querySelector('.settings-weather');
  const settingsPlayer = document.querySelector('.settings-player');
  const settingsLinks = document.querySelector('.settings-links');
  const playerElem = document.querySelector('.player');
  const weatherElem = document.querySelector('.weather');
  const timeElem = document.querySelector('.time');
  const dateElemFull = document.querySelector('.date');
  const greetingElem = document.querySelector('.greeting-container');
  const quoteElem = document.querySelector('.quote-container');
  const linksBg = document.querySelector('.links-bg');
  const linksItemClone = document.querySelector('.links-item');
  const linksBtn = document.querySelector('.links-text');
  const linksListWindow = document.querySelector('.links-list-wrapper');
  const addNewLinkWindow = document.querySelector('.add-new-link');
  const newLinkConfirmBtn = document.querySelector('.confirm');
  const newLinkCancelBtn = document.querySelector('.cancel');
  const createNewLinkBtn = document.querySelector('.create-new-link');
  const createNewLinkText = document.querySelector('.new-link-text');
  const descriptionInput = document.querySelector('.link-description-input');
  const githubLink = document.querySelector('.github-link');
  const disableLinksBtn = document.querySelector('.links');
  const newLinkDescriptionText = document.querySelector('.new-link-description');
  const newLinkLinkText = document.querySelector('.new-link-link');
  const linkInput = document.querySelector('.link-link-input');
  const greetings = ['night', 'morning', 'afternoon', 'evening'];
  const audio = new Audio();
  audio.src = playList[0].src;
  let imgSrcNum = 0;
  let playListElems = [];
  let bgNum = getRandomNum(1, 20);
  let soundNum = 0;
  let lang = localStorage.getItem('lang') || 0;
  let isPlay = false;
  let disabledBlocksString = '';
  let linksArr = [];
  console.log('160/150');

  function checkDeleteLinkBtns() {
    const deleteLinkBtns = document.querySelectorAll('.delete-link');
    deleteLinkBtns.forEach(x => x.addEventListener('click', () => x.parentElement.remove()));
  }
  newLinkConfirmBtn.addEventListener('click', () => addLinkToArr());
  function addLinkToArr() {
    let linkToAdd = linkInput.value;
    if (linkToAdd) {
      if (!linkToAdd.includes('https://')) {
        linkToAdd = 'https://' + linkToAdd;
      }
    } else {
      linkToAdd = '#';
    }
    let newLinksItem = linksItemClone.cloneNode(true);
    newLinksItem.style.display = 'flex';
    newLinksItem.querySelector('.link-img').src = `https://icons.duckduckgo.com/ip2/${linkToAdd.replace('https://', '').replace(/\/.+/, '').trim()}.ico`;
    newLinksItem.querySelector('.links-link').href = linkToAdd;
    newLinksItem.querySelector('.links-link').textContent = descriptionInput.value || "New link";
    document.querySelector('.links-list').appendChild(newLinksItem);
    checkDeleteLinkBtns();
  }

  function createLinks() {
    linksArr.forEach(x => {
      let newLinksItem = linksItemClone.cloneNode(true);
      newLinksItem.style.display = 'flex';
      newLinksItem.querySelector('.link-img').src = `https://icons.duckduckgo.com/ip2/${x.link.replace('https://', '').replace(/\/.+/, '').trim()}.ico`;
      newLinksItem.querySelector('.links-link').href = x.link;
      newLinksItem.querySelector('.links-link').textContent = x.description;
      document.querySelector('.links-list').appendChild(newLinksItem);
    })
  }

  linksBtn.addEventListener('click', () => {
    linksBg.classList.replace('invisible', 'visible') || linksBg.classList.replace('visible', 'invisible');
  })
  createNewLinkBtn.addEventListener('click', () => {
    linksBg.classList.add('new');
    linksListWindow.style.display = 'none';
    addNewLinkWindow.style.display = 'block';
  })
  newLinkCancelBtn.addEventListener('click', () => {
    linksBg.classList.remove('new');
    linksListWindow.style.display = 'block';
    addNewLinkWindow.style.display = 'none';
  })
  newLinkConfirmBtn.addEventListener('click', () => {
    linksBg.classList.remove('new');
    linksListWindow.style.display = 'block';
    addNewLinkWindow.style.display = 'none';
  })

  function setSettingsText() {
    popupHeaderText.textContent = ['Settings', 'Настройки'][lang];
    settingsLanguageText.textContent = ['Language: ', 'Язык: '][lang]
    settingsBgSrcText.textContent = ['Background image source: ', 'Источник изображения для заднего фона: '][lang]
    settingsBgTagsText.textContent = ['Tags for API sources: ', 'Теги для API источников изображений: '][lang]
    settingsDisableBlocksText.textContent = ['Disable blocks: ', 'Выключить блоки: '][lang]
    const settingsArr = [settingsTime, settingsDate, settingsGreeting, settingsQuote, settingsWeather, settingsPlayer, settingsLinks];
    const settingsDisableBlocksRUArr = ['Время', 'Дата', 'Приветствие', 'Цитата', 'Погода', 'Аудиоплеер', 'Ссылки'];
    const settingsDisableBlocksENGArr = ['Time',  'Date',  'Greeting',  'Quote',  'Weather',  'Audio player',  'Links'];
    settingsArr.forEach((x, i) => x.textContent = [settingsDisableBlocksENGArr[i], settingsDisableBlocksRUArr[i]][lang]);
    newLinkConfirmBtn.textContent = ['Confirm', 'Подтвердить'][lang];
    newLinkCancelBtn.textContent = ['Cancel', 'Отменить'][lang];
    descriptionInput.placeholder = ['Anything', 'Что угодно'][lang];
    linksBtn.textContent = ['Links', 'Ссылки'][lang];
    createNewLinkText.textContent = ['Create new link', 'Создать новую ссылку'][lang];
    githubLink.textContent = ['My github', 'Мой гитхаб'][lang];
    newLinkDescriptionText.textContent = ['Description:', 'Описание:'][lang]
    newLinkLinkText.textContent = ['Link:', 'Ссылка:'][lang]
  }
  settingsBtn.addEventListener('click', () => popupBtn.style.display = 'block')
  closeSettingsBtn.addEventListener('click', () => popupBtn.style.display = 'none');

  function setLocalStorage() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
    localStorage.setItem('lang', lang);
    localStorage.setItem('bgSrc', imgSrcNum);
    localStorage.setItem('bgTags', settingsBgTags.value);
    localStorage.setItem('disabledBlocks', disabledBlocksString);
    localStorage.setItem('linksArr', JSON.stringify([...document.querySelectorAll('.links-item')].slice(3).map(x => {
      return {
        link: x.querySelector('.links-link').getAttribute('href'),
        description: x.querySelector('.links-link').childNodes[0].data
      }
    })))
  }

  function getLocalStorage() {
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    } else {
      name.placeholder = ["[Enter name]", "[Введите имя]"][lang];
    }
    if (localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
    } else {
      city.value = "Минск";
    }
    imgSrcNum = localStorage.getItem('bgSrc');
    settingsBgTags.value = localStorage.getItem('bgTags');
    if (localStorage.getItem('linksArr')) { 
      linksArr = JSON.parse(localStorage.getItem('linksArr'));
      createLinks();
      checkDeleteLinkBtns();
    };
    if (localStorage.getItem('disabledBlocks') == 'null') { disabledBlocksString = '' }
    else if (localStorage.getItem('disabledBlocks')) {
      disabledBlocksString = localStorage.getItem('disabledBlocks');
      disableDisabledBlocks(); 
    }
    getWeather();
    showTime();
    chooseBgSrc();
    setSettingsText();
  }

  function disableDisabledBlocks() {
    const settingsArr = [settingsTime, settingsDate, settingsGreeting, settingsQuote, settingsWeather, settingsPlayer, settingsLinks]
    const fullElemsArr = [timeElem, dateElemFull, greetingElem, quoteElem, weatherElem, playerElem, disableLinksBtn]
    disabledBlocksString.split('').forEach(x => {
      fullElemsArr[Number(x)].classList.add('hide-item');
      settingsArr[Number(x)].classList.add('active');
    });
  }

  function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
  }

  function showDate() {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString(['en-US', 'ru-RU'][lang], options);
    dateElem.textContent = currentDate;
  }

  function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    return Math.floor(hours / 6);
  }
  
  function showGreeting() {
    greeting.textContent = [`Good ${greetings[getTimeOfDay()]},`, ['Спокойной ночи,', 'Доброе утро,', 'Добрый день,', 'Добрый вечер,'][getTimeOfDay()]][lang];
  }

  function getRandomNum(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  function setBgGithub() {
    settingsBgSrcFlickr.classList.remove('active');
    settingsBgSrcUnsplash.classList.remove('active');
    settingsBgSrcGithub.classList.add('active');

    const img = new Image();
    const imgSrc = `https://raw.githubusercontent.com/shizopat/momentum-backgrounds/main/${greetings[getTimeOfDay()]}/${String(bgNum).padStart(2, '0')}.webp`;
    img.src = imgSrc;
    img.onload = () => {
      body.style.backgroundImage = `url('${imgSrc}')`;
    }; 
  }

  slidePrev.addEventListener('click', () => {
    bgNum -= 1;
    if (bgNum < 1) { bgNum = 20; }
    chooseBgSrc();
  })

  slideNext.addEventListener('click', () => {
    bgNum += 1;
    if (bgNum > 20) { bgNum = 1; }
    chooseBgSrc();
  })

  async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${['en', 'ru'][lang]}&appid=112eb1e4a60b49c305414fa8c9f440fa&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === '404' || data.cod === '400') {
      weatherError.textContent = [`Error! City not found for "${city.value}"!`, `Ошибка! Не найден город с названием "${city.value}"!`][lang];
      weatherIcon.className = 'weather-icon owf';
      temperature.textContent = '';
      weatherDescription.textContent = '';
      wind.textContent = '';
      humidity.textContent = '';
    } else {
      weatherError.textContent = '';
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      weatherError.textContent = '';
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      wind.textContent = [`Wind speed: ${Math.round(data.wind.speed)} m/s`, `Скорость ветра: ${Math.round(data.wind.speed)} м/с`][lang]
      humidity.textContent = [`Humidity: ${data.main.humidity}%`, `Влажность: ${data.main.humidity}%`][lang];
    }
  }

  city.addEventListener("change", () => {
    getWeather();
  })

  async function getQuotes() {  
    const quotes = ['./js/dataEng.json', './js/dataRu.json'][lang];
    const res = await fetch(quotes);
    const data = await res.json();

    const randomNum = getRandomNum(0, 90);
    quote.textContent = data[randomNum].quote;
    author.textContent = data[randomNum].author;
  }
  getQuotes();

  quoteChangeBtn.addEventListener("click", () => {
    getQuotes();
  })

  function playAudio() {
    if (isPlay) {
      audio.pause();
      isPlay = false;
      changeAudioBtn();
    } else {
      audio.play(); 
      isPlay = true;
      changeAudioBtn();
    }
  }

  function playNext() {
    playListElems[soundNum].classList.remove('item-active');
    soundNum = (soundNum + 1) % 4;
    playListElems[soundNum].classList.add('item-active');
    audio.src = playList[soundNum].src;
    isPlay = false;
    playAudio();
  }

  function playPrev() {
    playListElems[soundNum].classList.remove('item-active');
    soundNum -= 1;
    if (soundNum < 0) { soundNum = 3; }
    playListElems[soundNum].classList.add('item-active');
    audio.src = playList[soundNum].src;
    isPlay = false;
    playAudio();
  }

  function changeAudioBtn() {
    if (isPlay) {
      playBtn.classList.add('pause');
    } else {
      playBtn.classList.remove('pause');
    }
  }

  function createPlayList() {
    playList.forEach((el, i) => {
      const li = document.createElement('li');
      playListElems.push(li);
      li.classList.add('play-item');
      li.textContent = el.title;
      playListContainer.append(li);
      li.addEventListener('click', () => {
        audio.src = playList[i].src;
        playListElems[soundNum].classList.remove('item-active');
        soundNum = i;
        playListElems[soundNum].classList.add('item-active');
        isPlay = false;
        playAudio();
      })
    });
    playListElems[soundNum].classList.add('item-active');
  }
  createPlayList();

  setInterval(() => {
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
    playerTime.textContent = `${getTimeCodeFromNum(audio.currentTime)} / ${getTimeCodeFromNum(audio.duration)}`;
  }, 500);

  function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0) { return `${minutes}:${String(seconds % 60).padStart(2, 0)}` };
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  }

  timeline.addEventListener("click", e => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
  });

  volumeSlider.addEventListener('click', e => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    volumePercentage.style.width = newVolume * 100 + '%';
  })

  volumeBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    volumeEl.classList.replace("icono-volumeMedium", "icono-volumeMute") || volumeEl.classList.replace("icono-volumeMute", "icono-volumeMedium");
  });

  async function setBgUnsplash() {
    const url = `https://api.unsplash.com/photos/random?query=${settingsBgTags.value || greetings[getTimeOfDay()]}&client_id=panc2wa_5Yd8Y7HJGO0UopDYSmDhokxx6XnlxJJ1aWU`;
    const res = await fetch(url);
    const data = await res.json();

    settingsBgSrcFlickr.classList.remove('active');
    settingsBgSrcUnsplash.classList.add('active');
    settingsBgSrcGithub.classList.remove('active');

    if (data.urls) {
      const imgSrc = data.urls.regular;
      const img = new Image();
      img.src = imgSrc;
      img.onload = () => {
        body.style.backgroundImage = `url('${imgSrc}')`;
      }; 
    } else {
      settingsTagsError.textContent = 'No photos found! Using Github instead.';
      imgSrcNum = 0;
      setBgGithub();
    }
  }

  async function setBgFlickr() {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1e63bd85c54e17f503245e3f5214560e&tags=${settingsBgTags.value || greetings[getTimeOfDay()]}&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();

    settingsBgSrcFlickr.classList.add('active');
    settingsBgSrcUnsplash.classList.remove('active');
    settingsBgSrcGithub.classList.remove('active');

    const photoArr = data.photos.photo;
    const photoArrLen = photoArr.length;
    if (photoArrLen) {
      settingsTagsError.textContent = '';
      const imgSrc = photoArr[getRandomNum(0, photoArrLen - 1)].url_l;
      const img = new Image();
      img.src = imgSrc;
      img.onload = () => {
        body.style.backgroundImage = `url('${imgSrc}')`;
      };
    } else {
      settingsTagsError.textContent = 'No photos found! Using Github instead.';
      imgSrcNum = 0;
      setBgGithub();
    }
  }

  function chooseBgSrc() {
    if (imgSrcNum == 0) { setBgGithub() }
    else if (imgSrcNum == 1) { setBgUnsplash() }
    else { setBgFlickr() }
  }

  function changeLanguage() {
    getWeather();
    getQuotes();
    setSettingsText();
    name.placeholder = ['[Enter name]','[Введите имя]'][lang];
  }

  playBtn.addEventListener('click', () => playAudio());
  playPrevBtn.addEventListener('click', () => playPrev());
  playNextBtn.addEventListener('click', () => playNext());
  audio.addEventListener('ended', () => playNext());
  engBtn.addEventListener('click', () => { 
    lang = 0;
    changeLanguage();
  });
  ruBtn.addEventListener('click', () => {
    lang = 1;
    changeLanguage();
  });
  settingsBgSrcGithub.addEventListener('click', () => { 
    imgSrcNum = 0;
    setBgGithub();
  });
  settingsBgSrcUnsplash.addEventListener('click', () => { 
    imgSrcNum = 1;
    setBgUnsplash();
  });
  settingsBgSrcFlickr.addEventListener('click', () => { 
    imgSrcNum = 2;
    setBgFlickr();
  });
  settingsBgTags.addEventListener('change', () => { chooseBgSrc(); })

  function hideElement(settingsElem, elemToHide, num) {
    if (disabledBlocksString.includes(num)) {
      disabledBlocksString = disabledBlocksString.replace(num, '');
      elemToHide.classList.remove('hide-item');
      settingsElem.classList.remove('active')
    }
    else {
      disabledBlocksString += num;
      elemToHide.classList.add('hide-item');
      settingsElem.classList.add('active')
    }    
  }

  settingsTime.addEventListener('click', () => { hideElement(settingsTime, timeElem, '0') })
  settingsDate.addEventListener('click', () => { hideElement(settingsDate, dateElemFull, '1') })
  settingsGreeting.addEventListener('click', () => { hideElement(settingsGreeting, greetingElem, '2') })
  settingsQuote.addEventListener('click', () => { hideElement(settingsQuote, quoteElem, '3') })
  settingsWeather.addEventListener('click', () => { hideElement(settingsWeather, weatherElem, '4') })
  settingsPlayer.addEventListener('click', () => { hideElement(settingsPlayer, playerElem, '5') })
  settingsLinks.addEventListener('click', () => { hideElement(settingsLinks, disableLinksBtn, '6') })
});
