const data = [
  {
    id: 0,
    title: '질문 제목 이걸 누르면 질문 페이지로 간다 ',
    votes: 20,
    answers: 5,
    content:
      '쉽게 코딩하는 법 좀 알려주라 챗GPT 내 일자리 뺏어가면 어떡하지 흑흑 무슨 말 하지 아무말이나 어쩌구 저쩌구 파란 하늘 파란 하늘 꿈에 드리운 푸른 언덕에 아기염소 여럿이 풀을 뜯고 놀아요 해처럼 밝은 얼굴로 빗방울이 뚝뚝뚝뚝 떨어지는 날에는 잔뜩 찌푸린 ',
    date: '2023-10-01',
    select: true,
    questioner: '박설화',
  },
  {
    id: 1,
    title:
      '불 꺼진 romantic, all my life 내 주위는 온통 lovely day 내 눈 속에 비친 arrow sign (Oh, why? Oh, why?) I’m feeling lonely (Lonely) 그만 힐끗대고 말해줘요 hold me (Hold me) 다시 crying in my room 숨기고 싶어 But still I want it more, more, more',
    votes: 30,
    answers: 0,
    content:
      'I gave a second chance to Cupid 널 믿은 내가 정말 stupid 보여줄게 숨겨왔던 love, is it real? Cupid is so dumb 또 꿈길을 걷는 every day 눈 뜨면 다시 또 flew away Waiting around is a waste 나 솔직히 지금이 편해 상상만큼 짜릿한 걸까 Now Im so lonely (Lonely) 매일 꿈속에서 연습했죠 kiss me (Kiss me) 다시 crying in my room 포기할까 봐 But still I want it more, more, more',
    date: '2023-05-05',
    select: false,
    questioner: '허상범',
  },
  {
    id: 2,
    title:
      'Uh 나를봐 나를봐 나를봐 날 바라봐 바라봐너를 본 내 마음속에 사랑이내 본능이 고백 빨리 하라 해',
    votes: 5,
    answers: 2,
    content:
      '네 주위를 둘러싼 수많은 경쟁자Yes Im a soldier for youSweet멘트 장전발사하기 전에 제군들 입 풀었나 (yes 완전)간장콩장콩장장 equals 간 콩장장(Yeah Im ready)아침이 깨는 소리 Morning 바람들은 makes harmony 저물어가는 달빛은 let it go (uh)여물어가는 romance 꿈꾸고 (good night) Hey baby its comin new day 새로운 느낌이야 이건 Hey 왜 이래 Its common lovesick 아무래도 이거는 이거는',
    date: '2023-03-01',
    select: false,
    questioner: '최예슬',
  },
  {
    id: 3,
    title: '오늘 아침에도 내가 뭘 했는지를 몰라',
    votes: 20,
    answers: 7,
    content:
      '아니 내게 아침이란 게 있나한 아마 12시쯤에 인났었지달력을 보니 오늘은 고백데이래난 친구에게 내 잘못을 고백해십이시간을 넘게 자도 일어나보면 졸려매일 똑같은 하루 이런 날 보면 질려걷는 게 귀찮아서 배로 누운 그대로여기저기 닦다 보니 안 해도 돼 걸레로청소말이야계란말이 하나 밥상에 올라가도이게 웬 떡이야그림의 떡이야',
    date: '2023-04-05',
    select: false,
    questioner: '우성일',
  },
  {
    id: 4,
    title:
      '건물 사이에 피어난 장미 제발 살아남아 줬으면 꺾이지 마 잘 자라줘 온몸을 덮고 있는 가시 얼마나 힘이 들었으면 견뎌내줘서 고마워',
    votes: 1,
    answers: 1,
    content:
      '예쁘지 않은 꽃은 다들 골라내고 잘라내 예쁘면 또 예쁜 대로꺾어 언젠가는 시들고 왜 내버려 두지를 못해 그냥 가던 길 좀 가어렵게 나왔잖아 악착같이 살잖아, hey나는 건물 사이에 피어난 장미 (Oh-oh, oh-oh) 삭막한 이 도시가 아름답게 물들 때까지 (Woah-oh-oh) 고갤 들고 버틸게 끝까지 (Oh-oh, oh-oh) 모두가 내 향길 맡고 취해 웃을 때까지 (웃을 때까지)  ',
    date: '2023-09-01',
    select: true,
    questioner: '김승철',
  },
  {
    id: 5,
    title: 'My mama told me Im alien',
    votes: 19,
    answers: 9,
    content:
      '사실 넌 저 먼 별나라에서 왔어You in that planet used to be a champion금메달까지 딴 일등 선수였어점점 잘나고 커진 널더 이상 담을 수 없었던 행성따뜻한 물에서 수영하는 걸좋아했던 널 내가 데려온 거야네게 특별한 힘이 있단 걸 알게 했으니난 약해지고 넌 점점 더 강해지겠지',
    date: '2023-07-01',
    select: false,
    questioner: '서지웅',
  },
  {
    id: 6,
    title:
      '나의 옛날 동네옛날 동네 반지하 빌라엔네 가족 오순 도순오순 도순 잘 살고 있었네 화장실 문 밑엔 쥐가 파놓은 구멍이 매일 밤 뒤척거리시던 아버지 No problem 난 아무것도 몰랐거든',
    votes: 78,
    answers: 61,
    content:
      '아직도 그때가 생생해 무서울게 없었던 어리기만 한 나를 펄쩍 뛰게 한 펄쩍 뛰게 한 펄쩍 뛰게 한 Dinosaur, dinosaur 어릴 적 내 꿈에 나온 dinosaur 어릴 적 내 꿈에 나온 dinosaur 비명과 함께 깼네 함께 깼네 네 가족이 다 같이 따스한 이부자리 이부자리 두 발로 걷어찼지',
    date: '2023-04-12',
    select: true,
    questioner: '봄봄',
  },
]

export default data
