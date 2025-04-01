import "./Patterns.css";

const Patterns = () => { 
    return (
        <div id="patterns" className="row">
            <div className="column display-flex justified-center align-items-center flex-wrap">
                <img src="/images/unraveland.webp" />
                <img src="/images/dwaynejoe.jpg" />
                <img src="/images/horizontaleditorial.webp" />
            </div>
            <div className="column display-flex justified-center align-items-center flex-wrap">
                <img src="/images/flower3.png" />
                <img src="/images/flower2.png" />
                <img src="/images/flower1.png" />
            </div>
        </div>
    );
};
export default Patterns;