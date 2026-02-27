const Footer = () => {
    return (
        <footer style={styles}>
            Copyright {new Date().getFullYear()} &copy; BLOG. All rights reserved.
        </footer>
    );
}

const styles = {
    color: "var(--text-secondary)",
    fontSize: "15px",
    fontWeight: "500",
    backgroundColor: "var(--surface-color)",
    borderTop: "1px solid var(--border-color)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70px", // A bit taller for a premium feel
    width: "100%",
    marginTop: "auto", // Keeps it at the bottom of the page
    transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out"
}

export default Footer;