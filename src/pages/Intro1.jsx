import { Link } from "react-router-dom"

function Intro1(){
    return (
        <>
            <h1>Welcome</h1>
            <p>QRMissionにようこそ！！！</p>
            <p>わたしはこのゲームの主催者（キャラクター名）</p>
            <p>これからこのゲームのルールを説明しよう</p>
            <Link to='/intro-2'>次へ</Link>
        
        
        </>
    )
}

export default Intro1