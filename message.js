// Vercel 서버리스 함수: GET /api/message?name=닉네임
// 응원 문장 15개 중 하나를 골라 이름과 함께 돌려준다.

const MESSAGES = [
  (who) => `${who}, 오늘 하루도 충분히 잘 해내고 있어요.`,
  (who) => `${who}의 작은 한 걸음이 큰 변화를 만들어요.`,
  (who) => `${who}, 지금 이 순간에도 성장하고 있어요.`,
  (who) => `힘들 땐 잠깐 쉬어도 괜찮아요, ${who}.`,
  (who) => `${who}의 노력은 반드시 빛을 볼 거예요.`,
  (who) => `${who}, 오늘은 어제보다 조금 더 나아졌어요.`,
  (who) => `완벽하지 않아도 괜찮아요, ${who}. 이미 충분히 멋져요.`,
  (who) => `${who}, 스스로를 믿어 주세요. 해낼 수 있어요.`,
  (who) => `${who}의 웃음이 누군가에게 힘이 되고 있어요.`,
  (who) => `천천히 가도 괜찮아요, ${who}. 멈추지만 않으면 돼요.`,
  (who) => `${who}, 오늘도 여기까지 온 자신을 칭찬해 주세요.`,
  (who) => `${who}의 하루에 기분 좋은 일이 찾아올 거예요.`,
  (who) => `어제의 걱정은 내려놓고, ${who}, 오늘을 즐겨요.`,
  (who) => `${who}, 당신은 생각보다 훨씬 강한 사람이에요.`,
  (who) => `${who}, 오늘도 응원할게요. 화이팅!`,
];

const MAX_NAME_LENGTH = 20;

module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'GET 요청만 지원합니다.' });
  }

  const raw = typeof req.query.name === 'string' ? req.query.name : '';
  const name = raw.trim().slice(0, MAX_NAME_LENGTH);
  const who = name ? `${name}님` : '여러분';

  const pick = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

  return res.status(200).json({ name: name || '여러분', message: pick(who) });
};
