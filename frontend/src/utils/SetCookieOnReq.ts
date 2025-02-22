// since cookies are not automatically set (even with setCredentials to true)
// we should manually enable this . so we write a function to handle this
//? when does this happen ? when we have a server component (PostList.tsx) >> and a server action >> getPosts()
// in this senario, server doesn't get the credentials (cookies)


export default function setCookieOnReq(cookies) {

    const options = {
        method: 'GET',
                credentials: 'include',
                headers: {
                    Cookie:
                      `${cookies.get("accessToken")?.name}=${
                        cookies.get("accessToken")?.value
                      }; ${cookies.get("refreshToken")?.name}=${
                        cookies.get("refreshToken")?.value
                      }` || "-",
                  },
    }
    return options
}