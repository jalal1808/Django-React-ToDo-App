import "../styles/LoadingIndicator.css";

const LoadingIndicator = () => {
    return (
        <div className="loading-container">
            <div className="loader">⏳</div>
            <p className="loading-text">Loading...</p>
        </div>
    );
};

export default LoadingIndicator;