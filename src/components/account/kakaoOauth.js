export default function kakaoOauth() {
    const Rest_api_key='e7bc3c5095f08adc9080b8dbb9248d19' // REST API KEY
    const redirect_uri = 'http://192.168.0.81:1788/auth/kakao/callback' // Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = ()=>{
        window.location.href = kakaoURL
    }

    return( handleLogin() )
}
