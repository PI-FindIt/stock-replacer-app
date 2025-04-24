import { Nutriscore } from "../enum/Nutriscore";
import { SupermarketLogos } from "../enum/SupermarketLogos";
import { Product } from "../Product";

export const mockData: { title: string; items: Product[] }[] = [
  {
    title: "Frozen Desserts",
    items: [
      {
        id: 1,
        name: "Viennetta",
        description:
          "Uma irresistível sobremesa gelada composta por camadas crocantes de chocolate intercaladas com um suave gelado de baunilha. A textura única e o sabor equilibrado fazem dela uma escolha clássica para qualquer ocasião especial.",
        brand: {
          id: 1,
          name: "Viennetta",
          description:
            "Uma marca icónica de sobremesas geladas conhecida pelas suas camadas crocantes e sabor rico.",
          image: "path/to/brand/image",
          isWhiteLabel: false,
        },
        price: [
          {
            supermarket: {
              id: 1,
              name: "Mercadona",
              logo: SupermarketLogos.Mercadona,
              additionalProperties: [],
              description:
                "Mercadona is a Spanish supermarket chain with a strong presence in Portugal. It is known for its high-quality products and competitive prices. Mercadona offers a wide range of products, including fresh produce, meat, fish, dairy, bakery, and household items. The supermarket is committed to sustainability and social responsibility, with initiatives to reduce food waste and support local communities.",
            },
            price: 4.99,
            onSalePrice: 3.99,
          },
          {
            supermarket: {
              id: 2,
              name: "Continente",
              logo: SupermarketLogos.Continente,
              additionalProperties: [],
              description:
                "Continente is a Portuguese supermarket chain that offers a wide range of products, including food, household items, electronics, and clothing. The supermarket is known for its competitive prices and promotions, as well as its commitment to sustainability and social responsibility. Continente has a strong presence in Portugal, with stores located throughout the country.",
            },
            price: 5.49,
          },
        ],
        image:
          "https://images.openfoodfacts.org/images/products/800/092/020/0087/front_pt.51.full.jpg",
        category: {
          id: 1,
          name: "Frozen Desserts",
          description:
            "Deliciosas sobremesas congeladas que combinam textura e sabor para um prazer refrescante.",
          icon: "path/to/icon",
          subcategories: [],
        },
        quantity: "500 g",
        nutritionalInfo: {
          calories: 250,
          fat: 10,
          carbs: 30,
          protein: 5,
          sugar: 20,
          fibre: 2,
          nutriscore: Nutriscore.B,
        },
      },
      {
        id: 2,
        name: "Ice Cream Bar",
        description:
          "Delicioso gelado de baunilha coberto por uma camada generosa de chocolate crocante. Uma combinação clássica de cremosidade e crocância que agrada a qualquer amante de doces.",
        brand: {
          id: 2,
          name: "Ice Cream Co.",
          description:
            "Marca premium especializada em produtos de gelado com ingredientes de alta qualidade.",
          image: "path/to/brand/image",
          isWhiteLabel: false,
        },
        price: [
          {
            supermarket: {
              id: 1,
              name: "Mercadona",
              logo: SupermarketLogos.Mercadona,
              additionalProperties: [],
              description:
                "Mercadona is a Spanish supermarket chain with a strong presence in Portugal. It is known for its high-quality products and competitive prices. Mercadona offers a wide range of products, including fresh produce, meat, fish, dairy, bakery, and household items. The supermarket is committed to sustainability and social responsibility, with initiatives to reduce food waste and support local communities.",
            },
            price: 2.99,
            onSalePrice: 2.49,
          },
          {
            supermarket: {
              id: 2,
              name: "Continente",
              logo: SupermarketLogos.Continente,
              additionalProperties: [],
              description:
                "Continente is a Portuguese supermarket chain that offers a wide range of products, including food, household items, electronics, and clothing. The supermarket is known for its competitive prices and promotions, as well as its commitment to sustainability and social responsibility. Continente has a strong presence in Portugal, with stores located throughout the country.",
            },
            price: 3.49,
          },
          {
            supermarket: {
              id: 3,
              name: "Pingo Doce",
              logo: SupermarketLogos.PingoDoce,
              additionalProperties: [],
              description:
                "Pingo Doce is a Portuguese supermarket chain that offers a wide range of products, including food, household items, electronics, and clothing. The supermarket is known for its competitive prices and promotions, as well as its commitment to sustainability and social responsibility. Pingo Doce has a strong presence in Portugal, with stores located throughout the country.",
            },
            price: 3.29,
          },
        ],

        image:
          "https://images.openfoodfacts.org/images/products/800/092/020/0087/front_pt.51.full.jpg",
        category: {
          id: 1,
          name: "Frozen Desserts",
          description:
            "Deliciosas sobremesas congeladas que combinam textura e sabor para um prazer refrescante.",
          icon: "path/to/icon",
          subcategories: [],
        },
        quantity: "100 g",
        nutritionalInfo: {
          calories: 200,
          fat: 8,
          carbs: 25,
          protein: 4,
          sugar: 15,
          fibre: 1,
          nutriscore: Nutriscore.C,
        },
      },
    ],
  },
  {
    title: "Plant-Based Beverages",
    items: [
      {
        id: 3,
        name: "Alpro Almond Drink",
        description:
          "Bebida vegetal de amêndoa, enriquecida com cálcio e vitaminas essenciais. Perfeita para quem procura uma alternativa saudável ao leite, com um sabor suave e ligeiramente adocicado.",
        brand: {
          id: 3,
          name: "Alpro",
          description:
            "Marca líder em bebidas vegetais, comprometida com a sustentabilidade e a nutrição equilibrada.",
          image: "path/to/brand/image",
          isWhiteLabel: false,
        },
        price: [
          {
            supermarket: {
              id: 1,
              name: "Mercadona",
              logo: SupermarketLogos.Mercadona,
              additionalProperties: [],
              description:
                "Mercadona is a Spanish supermarket chain with a strong presence in Portugal. It is known for its high-quality products and competitive prices. Mercadona offers a wide range of products, including fresh produce, meat, fish, dairy, bakery, and household items. The supermarket is committed to sustainability and social responsibility, with initiatives to reduce food waste and support local communities.",
            },
            price: 2.99,
            onSalePrice: 2.49,
          },
          {
            supermarket: {
              id: 2,
              name: "Continente",
              logo: SupermarketLogos.Continente,
              additionalProperties: [],
              description:
                "Continente is a Portuguese supermarket chain that offers a wide range of products, including food, household items, electronics, and clothing. The supermarket is known for its competitive prices and promotions, as well as its commitment to sustainability and social responsibility. Continente has a strong presence in Portugal, with stores located throughout the country.",
            },
            price: 3.49,
          },
          {
            supermarket: {
              id: 3,
              name: "Pingo Doce",
              logo: SupermarketLogos.PingoDoce,
              additionalProperties: [],
              description:
                "Pingo Doce is a Portuguese supermarket chain that offers a wide range of products, including food, household items, electronics, and clothing. The supermarket is known for its competitive prices and promotions, as well as its commitment to sustainability and social responsibility. Pingo Doce has a strong presence in Portugal, with stores located throughout the country.",
            },
            price: 3.29,
          },
          {
            supermarket: {
              id: 4,
              name: "Lidl",
              logo: SupermarketLogos.Lidl,
              additionalProperties: [],
              description:
                "Lidl is a German discount supermarket chain that operates stores worldwide. The supermarket is known for its low prices and high-quality products, offering a wide range of food and non-food items. Lidl is committed to sustainability and social responsibility, with initiatives to reduce waste and support local communities.",
            },
            price: 2.79,
            onSalePrice: 2.49,
          },
        ],
        image:
          "https://images.openfoodfacts.org/images/products/541/118/811/2709/front_pt.675.full.jpg",
        category: {
          id: 2,
          name: "Plant-Based Beverages",
          description:
            "Bebidas saudáveis e sustentáveis, feitas a partir de ingredientes de origem vegetal.",
          icon: "path/to/icon",
          subcategories: [],
        },
        quantity: "1 L",
        nutritionalInfo: {
          calories: 100,
          fat: 3,
          carbs: 15,
          protein: 1,
          sugar: 10,
          fibre: 1,
          nutriscore: Nutriscore.B,
        },
      },
      {
        id: 4,
        name: "Oat Milk",
        description:
          "Bebida de aveia cremosa e naturalmente doce, sem açúcares adicionados. Ideal para café, smoothies ou como substituto do leite em receitas tradicionais.",
        brand: {
          id: 4,
          name: "Oatly",
          description:
            "Empresa inovadora especializada em produtos à base de aveia, promovendo alternativas sustentáveis ao leite.",
          image: "path/to/brand/image",
          isWhiteLabel: false,
        },
        price: [
          {
            supermarket: {
              id: 1,
              name: "Mercadona",
              logo: SupermarketLogos.Mercadona,
              additionalProperties: [],
              description:
                "Mercadona is a Spanish supermarket chain with a strong presence in Portugal. It is known for its high-quality products and competitive prices. Mercadona offers a wide range of products, including fresh produce, meat, fish, dairy, bakery, and household items. The supermarket is committed to sustainability and social responsibility, with initiatives to reduce food waste and support local communities.",
            },
            price: 2.99,
            onSalePrice: 2.49,
          },
          {
            supermarket: {
              id: 2,
              name: "Continente",
              logo: SupermarketLogos.Continente,
              additionalProperties: [],
              description:
                "Continente is a Portuguese supermarket chain that offers a wide range of products, including food, household items, electronics, and clothing. The supermarket is known for its competitive prices and promotions, as well as its commitment to sustainability and social responsibility. Continente has a strong presence in Portugal, with stores located throughout the country.",
            },
            price: 3.49,
          },
          {
            supermarket: {
              id: 3,
              name: "Pingo Doce",
              logo: SupermarketLogos.PingoDoce,
              additionalProperties: [],
              description:
                "Pingo Doce is a Portuguese supermarket chain that offers a wide range of products, including food, household items, electronics, and clothing. The supermarket is known for its competitive prices and promotions, as well as its commitment to sustainability and social responsibility. Pingo Doce has a strong presence in Portugal, with stores located throughout the country.",
            },
            price: 3.29,
          },
          {
            supermarket: {
              id: 4,
              name: "Lidl",
              logo: SupermarketLogos.Lidl,
              additionalProperties: [],
              description:
                "Lidl is a German discount supermarket chain that operates stores worldwide. The supermarket is known for its low prices and high-quality products, offering a wide range of food and non-food items. Lidl is committed to sustainability and social responsibility, with initiatives to reduce waste and support local communities.",
            },
            price: 2.79,
            onSalePrice: 2.49,
          },
        ],
        image:
          "https://images.openfoodfacts.org/images/products/541/118/811/2709/front_pt.675.full.jpg",
        category: {
          id: 2,
          name: "Plant-Based Beverages",
          description:
            "Bebidas saudáveis e sustentáveis, feitas a partir de ingredientes de origem vegetal.",
          icon: "path/to/icon",
          subcategories: [],
        },
        quantity: "1 L",
        nutritionalInfo: {
          calories: 120,
          fat: 4,
          carbs: 20,
          protein: 2,
          sugar: 5,
          fibre: 2,
          nutriscore: Nutriscore.C,
        },
      },
      {
        id: 5,
        name: "Soy Milk",
        description:
          "Bebida de soja rica em proteína e enriquecida com cálcio, oferecendo uma alternativa nutritiva ao leite tradicional. Perfeita para consumir simples ou em receitas culinárias.",
        brand: {
          id: 5,
          name: "Silk",
          description:
            "Uma marca de referência em bebidas à base de soja, promovendo um estilo de vida saudável e sustentável.",
          image: "path/to/brand/image",
          isWhiteLabel: false,
        },
        price: [
          {
            supermarket: {
              id: 1,
              name: "Mercadona",
              logo: SupermarketLogos.Mercadona,
              additionalProperties: [],
              description:
                "Mercadona is a Spanish supermarket chain with a strong presence in Portugal. It is known for its high-quality products and competitive prices. Mercadona offers a wide range of products, including fresh produce, meat, fish, dairy, bakery, and household items. The supermarket is committed to sustainability and social responsibility, with initiatives to reduce food waste and support local communities.",
            },
            price: 2.99,
            onSalePrice: 2.49,
          },
          {
            supermarket: {
              id: 2,
              name: "Continente",
              logo: SupermarketLogos.Continente,
              additionalProperties: [],
              description:
                "Continente is a Portuguese supermarket chain that offers a wide range of products, including food, household items, electronics, and clothing. The supermarket is known for its competitive prices and promotions, as well as its commitment to sustainability and social responsibility. Continente has a strong presence in Portugal, with stores located throughout the country.",
            },
            price: 3.49,
          },
          {
            supermarket: {
              id: 3,
              name: "Pingo Doce",
              logo: SupermarketLogos.PingoDoce,
              additionalProperties: [],
              description:
                "Pingo Doce is a Portuguese supermarket chain that offers a wide range of products, including food, household items, electronics, and clothing. The supermarket is known for its competitive prices and promotions, as well as its commitment to sustainability and social responsibility. Pingo Doce has a strong presence in Portugal, with stores located throughout the country.",
            },
            price: 3.29,
          },
          {
            supermarket: {
              id: 4,
              name: "Lidl",
              logo: SupermarketLogos.Lidl,
              additionalProperties: [],
              description:
                "Lidl is a German discount supermarket chain that operates stores worldwide. The supermarket is known for its low prices and high-quality products, offering a wide range of food and non-food items. Lidl is committed to sustainability and social responsibility, with initiatives to reduce waste and support local communities.",
            },
            price: 2.79,
            onSalePrice: 2.49,
          },
        ],
        image:
          "https://images.openfoodfacts.org/images/products/541/118/811/2709/front_pt.675.full.jpg",
        category: {
          id: 2,
          name: "Plant-Based Beverages",
          description:
            "Bebidas saudáveis e sustentáveis, feitas a partir de ingredientes de origem vegetal.",
          icon: "path/to/icon",
          subcategories: [],
        },
        quantity: "1 L",
        nutritionalInfo: {
          calories: 90,
          fat: 2,
          carbs: 10,
          protein: 3,
          sugar: 5,
          fibre: 1,
          nutriscore: Nutriscore.A,
        },
      },
    ],
  },
];
