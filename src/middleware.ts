import { NextRequest } from "next/server"

/**
 * 사용자의 IP 주소를 얻는다.
 * ::ffff는 IPv6 주소이다. ::1은 IPv6의 루프백 주소이다. 이는 `127.0.0.1`과 동일하다.
 * 
 * @param {NextRequest} request 
 * @returns 클라이언트의 IP 주소를 문자열로 반환한다. `x-forwarded-for` 헤더와
 *          `request.ip` 속성이 모두 없는 경우 기본 IP 주소 "0.0.0.0"을 반환한다.
 * 
 * @example
 * ```
 * // Prints "::ffff:10.10.100.50"
 * // Prints "::1"
 * console.log(getClientIP(request))
 * ```
 */
const getClientIp = (request: NextRequest) => {
  const forwarded = request.headers.get("x-forwarded-for")

  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }

  return request.ip ?? "0.0.0.0"
}

export const middleware = async (request: NextRequest) => {
  const clientIP = getClientIp(request)
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\.ico$|.*\.png$|.*\.svg$|.*\.mp4$).*)",
  ],
}
