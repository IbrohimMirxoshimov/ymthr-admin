import Axios from 'axios';

const EMAIL = process.env.ESKIZ_EMAIL!;
const PASSWORD = process.env.ESKIZ_PASSWORD!;
const ALFA_NAME = '4546';
const ESKIZ_BASE = 'https://notify.eskiz.uz';
const SMS_GETAWAY_URL = `${ESKIZ_BASE}/api/message/sms/send`;
const SMS_AUTH_URL = `${ESKIZ_BASE}/api/auth/login`;

interface EskizAuthResponseData {
  token: string;
}

interface EskizAuthResponse {
  message: string;
  data: EskizAuthResponseData;
  token_type: string;
}

const authEskiz = async (
  email: string,
  password: string,
): Promise<EskizAuthResponse> => {
  return await Axios.post(
    SMS_AUTH_URL,
    {
      email: email,
      password: password,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  ).then((r) => r.data);
};

export async function sendSms(phone_number: string, message: string) {
  const auth = await authEskiz(EMAIL, PASSWORD);
  return await Axios.post(
    SMS_GETAWAY_URL,
    {
      mobile_phone: phone_number,
      message: message,
      from: ALFA_NAME,
    },
    {
      headers: {
        Authorization: `Bearer ${auth.data.token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  ).catch((err) => {
    console.error('sendSms', err.response.data);
    throw new Error('err');
  });
}

export async function sendVerificationCode(phone_number: string, code: number) {
  const template = `Bookhotel.uz\nTasdiqlash kodi: ${code}`;
  return sendSms(phone_number.replace('+', ''), template);
}
