const errorsCode = {
  EMAIL_NOT_FOUND: 'Пользователя с таким email не существует',
  INVALID_PASSWORD: 'Введен не верный пароль',
  USER_DISABLED: 'Учетная запись пользователя отключена администратором',
  INVALID_ID_TOKEN: 'Учетные данные пользователя больше не действительны. Пользователь должен войти снова.',
  auth: 'Для входа на сайт необходимо авторизоваться',
  'Not Found': 'Неверный запрос к базе данных',
  '401': 'Вы не авторизованы или время действия авторизация закончилось. Необходимо войти в систему',
  Unauthorized: 'Время действия авторизации закончилось. Необходимо заново войти в систему',
  'Cannot convert undefined or null to object': 'Простите, в базе данных нет заявок',
  'API key not valid. Please pass a valid API key.': 'Неверный API key',
  'The request is missing a valid API key.': 'В запросе отсутствует действующий ключ API',
  null: 'В базе даных нет данных',
  '404 Not Found': 'Ошибка 404 Возможно указанная база данных не найдена',
  'Bad Request': 'Не удачный запрос к базе данных',
  'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.': 'Доступ к этой учетной записи временно отключен из-за множества неудачных попыток входа',
  "Cannot read property 'error' of null": 'В базе данных пока нет данных!',
  'User has cancelled': 'Оплата была прервана'
}

export const errors = code => {
  return errorsCode[code] ? errorsCode[code] : 'Ошибка сервера! Попробуйте позже'
}