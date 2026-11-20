import logoFile from '../../assets/logo.svg'; 

export const Logo = ({ altText, width = 250, height = 100 }) => {
    return (
        <div className="logo-container">
            <img src={logoFile} alt={altText} style={{ width, height }} />
        </div>
    );
};
