function NotFoundPage() {
    const styles = {
        height: '76vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        font: 'bolder 2rem "open sans", sans-serif',
    }

    return (
        <div style={styles}>
            <h1>404 - Page not found</h1>
        </div>
    );
}

export default NotFoundPage;