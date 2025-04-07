const Popup = ({isOpen, onSubmit}) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputValue = e.target.elements.popupInput.value;
        onSubmit(inputValue);
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <h2>Enter Something</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        name="popupInput"
                        type="text"
                        placeholder="Type here..."
                        style={styles.input}
                    />
                    <div style={styles.buttonGroup}>
                        <button type="submit" style={styles.button}>Submit</button>
                        <button style={styles.button}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 1000
    },
    popup: {
        backgroundColor: 'black', padding: '20px', borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)', width: '300px', textAlign: 'center'
    },
    input: {
        width: '100%', padding: '10px', marginTop: '10px', marginBottom: '15px'
    },
    buttonGroup: {
        display: 'flex', justifyContent: 'space-between'
    },
    button: {
        padding: '8px 12px', cursor: 'pointer'
    }
};

export default Popup;
