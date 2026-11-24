const PHOTOS_COUNT = 25;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_MAX = 30;
const AVATARS_COUNT = 6;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Артём',
  'Ольга',
  'Александр',
  'Мария',
  'Дмитрий',
  'Екатерина',
  'Иван',
  'Анна',
];

const DESCRIPTIONS = [
  'Замечательный летний день.',
  'Ловим тёплые моменты.',
  'Прекрасный вид из окна.',
  'Наконец-то долгожданный отдых!',
  'Красота вокруг нас.',
  'Вдохновение в каждом кадре.',
];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

let commentId = 1;

const createMessage = () => {
  const count = getRandomInteger(1, 2);
  if (count === 1) {
    return getRandomArrayElement(MESSAGES);
  }
  const first = getRandomArrayElement(MESSAGES);
  let second = getRandomArrayElement(MESSAGES);
  while (second === first) {
    second = getRandomArrayElement(MESSAGES);
  }
  return `${first} ${second}`;
};

const createComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomInteger(1, AVATARS_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),

});

const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
  comments: Array.from({ length: getRandomInteger(0, COMMENTS_MAX) }, createComment),
});

const createPhotos = () => Array.from({ length: PHOTOS_COUNT }, (_, index) => createPhoto(index + 1));

createPhotos();
