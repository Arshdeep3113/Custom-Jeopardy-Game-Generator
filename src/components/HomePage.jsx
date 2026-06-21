function HomePage( {onCreateClick}) {
    return (
        <div 
        className= "page">
            <h1>Welcome to Jeopardy Game Builder!</h1>
            <p>Click on 
                <button 
                onClick={onCreateClick}>Create your own game
                </button>
            </p>
        </div>
    );
}

export default HomePage;