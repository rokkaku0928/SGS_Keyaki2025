

function Intro1({introStep, setIntroStep }){
    return (
        <>
            <h1>Welcome</h1>
            <h3>QRMissionにようこそ！！！</h3>
            <p>成蹊ゲームスタジオがゲームを提供するのでどうかよろしく</p>
            <p>
                さっそくルールを<ruby>説明<rt>せつめい</rt></ruby>しよう！
            </p>
            <button onClick={() => setIntroStep(introStep + 1)} >つぎへ</button>
        
        
        </>
    )
}

export default Intro1