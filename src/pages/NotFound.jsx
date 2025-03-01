function NotFound() {
    const styles = {
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        font: 'bolder 2rem "open sans", sans-serif',
        color: 'white',
    }

    return (
        <div style={styles}>
            <h1>404 - Page not found</h1>
        </div>
    );
}

export default NotFound;