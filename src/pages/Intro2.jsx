import { Link } from "react-router-dom"

function Intro2(){
    return (
        <>
            <h1>intro2</h1>
            <p>今回君たちにやってほしいことは二つだ</p>
            <p>まず一つ、</p>
            <p>私が事前につけたマークをボールを投げて壊してほしい</p>
            <Link to='/intro-3'>次へ</Link>
            <Link to='/intro-1'>戻る</Link>
        
        
        </>
    )
}
export default Intro2