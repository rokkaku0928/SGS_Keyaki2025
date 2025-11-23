

function Intro1({introStep, setIntroStep }){
    return (
        <>
            <h1>Welcome</h1>
            <h3>QRMissionにようこそ！！！</h3>
            <p><ruby>成蹊<rt>せいけい</rt></ruby>ゲームスタジオがゲームを<ruby>提供<rt>ていきょう</rt></ruby>するのでどうかよろしく</p>
            <p>
                さっそくルールを<ruby>説明<rt>せつめい</rt></ruby>しよう！
            </p>
            <button onClick={() => setIntroStep(introStep + 1)} >つぎへ</button>
        
        
        </>
    )
}

export default Intro1