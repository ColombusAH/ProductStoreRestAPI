//*********/ Builded only for simulate work with DB //*********/

import categories from "../data/categories.json";
import uuidv1 from "uuid/v1";
export interface Category {
  id: string;
  name: string;
}
/**
 * @returns -return categories array;
 */
export async function getCategories(): Promise<Category[]> {
  return Promise.resolve(categories);
}

/**
 * @returns -returns the category by id  or undifined if not found.
 * @param id: the id of the category
 */
export async function findCategoryById(
  id: string
): Promise<Category | undefined> {
  const index = categories.findIndex(c => c.id.localeCompare(id) === 0);
  const category = categories[index];
  return Promise.resolve(category);
}

/**
 * @returns -add category and returns the new added category
 * @param newCategory: the new category to add
 */
export async function addCategory(newCategory: Category): Promise<Category> {
  newCategory.id = uuidv1();
  categories.push(newCategory);
  return Promise.resolve(newCategory);
}

/**
 * @returns -update a category
 * @param id: the id of category to update
 * @param updatedCategory: the Category info
 */
export async function updateCategory(
  id: string,
  updatedCategory: Category
): Promise<Category | undefined> {
  const index = categories.findIndex(c => c.id.localeCompare(id) === 0);
  if (index !== -1) {
    categories[index] = updatedCategory;
    return Promise.resolve(updatedCategory);
  } else {
    return Promise.resolve(undefined);
  }
}

/**
 * @returns -true if removed , false else.
 * @param id: the id of category to remove
 *
 */
export async function removeCategory(id: string): Promise<boolean> {
  const index = categories.findIndex(c => c.id.localeCompare(id) === 0);
  if (index !== -1) {
    categories.splice(index, 1);
    return Promise.resolve(true);
  } else {
    return Promise.resolve(false);
  }
}
