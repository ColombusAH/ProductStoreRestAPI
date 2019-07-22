//*********/ Builded only for simulate work with DB //*********/

import categories from "../data/categories.json";
import uuidv1 from "uuid/v1";
export interface Category {
  id: string;
  name: string;
}

export async function getCategories(): Promise<Category[]> {
  return Promise.resolve(categories);
}

export async function findCategoryById(
  id: string
): Promise<Category | undefined> {
  const index = categories.findIndex(c => c.id.localeCompare(id) === 0);
  const category = categories[index];
  return Promise.resolve(category);
}

export async function addCategory(newCategory: Category): Promise<Category> {
  newCategory.id = uuidv1();
  categories.push(newCategory);
  return Promise.resolve(newCategory);
}

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

export async function removeCategory(id: string): Promise<boolean> {
  const index = categories.findIndex(c => c.id.localeCompare(id) === 0);
  if (index !== -1) {
    categories.splice(index, 1);
    return Promise.resolve(true);
  } else {
    return Promise.resolve(false);
  }
}
