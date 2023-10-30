import { VERBS, ADJECTIVES } from "@/mock/products-convention";
import { IProduct } from "@/models/product";
import { loremIpsum } from "react-lorem-ipsum";

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
    const description = loremIpsum({
      p: 1,
      avgWordsPerSentence: Math.floor(Math.random() * (6 - 3 + 1) + 3),
      avgSentencesPerParagraph: Math.floor(Math.random() * (10 - 5 + 1) + 5),
    }).join().slice(0, 500);
    
    const nameLength = productName.length;
    const descriptionLength = description.length;

    const value = (10 + nameLength) * ((500 - descriptionLength) / 4);

    const product = {
      name: productName,
      slug: productName
        .toLowerCase()
        .normalize("NFD")
        .replace(/[^\w\s]/gi, "")
        .replace(/ /g, "-"),
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
