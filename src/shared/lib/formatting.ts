/**
 * 문자열을 전화번호 형식으로 포맷한다.
 * 이 함수는 모든 비숫자 문자를 제거하고 결과를 `XX-XXX-XXXX` 또는 `XXX-XXXX-XXXX` 패턴으로 포맷한다.
 * 
 * @param {string} value - 포맷할 원본 전화번호 문자열이다.
 *                         숫자와 비숫자 문자가 포함될 수 있으며, 최종 포맷팅에는 숫자만 사용된다.
 * @returns {string} - 포맷된 전화번호 문자열을 반환한다. 입력값을 지정된 패턴으로 포맷할 수 없는 경우, 원본 입력값이 그대로 반환된다.
 * 
 * @example
 * formatTelNumber("01012345678"); // "010-1234-5678" 반환
 * formatTelNumber("021234567"); // "02-123-4567" 반환
 * formatTelNumber("02123456"); // "02123456" 반환
 */
export const formatTelNumber = (value: string): string => {
  const formattedTelNumber = value.replace(/\D/g, "").replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, "$1-$2-$3")
  return formattedTelNumber
}
