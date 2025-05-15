/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "\n  query User($userId: String!) {\n    user(id: $userId) {\n      _id\n      first_name\n    }\n  }\n": typeof types.UserDocument;
  "\n  query SupermarketListsAtributes($userId: String!) {\n    user(id: $userId) {\n      actualList {\n        products {\n          product {\n            ean\n          }\n          quantity\n        }\n      }\n    }\n  }\n": typeof types.SupermarketListsAtributesDocument;
  "\n  query SearchProducts(\n    $searchTerm: String!\n    $nutriScoreFilter: NutriScoreFilter\n    $brandFilter: StrFilter\n  ) {\n    products(\n      filters: {\n        name: { op: ILIKE, value: $searchTerm }\n        nutriScore: $nutriScoreFilter\n        brandName: $brandFilter\n      }\n    ) {\n      ean\n      name\n      brandName\n      genericName\n      quantity\n      images\n      categoryName\n      nutriScore\n    }\n  }\n": typeof types.SearchProductsDocument;
  "\n  query Brands($name: String!) {\n    brands(name: $name) {\n      name\n    }\n  }\n": typeof types.BrandsDocument;
  "\n  query SupermarketLists($userId: String!) {\n    user(id: $userId) {\n      actualList {\n        _id\n        products {\n          product {\n            ean\n            name\n            genericName\n            quantity\n            images\n            categoryName\n            brandName\n            supermarkets {\n              price\n              supermarket {\n                id\n              }\n            }\n          }\n          quantity\n        }\n      }\n    }\n  }\n": typeof types.SupermarketListsDocument;
  "\n  mutation CreateList($userId: String!) {\n    createList(userId: $userId) {\n      _id\n      products {\n        product {\n          name\n        }\n      }\n    }\n  }\n": typeof types.CreateListDocument;
  "\n  query SupermarketListsWarnings($userId: String!) {\n    user(id: $userId) {\n      actualList {\n        _id\n        products {\n          product {\n            ean\n            name\n            genericName\n            quantity\n            images\n            categoryName\n            brandName\n            supermarkets {\n              price\n              supermarket {\n                id\n              }\n            }\n          }\n          quantity\n        }\n      }\n    }\n  }\n": typeof types.SupermarketListsWarningsDocument;
  "\n  query GetProduct($ean: String!) {\n    product(ean: $ean) {\n      ean\n      name\n      genericName\n      nutrition\n      nutriScore\n      ingredients\n      quantity\n      images\n      categoryName\n      keywords\n      brandName\n      supermarkets {\n        price\n        supermarket {\n          id\n          name\n          image\n        }\n      }\n    }\n  }\n": typeof types.GetProductDocument;
  "\n  query Supermarket($id: Int!) {\n    supermarket(id: $id) {\n      description\n      image\n      name\n      services\n    }\n  }\n": typeof types.SupermarketDocument;
  "\n  mutation UpsertUser($model: UserInput!) {\n    upsertUser(model: $model) {\n      _id\n    }\n  }\n": typeof types.UpsertUserDocument;
};
const documents: Documents = {
  "\n  query User($userId: String!) {\n    user(id: $userId) {\n      _id\n      first_name\n    }\n  }\n":
    types.UserDocument,
  "\n  query SupermarketListsAtributes($userId: String!) {\n    user(id: $userId) {\n      actualList {\n        products {\n          product {\n            ean\n          }\n          quantity\n        }\n      }\n    }\n  }\n":
    types.SupermarketListsAtributesDocument,
  "\n  query SearchProducts(\n    $searchTerm: String!\n    $nutriScoreFilter: NutriScoreFilter\n    $brandFilter: StrFilter\n  ) {\n    products(\n      filters: {\n        name: { op: ILIKE, value: $searchTerm }\n        nutriScore: $nutriScoreFilter\n        brandName: $brandFilter\n      }\n    ) {\n      ean\n      name\n      brandName\n      genericName\n      quantity\n      images\n      categoryName\n      nutriScore\n    }\n  }\n":
    types.SearchProductsDocument,
  "\n  query Brands($name: String!) {\n    brands(name: $name) {\n      name\n    }\n  }\n":
    types.BrandsDocument,
  "\n  query SupermarketLists($userId: String!) {\n    user(id: $userId) {\n      actualList {\n        _id\n        products {\n          product {\n            ean\n            name\n            genericName\n            quantity\n            images\n            categoryName\n            brandName\n            supermarkets {\n              price\n              supermarket {\n                id\n              }\n            }\n          }\n          quantity\n        }\n      }\n    }\n  }\n":
    types.SupermarketListsDocument,
  "\n  mutation CreateList($userId: String!) {\n    createList(userId: $userId) {\n      _id\n      products {\n        product {\n          name\n        }\n      }\n    }\n  }\n":
    types.CreateListDocument,
  "\n  query SupermarketListsWarnings($userId: String!) {\n    user(id: $userId) {\n      actualList {\n        _id\n        products {\n          product {\n            ean\n            name\n            genericName\n            quantity\n            images\n            categoryName\n            brandName\n            supermarkets {\n              price\n              supermarket {\n                id\n              }\n            }\n          }\n          quantity\n        }\n      }\n    }\n  }\n":
    types.SupermarketListsWarningsDocument,
  "\n  query GetProduct($ean: String!) {\n    product(ean: $ean) {\n      ean\n      name\n      genericName\n      nutrition\n      nutriScore\n      ingredients\n      quantity\n      images\n      categoryName\n      keywords\n      brandName\n      supermarkets {\n        price\n        supermarket {\n          id\n          name\n          image\n        }\n      }\n    }\n  }\n":
    types.GetProductDocument,
  "\n  query Supermarket($id: Int!) {\n    supermarket(id: $id) {\n      description\n      image\n      name\n      services\n    }\n  }\n":
    types.SupermarketDocument,
  "\n  mutation UpsertUser($model: UserInput!) {\n    upsertUser(model: $model) {\n      _id\n    }\n  }\n":
    types.UpsertUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query User($userId: String!) {\n    user(id: $userId) {\n      _id\n      first_name\n    }\n  }\n",
): (typeof documents)["\n  query User($userId: String!) {\n    user(id: $userId) {\n      _id\n      first_name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query SupermarketListsAtributes($userId: String!) {\n    user(id: $userId) {\n      actualList {\n        products {\n          product {\n            ean\n          }\n          quantity\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query SupermarketListsAtributes($userId: String!) {\n    user(id: $userId) {\n      actualList {\n        products {\n          product {\n            ean\n          }\n          quantity\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query SearchProducts(\n    $searchTerm: String!\n    $nutriScoreFilter: NutriScoreFilter\n    $brandFilter: StrFilter\n  ) {\n    products(\n      filters: {\n        name: { op: ILIKE, value: $searchTerm }\n        nutriScore: $nutriScoreFilter\n        brandName: $brandFilter\n      }\n    ) {\n      ean\n      name\n      brandName\n      genericName\n      quantity\n      images\n      categoryName\n      nutriScore\n    }\n  }\n",
): (typeof documents)["\n  query SearchProducts(\n    $searchTerm: String!\n    $nutriScoreFilter: NutriScoreFilter\n    $brandFilter: StrFilter\n  ) {\n    products(\n      filters: {\n        name: { op: ILIKE, value: $searchTerm }\n        nutriScore: $nutriScoreFilter\n        brandName: $brandFilter\n      }\n    ) {\n      ean\n      name\n      brandName\n      genericName\n      quantity\n      images\n      categoryName\n      nutriScore\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query Brands($name: String!) {\n    brands(name: $name) {\n      name\n    }\n  }\n",
): (typeof documents)["\n  query Brands($name: String!) {\n    brands(name: $name) {\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query SupermarketLists($userId: String!) {\n    user(id: $userId) {\n      actualList {\n        _id\n        products {\n          product {\n            ean\n            name\n            genericName\n            quantity\n            images\n            categoryName\n            brandName\n            supermarkets {\n              price\n              supermarket {\n                id\n              }\n            }\n          }\n          quantity\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query SupermarketLists($userId: String!) {\n    user(id: $userId) {\n      actualList {\n        _id\n        products {\n          product {\n            ean\n            name\n            genericName\n            quantity\n            images\n            categoryName\n            brandName\n            supermarkets {\n              price\n              supermarket {\n                id\n              }\n            }\n          }\n          quantity\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation CreateList($userId: String!) {\n    createList(userId: $userId) {\n      _id\n      products {\n        product {\n          name\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation CreateList($userId: String!) {\n    createList(userId: $userId) {\n      _id\n      products {\n        product {\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query SupermarketListsWarnings($userId: String!) {\n    user(id: $userId) {\n      actualList {\n        _id\n        products {\n          product {\n            ean\n            name\n            genericName\n            quantity\n            images\n            categoryName\n            brandName\n            supermarkets {\n              price\n              supermarket {\n                id\n              }\n            }\n          }\n          quantity\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query SupermarketListsWarnings($userId: String!) {\n    user(id: $userId) {\n      actualList {\n        _id\n        products {\n          product {\n            ean\n            name\n            genericName\n            quantity\n            images\n            categoryName\n            brandName\n            supermarkets {\n              price\n              supermarket {\n                id\n              }\n            }\n          }\n          quantity\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetProduct($ean: String!) {\n    product(ean: $ean) {\n      ean\n      name\n      genericName\n      nutrition\n      nutriScore\n      ingredients\n      quantity\n      images\n      categoryName\n      keywords\n      brandName\n      supermarkets {\n        price\n        supermarket {\n          id\n          name\n          image\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query GetProduct($ean: String!) {\n    product(ean: $ean) {\n      ean\n      name\n      genericName\n      nutrition\n      nutriScore\n      ingredients\n      quantity\n      images\n      categoryName\n      keywords\n      brandName\n      supermarkets {\n        price\n        supermarket {\n          id\n          name\n          image\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query Supermarket($id: Int!) {\n    supermarket(id: $id) {\n      description\n      image\n      name\n      services\n    }\n  }\n",
): (typeof documents)["\n  query Supermarket($id: Int!) {\n    supermarket(id: $id) {\n      description\n      image\n      name\n      services\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation UpsertUser($model: UserInput!) {\n    upsertUser(model: $model) {\n      _id\n    }\n  }\n",
): (typeof documents)["\n  mutation UpsertUser($model: UserInput!) {\n    upsertUser(model: $model) {\n      _id\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
