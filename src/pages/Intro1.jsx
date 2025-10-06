import { Link } from "react-router-dom"

function Intro1({introStep, setIntroStep }){
    return (
        <>
            <h1>Welcome</h1>
            <p>QRMissionにようこそ！！！</p>
            <p>わたしはこのゲームの主催者（キャラクター名）</p>
            <p>これからこのゲームのルールを説明しよう</p>
            <button onClick={() => setIntroStep(introStep + 1)} >つぎへ</button>
        
        
        </>
    )
}

export default Intro1