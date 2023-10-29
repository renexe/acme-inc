import { VERBS, ADJECTIVES } from "@/mock/products-convention";
import { IProduct } from "@/models/product";

/**
 * Generates an array of unique products with random names, prices, images, and descriptions.
 * @returns {Promise<IProduct[]>} An array of unique products.
 */
export async function generateProductsDb(): Promise<any> {
  const randomVerbs = VERBS.sort(() => Math.random() - 0.5);
  const randomAdjectives = ADJECTIVES.sort(() => Math.random() - 0.5);

  const products: IProduct[] = [];

  for (let i = 0; i < VERBS.length; i++) {
    const productName = `${randomVerbs[i]} ${randomAdjectives[i]}`;
    const description = randomDescription();

    const nameLength = productName.length;
    const descriptionLength = description.length;

    const value =
      ((10 + nameLength) * ((500 - descriptionLength) / 4));

    const product = {
      name: productName,
      slug: productName.toLowerCase().replace(/ /g, "-"),
      price: value,
      image: `https://picsum.photos/id/${i}/500/500`,
      description: description,
    };
    //Garante que não irá criar produtos duplicados
    if (!products.find((p: any) => p.name === productName)) {
      products.push(product);
    }
  }

  return products;
}

/**
 * Generates a random string of characters to be used as a product description.
 * @returns {string} The generated description.
 */
function randomDescription(): string {
  return Array.from({ length: Math.floor(Math.random() * 481) + 20 }, () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 97)
  ).join("");
}
