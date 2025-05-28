import {products} from './products';

function ImageHolder({ onImageClick }) {
    return(
        <div className = "card">
            {products.map((product, index) => (
                <div className="image-container" key={index} onClick={() => onImageClick(product)}>
                    <img src={product.image} alt={`Image ${index + 1}`} />
                    <p className="product-name">{product.name}</p>
                    <p className="product-brand">{product.brand}</p>
                </div>
            ))}
        </div>
    )
}

export default ImageHolder;