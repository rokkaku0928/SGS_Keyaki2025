function Intro2({introStep, setIntroStep }){
    return (
        <>
            <h1>intro2</h1>
            <p>今回君たちにやってほしいことは二つだ</p>
            <p>まず一つ、</p>
            <p>私が事前につけたマークをボールを投げて壊してほしい</p>
            <button onClick={() => setIntroStep(introStep + 1)} >つぎへ</button>
            <button onClick={() => setIntroStep(introStep - 1)} >もどる</button>
        
        
        </>
    )
}
export default Intro2