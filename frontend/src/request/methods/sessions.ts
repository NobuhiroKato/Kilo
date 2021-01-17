import { fetchApp, NetworkError } from 'request/fetcher';
import history from 'RouterHistory';

// GET /v1/me
export const getMe = async () => {
  const accessToken = localStorage.getItem('kiloToken');

  if (!accessToken) {
    return null;
  }

  const res = await fetchApp(
    '/v1/me',
    'GET',
    accessToken
  )

  if (res instanceof NetworkError) {
    console.log('ServerError')
    return null;
  }

  if (res.ok) {
    const json = await res.json();
    return json;
  } else {
    return null;
  }
};

// POST /v1/login
export const login = async (email: string, password: string, setErrorMessage: Function, setButtonDisabled: Function, snackBar: Function) => {
  const res = await fetchApp(
    '/v1/login',
    'POST',
    '',
    JSON.stringify({
      email: email,
      password: password
    })
  )
  if (res instanceof NetworkError) {
    setErrorMessage('予期せぬエラーが発生しました。時間をおいて再度お試しください。');
    setButtonDisabled(false);
    return
  }

  switch (res.status) {
    case 400:
      setErrorMessage('入力された情報の組み合わせが正しくありません。');
      setButtonDisabled(false);
      break;
    case 401:
      setErrorMessage('メールアドレスの本人確認が必要です。');
      setButtonDisabled(false);
      break;
    case 200:
      const json = await res.json();
      // TODO: rememberMe を有効にするにはアンコメント
      // if (rememberMe === true) {
      //   localStorage.setItem('kiloToken', json.access_token);
      // } else {
      //   localStorage.removeItem('kiloToken');
      // }
      localStorage.setItem('kiloToken', json.access_token);
      // トップページへ移動
      history.push('/schedule');
      snackBar('ログインしました。', { variant: 'info' })
      break;
    default:
      setErrorMessage('予期せぬエラーが発生しました。時間をおいて再度お試しください。');
      setButtonDisabled(false);
  }
};

// GET /v1/roles
export  const getRoles = async () => {
  const accessToken = localStorage.getItem('kiloToken');
  if (!accessToken) {
    return;
  }

  const res = await fetchApp(
    '/v1/roles',
    'GET',
    accessToken,
  )

  if (res instanceof NetworkError) {
    console.log("ServerError");
    return;
  }

  if (res.ok) {
    const json = await res.json();
    return json;
  } else {
    return;
  }
};