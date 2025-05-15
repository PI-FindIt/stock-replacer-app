/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** Date with time (isoformat) */
  DateTime: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](https://ecma-international.org/wp-content/uploads/ECMA-404_2nd_edition_december_2017.pdf). */
  JSON: { input: any; output: any };
};

export type Brand = {
  __typename?: "Brand";
  children: Array<Brand>;
  friendlyName: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  parents: Array<Brand>;
  products: Array<Product>;
};

export type BrandBase = {
  name: Scalars["String"]["input"];
};

export type Category = {
  __typename?: "Category";
  children: Array<Category>;
  friendlyName: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  parents: Array<Category>;
  products: Array<Product>;
};

export type CategoryBase = {
  name: Scalars["String"]["input"];
};

export type CompositeKeyInput = {
  listId: Scalars["String"]["input"];
  productEan: Scalars["String"]["input"];
};

export type CompositeKeyType = {
  __typename?: "CompositeKeyType";
  listId: Scalars["String"]["output"];
  productEan: Scalars["String"]["output"];
};

export type Coordinate = {
  distance: Scalars["Float"]["input"];
  latitude: Scalars["Float"]["input"];
  longitude: Scalars["Float"]["input"];
};

export type CoordinateFilter = {
  op: Operator | "%future added value";
  value: Coordinate;
};

export enum Gender {
  Female = "FEMALE",
  Male = "MALE",
  NonBinary = "NON_BINARY",
  Other = "OTHER",
}

export type IntFilter = {
  op: Operator | "%future added value";
  value: Scalars["Int"]["input"];
};

export type ListProduct = {
  __typename?: "ListProduct";
  id_composite: CompositeKeyType;
  product: Product;
  quantity: Scalars["Float"]["output"];
  status: Status | "%future added value";
  supermarketInfo: SupermarketWithPrice;
  supermarket_id: Scalars["Int"]["output"];
};

export type ListProductInput = {
  id_composite: CompositeKeyInput;
  quantity: Scalars["Float"]["input"];
  status?: Status | "%future added value";
  supermarket_id: Scalars["Int"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  createBrand: Brand;
  createCategory: Category;
  createList?: Maybe<SupermarketList>;
  createProduct: Product;
  deleteBrand: Scalars["Boolean"]["output"];
  deleteCategory: Scalars["Boolean"]["output"];
  deleteList: Scalars["Boolean"]["output"];
  deleteProduct: Scalars["Boolean"]["output"];
  deleteProductFromList: Scalars["Boolean"]["output"];
  deleteUser: Scalars["Boolean"]["output"];
  updateBrand: Brand;
  updateCategory: Category;
  upsertProductFromList: Array<ListProduct>;
  upsertUser: User;
};

export type MutationCreateBrandArgs = {
  model: BrandBase;
};

export type MutationCreateCategoryArgs = {
  model: CategoryBase;
};

export type MutationCreateListArgs = {
  userId: Scalars["String"]["input"];
};

export type MutationCreateProductArgs = {
  model: ProductInput;
};

export type MutationDeleteBrandArgs = {
  name: Scalars["String"]["input"];
};

export type MutationDeleteCategoryArgs = {
  name: Scalars["String"]["input"];
};

export type MutationDeleteListArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteProductArgs = {
  name: Scalars["String"]["input"];
};

export type MutationDeleteProductFromListArgs = {
  ids: CompositeKeyInput;
};

export type MutationDeleteUserArgs = {
  id: Scalars["String"]["input"];
};

export type MutationUpdateBrandArgs = {
  model: BrandBase;
  name: Scalars["String"]["input"];
};

export type MutationUpdateCategoryArgs = {
  model: CategoryBase;
  name: Scalars["String"]["input"];
};

export type MutationUpsertProductFromListArgs = {
  models: Array<ListProductInput>;
};

export type MutationUpsertUserArgs = {
  model: UserInput;
};

export enum NutriScore {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  NotApplicable = "NOT_APPLICABLE",
  Unknown = "UNKNOWN",
}

export type NutriScoreFilter = {
  op: Operator | "%future added value";
  value: NutriScore | "%future added value";
};

export enum Operator {
  All = "ALL",
  Any = "ANY",
  Contains = "CONTAINS",
  Eq = "EQ",
  Ge = "GE",
  Gt = "GT",
  Ilike = "ILIKE",
  In = "IN",
  Is = "IS",
  IsNot = "IS_NOT",
  Le = "LE",
  Like = "LIKE",
  Limit = "LIMIT",
  Lt = "LT",
  Ne = "NE",
  NotContains = "NOT_CONTAINS",
  NotIn = "NOT_IN",
  Offset = "OFFSET",
}

export enum Order {
  Asc = "ASC",
  AscNullsFirst = "ASC_NULLS_FIRST",
  AscNullsLast = "ASC_NULLS_LAST",
  Desc = "DESC",
  DescNullsFirst = "DESC_NULLS_FIRST",
  DescNullsLast = "DESC_NULLS_LAST",
}

export enum PathType {
  Cheapest = "CHEAPEST",
  Fastest = "FASTEST",
  Shortest = "SHORTEST",
}

export type Preferences = {
  __typename?: "Preferences";
  brandsDislike: Array<Scalars["String"]["output"]>;
  brandsLike: Array<Scalars["String"]["output"]>;
  budget: Scalars["Float"]["output"];
  maxDistance: Scalars["Float"]["output"];
  pathType: PathType | "%future added value";
  supermarketsDislike: Array<Scalars["Int"]["output"]>;
  supermarketsLike: Array<Scalars["Int"]["output"]>;
};

export type PreferencesInput = {
  brandsDislike?: Array<Scalars["String"]["input"]>;
  brandsLike?: Array<Scalars["String"]["input"]>;
  budget?: Scalars["Float"]["input"];
  maxDistance?: Scalars["Float"]["input"];
  pathType?: PathType | "%future added value";
  supermarketsDislike?: Array<Scalars["Int"]["input"]>;
  supermarketsLike?: Array<Scalars["Int"]["input"]>;
};

export type Product = {
  __typename?: "Product";
  blurhash?: Maybe<Scalars["String"]["output"]>;
  brand: Brand;
  brandName?: Maybe<Scalars["String"]["output"]>;
  category: Category;
  categoryName?: Maybe<Scalars["String"]["output"]>;
  ean: Scalars["String"]["output"];
  genericName: Scalars["String"]["output"];
  genericNameEn: Scalars["String"]["output"];
  images: Array<Scalars["String"]["output"]>;
  ingredients: Scalars["String"]["output"];
  keywords: Array<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  nameEn: Scalars["String"]["output"];
  nutriScore: NutriScore | "%future added value";
  nutrition: Scalars["JSON"]["output"];
  quantity: Scalars["String"]["output"];
  supermarkets: Array<SupermarketWithPrice>;
  unit: Scalars["String"]["output"];
};

export type ProductFilter = {
  and?: InputMaybe<Array<ProductFilter>>;
  brandName?: InputMaybe<StrFilter>;
  categoryName?: InputMaybe<StrFilter>;
  ean?: InputMaybe<StrFilter>;
  genericName?: InputMaybe<StrFilter>;
  genericNameEn?: InputMaybe<StrFilter>;
  images?: InputMaybe<StrListFilter>;
  ingredients?: InputMaybe<StrFilter>;
  keywords?: InputMaybe<StrListFilter>;
  name?: InputMaybe<StrFilter>;
  nameEn?: InputMaybe<StrFilter>;
  nutriScore?: InputMaybe<NutriScoreFilter>;
  or?: InputMaybe<Array<ProductFilter>>;
  quantity?: InputMaybe<StrFilter>;
  unit?: InputMaybe<StrFilter>;
};

export type ProductInput = {
  blurhash?: InputMaybe<Scalars["String"]["input"]>;
  brandName?: InputMaybe<Scalars["String"]["input"]>;
  categoryName?: InputMaybe<Scalars["String"]["input"]>;
  ean: Scalars["String"]["input"];
  genericName: Scalars["String"]["input"];
  genericNameEn: Scalars["String"]["input"];
  images: Array<Scalars["String"]["input"]>;
  ingredients: Scalars["String"]["input"];
  keywords: Array<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  nameEn: Scalars["String"]["input"];
  nutriScore: NutriScore | "%future added value";
  nutrition: Scalars["JSON"]["input"];
  quantity: Scalars["String"]["input"];
  unit: Scalars["String"]["input"];
};

export type ProductOrder = {
  brandName?: InputMaybe<Order | "%future added value">;
  categoryName?: InputMaybe<Order | "%future added value">;
  ean?: InputMaybe<Order | "%future added value">;
  name?: InputMaybe<Order | "%future added value">;
  nameEn?: InputMaybe<Order | "%future added value">;
  nutriScore?: InputMaybe<Order | "%future added value">;
  quantity?: InputMaybe<Order | "%future added value">;
};

export type ProductWithPrice = {
  __typename?: "ProductWithPrice";
  price: Scalars["Float"]["output"];
  product: Product;
};

export type Query = {
  __typename?: "Query";
  brand?: Maybe<Brand>;
  brands: Array<Brand>;
  categories: Array<Category>;
  category?: Maybe<Category>;
  product?: Maybe<Product>;
  products: Array<Product>;
  recommendationsByProduct: Array<Product>;
  recommendationsByText: Array<Product>;
  supermarket?: Maybe<Supermarket>;
  supermarketLocation?: Maybe<SupermarketLocation>;
  supermarketLocations: Array<SupermarketLocation>;
  supermarkets: Array<Supermarket>;
  textToProduct: Array<Product>;
  user?: Maybe<User>;
};

export type QueryBrandArgs = {
  name: Scalars["String"]["input"];
};

export type QueryBrandsArgs = {
  name: Scalars["String"]["input"];
};

export type QueryCategoriesArgs = {
  name: Scalars["String"]["input"];
};

export type QueryCategoryArgs = {
  name: Scalars["String"]["input"];
};

export type QueryProductArgs = {
  ean: Scalars["String"]["input"];
};

export type QueryProductsArgs = {
  filters?: InputMaybe<ProductFilter>;
  limit?: Scalars["Int"]["input"];
  offset?: Scalars["Int"]["input"];
  orderBy?: InputMaybe<ProductOrder>;
};

export type QueryRecommendationsByProductArgs = {
  ean: Scalars["String"]["input"];
  filters?: InputMaybe<RecommendationFilterInput>;
  recommendations?: Scalars["Int"]["input"];
};

export type QueryRecommendationsByTextArgs = {
  filters?: InputMaybe<RecommendationFilterInput>;
  query: Scalars["String"]["input"];
  recommendations?: Scalars["Int"]["input"];
};

export type QuerySupermarketArgs = {
  id: Scalars["Int"]["input"];
};

export type QuerySupermarketLocationArgs = {
  id: Scalars["Int"]["input"];
  supermarketId: Scalars["Int"]["input"];
};

export type QuerySupermarketLocationsArgs = {
  filters: SupermarketLocationFilter;
};

export type QuerySupermarketsArgs = {
  filters: SupermarketFilter;
};

export type QueryTextToProductArgs = {
  text: Scalars["String"]["input"];
};

export type QueryUserArgs = {
  id: Scalars["String"]["input"];
};

export type RecommendationFilterInput = {
  brand?: InputMaybe<Scalars["String"]["input"]>;
  category?: InputMaybe<Scalars["String"]["input"]>;
};

export enum Status {
  Active = "ACTIVE",
  Completed = "COMPLETED",
  Skipped = "SKIPPED",
}

export type StrFilter = {
  op: Operator | "%future added value";
  value: Scalars["String"]["input"];
};

export type StrListFilter = {
  op: Operator | "%future added value";
  value: Array<Scalars["String"]["input"]>;
};

export type Supermarket = {
  __typename?: "Supermarket";
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["Int"]["output"];
  image?: Maybe<Scalars["String"]["output"]>;
  imageBlurhash?: Maybe<Scalars["String"]["output"]>;
  locations: Array<SupermarketLocation>;
  logo?: Maybe<Scalars["String"]["output"]>;
  logoBlurhash?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  products: Array<ProductWithPrice>;
  services: Array<SupermarketServices | "%future added value">;
};

export type SupermarketFilter = {
  description?: InputMaybe<StrFilter>;
  id?: InputMaybe<IntFilter>;
  image?: InputMaybe<StrFilter>;
  name?: InputMaybe<StrFilter>;
  services?: InputMaybe<SupermarketServicesListFilter>;
};

export type SupermarketList = {
  __typename?: "SupermarketList";
  /** MongoDB document ObjectID */
  _id: Scalars["String"]["output"];
  products: Array<ListProduct>;
  status: Status | "%future added value";
  timestamp: Scalars["DateTime"]["output"];
};

export type SupermarketLocation = {
  __typename?: "SupermarketLocation";
  id: Scalars["Int"]["output"];
  latitude: Scalars["Float"]["output"];
  longitude: Scalars["Float"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  supermarket?: Maybe<Supermarket>;
  supermarketId: Scalars["Int"]["output"];
};

export type SupermarketLocationFilter = {
  coordinates?: InputMaybe<CoordinateFilter>;
  id?: InputMaybe<IntFilter>;
  image?: InputMaybe<StrFilter>;
  name?: InputMaybe<StrFilter>;
  supermarketId?: InputMaybe<IntFilter>;
};

export enum SupermarketServices {
  Coffee = "COFFEE",
  GasStation = "GAS_STATION",
  Newsstand = "NEWSSTAND",
  Pharmacy = "PHARMACY",
  Restaurant = "RESTAURANT",
  SelfKiosk = "SELF_KIOSK",
}

export type SupermarketServicesListFilter = {
  op: Operator | "%future added value";
  value: Array<SupermarketServices | "%future added value">;
};

export type SupermarketWithPrice = {
  __typename?: "SupermarketWithPrice";
  ean: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  price: Scalars["Float"]["output"];
  supermarket: Supermarket;
};

export type User = {
  __typename?: "User";
  /** MongoDB document ObjectID */
  _id: Scalars["String"]["output"];
  actualList?: Maybe<SupermarketList>;
  birth_date: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  first_name: Scalars["String"]["output"];
  gender: Gender | "%future added value";
  last_name: Scalars["String"]["output"];
  preferences: Preferences;
  supermarketLists: Array<SupermarketList>;
};

export type UserInput = {
  birth_date: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  first_name: Scalars["String"]["input"];
  gender?: Gender | "%future added value";
  last_name: Scalars["String"]["input"];
  preferences?: InputMaybe<PreferencesInput>;
};

export type UserQueryVariables = Exact<{
  userId: Scalars["String"]["input"];
}>;

export type UserQuery = {
  __typename?: "Query";
  user?: { __typename?: "User"; _id: string; first_name: string } | null;
};

export type SupermarketListsAtributesQueryVariables = Exact<{
  userId: Scalars["String"]["input"];
}>;

export type SupermarketListsAtributesQuery = {
  __typename?: "Query";
  user?: {
    __typename?: "User";
    actualList?: {
      __typename?: "SupermarketList";
      products: Array<{
        __typename?: "ListProduct";
        quantity: number;
        product: { __typename?: "Product"; ean: string };
      }>;
    } | null;
  } | null;
};

export type SearchProductsQueryVariables = Exact<{
  searchTerm: Scalars["String"]["input"];
  nutriScoreFilter?: InputMaybe<NutriScoreFilter>;
  brandFilter?: InputMaybe<StrFilter>;
}>;

export type SearchProductsQuery = {
  __typename?: "Query";
  products: Array<{
    __typename?: "Product";
    ean: string;
    name: string;
    brandName?: string | null;
    genericName: string;
    quantity: string;
    images: Array<string>;
    categoryName?: string | null;
    nutriScore: NutriScore;
  }>;
};

export type BrandsQueryVariables = Exact<{
  name: Scalars["String"]["input"];
}>;

export type BrandsQuery = {
  __typename?: "Query";
  brands: Array<{ __typename?: "Brand"; name: string }>;
};

export type SupermarketListsQueryVariables = Exact<{
  userId: Scalars["String"]["input"];
}>;

export type SupermarketListsQuery = {
  __typename?: "Query";
  user?: {
    __typename?: "User";
    actualList?: {
      __typename?: "SupermarketList";
      _id: string;
      products: Array<{
        __typename?: "ListProduct";
        quantity: number;
        product: {
          __typename?: "Product";
          ean: string;
          name: string;
          genericName: string;
          quantity: string;
          images: Array<string>;
          categoryName?: string | null;
          brandName?: string | null;
          supermarkets: Array<{
            __typename?: "SupermarketWithPrice";
            price: number;
            supermarket: { __typename?: "Supermarket"; id: number };
          }>;
        };
      }>;
    } | null;
  } | null;
};

export type CreateListMutationVariables = Exact<{
  userId: Scalars["String"]["input"];
}>;

export type CreateListMutation = {
  __typename?: "Mutation";
  createList?: {
    __typename?: "SupermarketList";
    _id: string;
    products: Array<{
      __typename?: "ListProduct";
      product: { __typename?: "Product"; name: string };
    }>;
  } | null;
};

export type SupermarketListsWarningsQueryVariables = Exact<{
  userId: Scalars["String"]["input"];
}>;

export type SupermarketListsWarningsQuery = {
  __typename?: "Query";
  user?: {
    __typename?: "User";
    actualList?: {
      __typename?: "SupermarketList";
      _id: string;
      products: Array<{
        __typename?: "ListProduct";
        quantity: number;
        product: {
          __typename?: "Product";
          ean: string;
          name: string;
          genericName: string;
          quantity: string;
          images: Array<string>;
          categoryName?: string | null;
          brandName?: string | null;
          supermarkets: Array<{
            __typename?: "SupermarketWithPrice";
            price: number;
            supermarket: { __typename?: "Supermarket"; id: number };
          }>;
        };
      }>;
    } | null;
  } | null;
};

export type GetProductQueryVariables = Exact<{
  ean: Scalars["String"]["input"];
}>;

export type GetProductQuery = {
  __typename?: "Query";
  product?: {
    __typename?: "Product";
    ean: string;
    name: string;
    genericName: string;
    nutrition: any;
    nutriScore: NutriScore;
    ingredients: string;
    quantity: string;
    images: Array<string>;
    categoryName?: string | null;
    keywords: Array<string>;
    brandName?: string | null;
    supermarkets: Array<{
      __typename?: "SupermarketWithPrice";
      price: number;
      supermarket: {
        __typename?: "Supermarket";
        id: number;
        name: string;
        image?: string | null;
      };
    }>;
  } | null;
};

export type SupermarketQueryVariables = Exact<{
  id: Scalars["Int"]["input"];
}>;

export type SupermarketQuery = {
  __typename?: "Query";
  supermarket?: {
    __typename?: "Supermarket";
    description?: string | null;
    image?: string | null;
    name: string;
    services: Array<SupermarketServices>;
  } | null;
};

export type UpsertUserMutationVariables = Exact<{
  model: UserInput;
}>;

export type UpsertUserMutation = {
  __typename?: "Mutation";
  upsertUser: { __typename?: "User"; _id: string };
};

export const UserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "User" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                { kind: "Field", name: { kind: "Name", value: "first_name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const SupermarketListsAtributesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SupermarketListsAtributes" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "actualList" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "products" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "product" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "ean" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "quantity" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SupermarketListsAtributesQuery,
  SupermarketListsAtributesQueryVariables
>;
export const SearchProductsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SearchProducts" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "searchTerm" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "nutriScoreFilter" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "NutriScoreFilter" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "brandFilter" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "StrFilter" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "products" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "name" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "op" },
                            value: { kind: "EnumValue", value: "ILIKE" },
                          },
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "value" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "searchTerm" },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "nutriScore" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "nutriScoreFilter" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "brandName" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "brandFilter" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ean" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "brandName" } },
                { kind: "Field", name: { kind: "Name", value: "genericName" } },
                { kind: "Field", name: { kind: "Name", value: "quantity" } },
                { kind: "Field", name: { kind: "Name", value: "images" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "categoryName" },
                },
                { kind: "Field", name: { kind: "Name", value: "nutriScore" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SearchProductsQuery, SearchProductsQueryVariables>;
export const BrandsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Brands" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "brands" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BrandsQuery, BrandsQueryVariables>;
export const SupermarketListsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SupermarketLists" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "actualList" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "_id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "products" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "product" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "ean" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "genericName",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "quantity" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "images" },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "categoryName",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "brandName" },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "supermarkets",
                                    },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "price",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "supermarket",
                                          },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "id",
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "quantity" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SupermarketListsQuery,
  SupermarketListsQueryVariables
>;
export const CreateListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createList" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "products" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "product" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateListMutation, CreateListMutationVariables>;
export const SupermarketListsWarningsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SupermarketListsWarnings" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "actualList" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "_id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "products" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "product" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "ean" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "genericName",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "quantity" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "images" },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "categoryName",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "brandName" },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "supermarkets",
                                    },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "price",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "supermarket",
                                          },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "id",
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "quantity" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SupermarketListsWarningsQuery,
  SupermarketListsWarningsQueryVariables
>;
export const GetProductDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetProduct" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "ean" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "product" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "ean" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ean" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ean" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "genericName" } },
                { kind: "Field", name: { kind: "Name", value: "nutrition" } },
                { kind: "Field", name: { kind: "Name", value: "nutriScore" } },
                { kind: "Field", name: { kind: "Name", value: "ingredients" } },
                { kind: "Field", name: { kind: "Name", value: "quantity" } },
                { kind: "Field", name: { kind: "Name", value: "images" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "categoryName" },
                },
                { kind: "Field", name: { kind: "Name", value: "keywords" } },
                { kind: "Field", name: { kind: "Name", value: "brandName" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "supermarkets" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "price" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "supermarket" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "image" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetProductQuery, GetProductQueryVariables>;
export const SupermarketDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Supermarket" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "supermarket" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "image" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "services" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SupermarketQuery, SupermarketQueryVariables>;
export const UpsertUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpsertUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "model" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UserInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "upsertUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "model" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "model" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "_id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpsertUserMutation, UpsertUserMutationVariables>;
