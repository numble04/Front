export const emailPattern =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2})?$/;
export const passwordPattern = /^.{8,32}$/i;
export const nicknamePattern = /^.{3,15}$/;

export const REQUIRED_FIELD = '필수 항목';
export const NOT_VALID_FORMAT = '올바르지 않은 형식';
export const PASSWORD_FORMAT = '8자 이상 32자 이하';
export const NICKNAME_FORMAT = '3자 이상 15자 이하';
export const PASSWORD_NOT_SAME = '비밀번호 불일치';
