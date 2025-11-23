function Intro2({introStep, setIntroStep }){
    return (
        <>
            <h1>ルール説明</h1>
            <p>ゲームのルールは<ruby>簡単<rt>かんたん</rt></ruby></p>
            <p><ruby>教室内<rt>きょうしつない</rt></ruby>のQRコードを<ruby>読<rt>よ</rt></ruby>み<ruby>込<rt>こ</rt></ruby>みこむと、ゲームができる。</p>
            <p>このゲームのクリア<ruby>数<rt>すう</rt></ruby>に<ruby>応<rt>おう</rt></ruby>じてお<ruby>菓子<rt>かし</rt></ruby>がもらえるというものだ</p>
            <p>クリア<ruby>数<rt>すう</rt></ruby>はサイトの<ruby>下<rt>した</rt></ruby>の<ruby>鍵<rt>かぎ</rt></ruby>の<ruby>数<rt>かず</rt></ruby>でわかるぞ</p>
            <button onClick={() => setIntroStep(introStep + 1)} ><ruby>教室内<rt>きょうしつない</rt></ruby>へ入った</button>
            <button onClick={() => setIntroStep(introStep - 1)} >もどる</button>
        
        
        </>
    )
}
export default Intro2