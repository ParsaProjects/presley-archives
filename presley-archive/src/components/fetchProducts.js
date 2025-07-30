const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME;
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;

export async function fetchProducts() {
  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
      }
    );
    const data = await res.json();

    // Airtable returns records in data.records
    return (data.records || []).map((record, index) => {
      const product = record.fields;
      return {
        id: record.id || index,
        order: product.order || index,
        name: product.name,
        brand: product.brand,
        price: Number(product.price),
        description1: product.description1,
        description2: product.description2,
        description3: product.description3,
        description4: product.description4,
        images: product.images
          ? product.images.split(",").map(url => url.trim())
          : product.image
          ? [product.image.trim()]
          : [],
        image: product.image ? product.image.trim() : "",
        sold: product.sold,
        archived: product.archived || false,
        mypick: product.mypick,
        depop: product.depop,
        slideshow: product.slideshow
          ? product.slideshow.split(",").map(url => url.trim())
          : [],

      };
    });
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return [];
  }

  
}