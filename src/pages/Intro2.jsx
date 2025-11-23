function Intro2({introStep, setIntroStep }){
    return (
        <>
            <h1>intro2</h1>
            <p>ゲームのルールは簡単</p>
            <p>教室内のQRコードを読み込みこむと、ゲームができる。</p>
            <p>このゲームのクリア数に応じてお菓子がもらえるというものだ</p>
            <p>クリア数はサイトの下の鍵の数でわかるぞ</p>
            <button onClick={() => setIntroStep(introStep + 1)} >教室内へ入った</button>
            <button onClick={() => setIntroStep(introStep - 1)} >もどる</button>
        
        
        </>
    )
}
export default Intro2