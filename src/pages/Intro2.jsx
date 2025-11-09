function Intro2({introStep, setIntroStep }){
    return (
        <>
            <h1>intro2</h1>
            <p>
                <ruby>
                    今回
                    <rt>こんかい</rt>
                </ruby>
                <ruby>
                    君
                    <rt>きみ</rt>
                </ruby>たちにやってほしいことは二つだ
            </p>
            <p>まずは室内に入って話をしよう</p>
            <p>受付のやつ？、、、あぁ気になったら話しとけ</p>
            <p>黙って入ったとこでとっつかまりゃしねぇさｗｗ</p>
            <button onClick={() => setIntroStep(introStep + 1)} >教室内へ入った</button>
            <button onClick={() => setIntroStep(introStep - 1)} >もどる</button>
        
        
        </>
    )
}
export default Intro2